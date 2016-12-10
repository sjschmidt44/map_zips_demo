'use strict';

const fs = require('fs')
const pg = require('pg')
const conString = process.env.DATABASE_URL || 'postgresql://sjschmidt@localhost:5432'
const ops = module.exports = {}

ops.createTable = function() {
  const client = new pg.Client(conString)
  const sqlCreate = `
  CREATE TABLE IF NOT EXISTS zips (
  id INTEGER PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  latitude INTEGER NOT NULL,
  longitude INTEGER NOT NULL,
  population INTEGER NOT NULL,
  zip VARCHAR(255) NOT NULL);
  `

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query(sqlCreate, err => {
      if(err) console.error('error running query', err)
      console.log('crate table complete')
      client.end()
    })
  })
}


ops.getAll = function() {
  const client = new pg.Client(conString)

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query('SELECT * FROM users;', (err, result) => {
      if(err) console.error('error running query', err)
      client.end()
    })
  })
}

ops.loadRecord = function(record) {
  this.createTable()
  const client = new pg.Client(conString)
  const sqlVals = [record.city, record.state, record.loc[1], record.loc[0], record.pop, record.zip]
  const sqlString = `INSERT INTO
                     zips(city, state, latitude, longitude, population, zip)
                     VALUES($1, $2, $3, $4, $5);`

  client.connect(err => {
    if(err) console.error('could not connect to postgres', err)

    client.query(sqlString, sqlVals, err => {
      if(err) console.error('error running query', err)

      client.end()
    })
  })
}

ops.readJSON = function() {
  fs.readFile(__dirname + '/../data/test.json', 'utf8', (err, data) => {
    if (err) return console.error(err)
    const fd = JSON.parse(data)
    fd.forEach(ele => ops.loadRecord(ele))
  })
}
