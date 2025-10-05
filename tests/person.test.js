
import mongoose from 'mongoose'
import PersonModel from '../models/person.js'
import supertest from 'supertest'
import { after, beforeEach, before, it, describe } from 'node:test'
import app from '../app.js'
import { MongoMemoryServer } from 'mongodb-memory-server'
import process from 'process'
import assert from 'node:assert'

const api = supertest(app)

const initialPersonsData = [
  { name: 'Alice Johnson', number: '123-456789' },
  { name: 'Bob Smith', number: '987-654321' },
  { name: 'Charlie Brown', number: '555-123456' },
  { name: 'Jeff Johnson', number: '444-987654' },
  { name: 'Eve Davis', number: '333-456123' },
]

beforeEach(async () => {
  // Clear the database before each test
  await PersonModel.deleteMany({})
  await PersonModel.insertMany(initialPersonsData)
})

describe('GET /api/persons', () => {
  it('should return phonebook entries as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('should return all phonebook entries in database', async () => {
    const response = await api.get('/api/persons')
    assert.strictEqual(response.body.length, initialPersonsData.length)
  })
})

describe('POST /api/person', () => {
  it('should create a new phonebook entry', async () => {
    const response = await api
      .post('/api/persons')
      .send({
        name: 'Ho Lee Sheet',
        number: '123-123456',
      })
      .expect(201)

    assert.equal(response.body.name, 'Ho Lee Sheet')
    assert.equal(response.body.number, '123-123456')
  })

  it('should not create a phonebook entry with invalid number', async () => {
    await api
      .post('/api/persons')
      .send({
        name: 'Ho Lee Sheet',
        number: '123456789',
      })
      .expect(400)
  })
})

describe('GET /api/person/:id', () => {
  it('should return a single phonebook entry', async () => {
    const res = await api.get('/api/persons')
    const personEntry = res.body[0]

    const response = await api
      .get(`/api/persons/${personEntry.id}`)
      .expect(200)

    assert.equal(response.body.name, personEntry.name)
    assert.equal(response.body.number, personEntry.number)
  })

  it('should return error when entry ID is invalid', async () => {
    await api.get('/api/persons/14f266408f3070fb44c83999').expect(404)
  })
})

describe('PUT /api/person/:id', () => {
  it('should update a phonebook entry', async () => {
    const res = await api.get('/api/persons')
    const personEntry = res.body[0]

    const response = await api
      .put(`/api/persons/${personEntry.id}`)
      .send({
        name: 'Hoo Lee Fuc',
      })
      .expect(200)

    assert.equal(response.body.name, 'Hoo Lee Fuc')
  })

  it('should return error when entry ID is invalid', async () => {
    await api
      .put('/api/persons/14f266408f3070fb44c83999')
      .send({ name: 'Hoo Lee Fuc' })
      .expect(404)
  })
})

describe('DELETE /api/person/:id', () => {
  it('should delete a phonebook entry', async () => {
    const res = await api.get('/api/persons')
    const personEntry = res.body[0]

    await api.delete(`/api/persons/${personEntry.id}`).expect(204)
  })
})

before(async () => {
  const mongoServer = await MongoMemoryServer.create()
  const mongoTestUri = mongoServer.getUri()
  await mongoose.connect(mongoTestUri)
})

after(async () => {
  await mongoose.connection.close()
  process.exit(0)
})
