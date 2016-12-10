'use strict'

const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const app = express()
const conString = 'postgresql://localhost:5432'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/zip', (req, res) => {
  const {zip} = req.query
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query(`SELECT * FROM zips WHERE zip=${zip}`, (err, result) => {
      if(err) console.error('error running query', err)
      res.json(result)
      client.end()
    })
  })
})

app.get('/api/state', (req, res) => {
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query('SELECT DISTINCT state FROM zips ORDER BY state', (err, result) => {
      if(err) console.error('error running query', err)
      res.json(result)
      client.end()
    })
  })
})

app.get('/api/city', (req, res) => {
  const {city, state} = req.query
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query('SELECT * FROM zips WHERE city=${city} AND state=${state}', (err, result) => {
      if(err) console.error('error running query', err)
      res.json(result)
      client.end()
    })
  })
})

app.get('/', (req, res) => {
  console.log('got to home');
  res.sendFile('public/index.html', {root: '.'})
})

app.use(express.static(`${__dirname}/public`))

app.listen(port, () => console.log(`Server listening on port ${port}`))
