'use strict';

(function(module) {
  (function() {
    $('#city-select').attr('disabled', 'true')
    $.get('/api/state')
    .then(
      states => states.forEach(state => $('#state-select').append(`<option value="${state.state}">${state.state}</option>`)),
      err => console.error(err)
    )
  })()

  $('#state-select').on('change', function() {
    $('#city-option').siblings().remove()
    $.get('/api/city', {state: $(this).val()})
    .then(cities => {
      if (cities) $('#city-select').removeAttr('disabled')
      cities.forEach(city => $('#city-select').append(`<option value="${city.city}">${city.city}</option>`))
    })
  })

  $('#city-select').on('change', function() {
    $.get('/api/location', {city: $(this).val(), state: $('#state-select').val()})
    .then(data => initMap(data))
  })

  $('#zip-search').on('submit', (e) => {
    e.preventDefault()
    webDB.execute(`SELECT * FROM zips WHERE zip=${e.target.zip.value}`,
    results => initMap(results))
  })
})(window)
