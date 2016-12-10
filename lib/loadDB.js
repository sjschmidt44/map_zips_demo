'use strict'

const bluebird = require('bluebird')
const fsProm = bluebird.promisifyAll(require('fs'))
const pg = require('pg')
const Pool = pg.Pool
const ops = module.exports = {}

const pool = new Pool({
  user: process.env.USER,
  password: '',
  host: 'localhost',
  database: process.env.USER,
  max: 10,
  idleTimeoutMillis: 1000
})

const loadRecord = function(record) {
  const sqlVals = [record.city, record.state, parseFloat(record.loc[1]), parseFloat(record.loc[0]), parseInt(record.pop), record.zip]
  const sqlString = `INSERT INTO
                     zips(city, state, latitude, longitude, population, zip)
                     VALUES($1, $2, $3, $4, $5, $6);`

  return new Promise((res, rej) => {
    res(pool.query(sqlString, sqlVals))
    .catch(err => rej(err))
  })
}

ops.createTable = function() {
  return new Promise((res, rej) => {
    const sqlCreate = `
    CREATE TABLE IF NOT EXISTS zips (
      id SERIAL PRIMARY KEY,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      latitude DECIMAL NOT NULL,
      longitude DECIMAL NOT NULL,
      population INTEGER NOT NULL,
      zip VARCHAR(255) NOT NULL);
      `
    res(
      pool.query(sqlCreate)
      .then(() => console.log('create success'))
      .catch(err => rej(err))
    )
  })
}

pool.on('error', e => console.error(e))

ops.readJSON = (file) => {
  return fsProm.readFileAsync(`${__dirname}/../data/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.map(loadRecord))
  .then(proms => Promise.all(proms))
  .then(() => console.log('files loaded successfully'))
  .catch(err => console.error(err))
}
