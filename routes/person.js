import express from 'express'
import { createPerson, deletePerson, getInfo, getPerson,listPersons,updatePerson } from '../controllers/person.js'

const router = express.Router()
router.route('/').get(listPersons).post(createPerson)
router.route('/info').get(getInfo)
router.route('/:id').get(getPerson).put(updatePerson).delete(deletePerson)

export default router
