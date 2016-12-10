'use strict';

// (function(module) {
//   (function() {
//     $('#city-select').attr('disabled', 'true')
//     webDB.execute('SELECT DISTINCT state FROM zips ORDER BY state',
//     results => {
//       results.forEach(ele => {
//         $('#state-select').append(`<option value="${ele.state}">${ele.state}</option>`)
//       })
//     })
//   })()
//
//   $('#state-select').on('change', function() {
//     $('#city-option').siblings().remove()
//     webDB.execute(`SELECT DISTINCT city FROM zips where state="${$(this).val()}" ORDER BY city`,
//     results => {
//       if (results) $('#city-select').removeAttr('disabled')
//       results.forEach(ele => {
//         $('#city-select').append(`<option value="${ele.city.replace(' ', '_')}">${ele.city}</option>`)
//       })
//     })
//   })
//   $('#city-select').on('change', function() {
//     webDB.execute(`SELECT * FROM zips WHERE state="${$('#state-select').val()}" AND city="${$(this).val().replace('_', ' ')}"`,
//     results => initMap(results))
//   })
//
//   $('#zip-search').on('submit', (e) => {
//     e.preventDefault()
//     webDB.execute(`SELECT * FROM zips WHERE zip=${e.target.zip.value}`,
//     results => initMap(results))
//   })
// })(window)
