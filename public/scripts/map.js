(function(module) {
  'use strict'

  let map = {}

  function initMap(results) {
    console.log(results);
    if (results) {
      let firstCity = results[0]
      let loc = {lat: parseFloat(firstCity.latitude), lng: parseFloat(firstCity.longitude)}
      map.map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        scrollwheel: true,
        zoom: 8
      })

      results.forEach((city, idx) => {
        let marker = `marker${idx}`
        let infowindow = `infowindow${idx}`

        map[infowindow] = new google.maps.InfoWindow({
          content: `
          <div>
          <h5>${city.city}, ${city.state}</h5>
          <p>Latitude: ${city.latitude}</p>
          <p>Longitude: ${city.longitude}</p>
          <p>Population: ${city.population}</p>
          </div>
          `
        })

        map[marker] = new google.maps.Marker({
          position: {lat: parseFloat(city.latitude), lng: parseFloat(city.longitude)},
          map: map.map,
          title: `${city.city}, ${city.state}`
        })

        map[marker].addListener('click', () => map[infowindow].open(map.map, map[marker]))
      })
    } else {
      console.log('Default map')
      // This handles default location on load
      let loc = {lat: 47.3623, lng: -122.1950}
      map.map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        scrollwheel: true,
        zoom: 8
      })

      map.infowindow = new google.maps.InfoWindow({
        content: 'Seattle, WA'
      })

      map.marker = new google.maps.Marker({
        position: loc,
        map: map.map,
        title: 'Hello World!'
      })

      map.marker.addListener('click', () => map.infowindow.open(map.map, map.marker))
    }
  }
  module.initMap = initMap
})(window)
