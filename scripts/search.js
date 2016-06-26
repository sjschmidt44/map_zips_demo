(function(module) {
  (function() {
    $('#city-select').attr('disabled', 'true');
    webDB.execute('SELECT DISTINCT state FROM zips ORDER BY state', function(results) {
      results.forEach(function(ele) {
        var optEle = $('<option value=' + ele.state + '>' + ele.state + '</option>');
        $('#state-select').append(optEle);
      })
    })
  })()

  $('#state-select').on('change', function(e) {
    $('#city-option').siblings().remove();
    webDB.execute('SELECT DISTINCT city FROM zips where state="' + $(this).val() + '" ORDER BY city', function(results) {
      if (results) $('#city-select').removeAttr('disabled');
      results.forEach(function(ele) {
        var optEle = $('<option value=' + ele.city.replace(' ', '_') + '>' + ele.city + '</option>')
        $('#city-select').append(optEle);
      })
    })
  })

  $('#city-select').on('change', function(e) {
    webDB.execute(
      'SELECT * FROM zips WHERE state="' + $('#state-select').val() + '" AND city="' + $(this).val().replace('_', ' ') + '"',
      function(results) {
        initMap(results);
    })
  })

  $('#zip-search').on('submit', function(e) {
    e.preventDefault();
    webDB.execute('SELECT * FROM zips WHERE zip=' + e.target.zip.value, function(results) {
      initMap(results);
    })
  })
})(window)
