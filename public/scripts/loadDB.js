'use strict'

const zips = {}

zips.createTable = callback => {
  let sqlCreate = `
  CREATE TABLE IF NOT EXISTS zips (
  id INTEGER PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  latitude INTEGER NOT NULL,
  longitude INTEGER NOT NULL,
  population INTEGER NOT NULL,
  zip VARCHAR(255) NOT NULL)
  `
  webDB.execute(
    sqlCreate, result => {
      console.log('Successfully set up the zips table.', result)
      if (callback) callback()
    }
  )
}

zips.truncateTable = callback => {
  webDB.execute('DELETE FROM zips', callback)
}

zips.loadDB = () => {
  zips.createTable()

  webDB.execute('SELECT * FROM zips', rows => {
    if (rows.length) return
    $.get('/data/zips.json')
    .then(zips.insertRecord, err => console.error(err))
  })
}

zips.insertRecord = data => {
  data.forEach(ele => {
    webDB.execute(
      [
        {
        'sql': 'INSERT INTO zips(city, state, latitude, longitude, population, zip) VALUES(?, ?, ?, ?, ?, ?)',
        'data': [ele.city, ele.state, ele.loc[1], ele.loc[0], ele.pop, ele.zip],
        }
      ]
    )
  })
}
