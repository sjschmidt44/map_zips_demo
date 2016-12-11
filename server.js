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
  const zip = req.query.zip
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query(`SELECT * FROM zips WHERE zip=$1`, [zip], (err, result) => {
      if(err) console.error('error running query', err)
      res.json(result.rows)
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
      res.json(result.rows)
      client.end()
    })
  })
})

app.get('/api/city', (req, res) => {
  const state = req.query.state
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query('SELECT DISTINCT city FROM zips WHERE state=$1 ORDER BY city', [state], (err, result) => {
      if(err) console.error('error running query', err)
      res.json(result.rows)
      client.end()
    })
  })
})

app.get('/api/location', (req, res) => {
  const state = req.query.state
  const city = req.query.city
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query('SELECT * FROM zips WHERE state=$1 AND city=$2 ORDER BY city', [state, city], (err, result) => {
      if(err) console.error('error running query', err)
      res.json(result.rows)
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
