import PersonModel from '../models/person.js'

export const getInfo = async (request, response) => {
  // Return info on total number of entries
  const date = new Date()
  const totalCount = await PersonModel.countDocuments({})

  return response.send(
    `<div>Phonebook has info for ${totalCount} people</div><br/><div>${date}</div>`
  )
}

export const listPersons = async (request, response) => {
  // List all phonebook entries

  const persons = await PersonModel.find({})
  return response.status(200).json(persons)
}

export const createPerson = async (request, response) => {
  // Create a new phonebook entry

  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }

  const newPerson = new PersonModel({
    name: body.name,
    number: body.number
  })

  await newPerson.save()
  return response.status(201).json(newPerson)
}

export const getPerson = async (request, response) => {
  // Return a single phonebook entry

  const person = await PersonModel.findById(request.params.id)
  if (person) {
    return response.status(200).json(person)
  }
  return response.status(404).json({ error: 'Id does not match any record in database' })
}

export const updatePerson = async (request, response) => {
  // Update a phonebook entry

  const body = request.body
  const updatedPerson = {
    name: body.name,
    number: body.number
  }

  const person = await PersonModel.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
    runValidators: true
  })

  if (person) {
    return response.status(200).json(person)
  }
  return response.status(404).json({ error: 'Id does not match any record in database' })
}

export const deletePerson = async (request, response) => {
  // Delete a phonebook entry

  await PersonModel.findByIdAndDelete(request.params.id)
  return response.status(204).end()
}
