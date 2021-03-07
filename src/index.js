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
  if (!req.query.numbers) { // return 400 if no numbers
    return res.sendStatus(400)
  }

  let nums = req.query.numbers.split(',') // parse to array
  
  if (nums.some(num => !Boolean(Number(num)) && Number(num) !== 0)) { // arguments must strictly be numbers
    return res.sendStatus(400)
  }

  nums = nums.map(num => Number(num)) // convert strings to numbers
  const sum = nums.reduce((sum, num) => sum + num) // sum array

  res.send(`${sum}`)
})

// 3. reverse-words endpoint
app.get('/reverse-words', (req, res) => {
  if (!req.query.sentence) { // if no sentence, return empty string
    return res.send('')
  }

  let sentenceArray = req.query.sentence.split(new RegExp(/(?=[^a-zA-Z])|(?<=[^a-zA-Z])/g)) // split with regex

  // strip quotes from beginning and end
  if (sentenceArray[0] === '\'' || sentenceArray[0] === '\"') sentenceArray.shift()
  if (sentenceArray[sentenceArray.length - 1] === '\'' || sentenceArray[sentenceArray.length - 1] === '\"') sentenceArray.pop()

  sentenceArray = sentenceArray.map(s => s.split('').reverse().join('')) // reverse each string

  res.send(sentenceArray.join('')) // return joined array (becomes string)
})

// set up HTTP server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
