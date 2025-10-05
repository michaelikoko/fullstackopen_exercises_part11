let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/persons'
} else {
  baseUrl = 'http://localhost:3001/api/persons'
}

export default baseUrl