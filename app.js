import express from 'express'

// Import middleware
import morgan from 'morgan'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'
import notFound from './middleware/notFound.js'

// Import routes
import personRoutes from './routes/person.js'

// Set up express object
const app = express()

// Use middleware
app.use(express.static('dist')) // Serve static files
app.use(cors()) // Cors middleware
app.use(express.json()) // Json parser middleware
app.use(express.urlencoded({ extended: true })) // Parse multipart/form-data
app.use(morgan('dev')) // Morgan middleware for logging

// Use routes
app.use('/api/persons', personRoutes)

app.use(errorHandler) // Use custom errorHandler middleware
app.use(notFound) // Use custom notFound middleware

export default app // Export app for testing
