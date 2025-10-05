// Route not found middleware

const notFound = (req, res, next) => {
  return res.status(404).json({
    error: 'Route cannot be found!'
  })
}

export default notFound