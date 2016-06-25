(function(module) {
  var zips = {};
  // City, State, Zip, Population, Location

  zips.createTable = function(callback) {
    // TODO: Set up a DB table for articles.
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS zips (' +
      'id SERIAL PRIMARY KEY, ' +
      'city VARCHAR(255) NOT NULL, ' +
      'state VARCHAR(255) NOT NULL, ' +
      'location VARCHAR(255) NOT NULL,' +
      'population INTEGER NOT NULL,' +
      'zip INTEGER NOT NULL)',
      function(result) {
        console.log('Successfully set up the zips table.', result);
        if (callback) callback();
      }
    );
  };

  zips.truncateTable = function(callback) {
    // Delete all records from given table.
    webDB.execute(
      'DELETE FROM zips;',
      callback
    );
  };

  zips.loadDB = function() {
    $.get('/data/zips.json')
    .done(function(data) {
      console.log(data);
    })
    .fail(function(err) {
      console.error(err);
    })
  }
  module.zips = zips;
})(window)




// webDB.execute(
//   'INSERT INTO zips(city, state, location, population, zip) VALUES(?, ?, ?, ?, ?)'
//   [],
//   function(results) {
//
//   })
