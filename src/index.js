const express = require('express')
const cors = require('cors')

// set up express
const app = express()

// use middleware
app.use(cors())

// set up routes
// 1. hello endpoint
app.get('/hello', (req, res) => {
  res.sendStatus(204)
})

// 2. sum endpoint
app.get('/sum', (req, res) => {
  if (!req.query.numbers) { // mathmatical sum of empty set is 0 by convention
    return res.send('0')
  }

  let nums = req.query.numbers.split(',') // parse to array
  
  if (nums.some(num => !Boolean(Number(num)) && num !== '0')) { // arguments must strictly be numbers
    return res.sendStatus(400)
  }

  nums = nums.map(num => Number(num)) // convert strings to numbers
  const sum = nums.reduce((sum, num) => sum + num) // sum array

  res.send(`${sum}`)
})

// set up HTTP server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
