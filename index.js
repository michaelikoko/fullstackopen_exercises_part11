/* eslint-disable no-console */
import app from './app.js'
import { connectToDatabase } from './utils/db.js'
import { PORT } from './utils/config.js'

const start = async () => {
  try {
    await connectToDatabase()
    app.listen(PORT, console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.log('Error starting server!')
    console.error(error)
  }
}

start()