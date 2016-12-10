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

pool.on('error', e => console.error(e))

ops.createTable = function() {
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

  pool.query(sqlCreate)
  .then(() => console.log('create success'))
  .catch(err => console.error(err))
}

ops.loadRecord = function(record) {
  const sqlVals = [record.city, record.state, parseFloat(record.loc[1]), parseFloat(record.loc[0]), parseInt(record.pop), record.zip]
  const sqlString = `INSERT INTO
                     zips(city, state, latitude, longitude, population, zip)
                     VALUES($1, $2, $3, $4, $5, $6);`

  pool.query(sqlString, sqlVals)
  .catch(err => console.error(err))
}

ops.readJSON = () => {
  fsProm.readFileAsync(`${__dirname}/../data/zips.json`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.forEach(ele => ops.loadRecord(ele)))
  .catch(err => console.error(err))
}
