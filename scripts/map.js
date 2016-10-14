(function(module) {
  var map = {};

  function initMap(results) {
    if (results) {
      var firstCity = results[0];
      var loc = {lat: firstCity.latitude, lng: firstCity.longitude};
      map.map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        scrollwheel: true,
        zoom: 8
      });

      results.forEach(function(city, idx) {
        var marker = 'marker' + idx;
        var infowindow = 'infowindow' + idx;

        map[infowindow] = new google.maps.InfoWindow({
          content:
          '<div>' +
          '<h5>' + city.city + ', ' + city.state + '</h5>' +
          '<p>Latitude: ' + city.latitude + '</p>' +
          '<p>Longitude: ' + city.longitude + '</p>' +
          '<p>Population: ' + city.population + '</p>' +
          '</div>'
        });

        map[marker] = new google.maps.Marker({
          position: {lat: city.latitude, lng: city.longitude},
          map: map.map,
          title: city.city + ', ' + city.state
        })

        map[marker].addListener('click', function() {
          map[infowindow].open(map.map, map[marker]);
        });
      })
    } else {
      // This handles default location on load
      var loc = {lat: 47.3623, lng: -122.1950};
      map.map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        scrollwheel: true,
        zoom: 8
      });

      map.infowindow = new google.maps.InfoWindow({
        content: 'Seattle, WA'
      });

      map.marker = new google.maps.Marker({
        position: loc,
        map: map.map,
        title: 'Hello World!'
      });

      map.marker.addListener('click', function() {
        map.infowindow.open(map.map, map.marker);
      });
    }
  }
  module.initMap = initMap;
})(window)
