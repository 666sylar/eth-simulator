function handleError (err) {
  console.error('Error:', err.message || err)
  process.exit(1)
}

module.exports = { handleError }
