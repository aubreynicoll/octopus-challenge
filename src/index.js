const express = require('express')
const cors = require('cors')

// set up express
const app = express()

// use middleware
app.use(cors())

// set up routes


// set up HTTP server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
