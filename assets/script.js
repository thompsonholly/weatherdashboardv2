
function getLatLon(city) {
  if (city === '') {
    alert('City cannot be blank')
    return;
  }
  var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=3&appid=d98bb48723a72ceb98f0fb8ddebd6462';
  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      var lat = data[0].lat;
      var lon = data[0].lon;
      var cityName = data[0].name;
      getWeather(lat, lon, cityName);
      getFiveDay(lat, lon);
    })

}

function getWeather(lat, lon, cityName) {
  $('#today-container').empty();
  var requestToday = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=d98bb48723a72ceb98f0fb8ddebd6462`;
  fetch(requestToday)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      var card = $('<div>').addClass('card');
      var cardBody = $('<div>').addClass('card-body')
      var cityTitle = $('<h2>').addClass('card-title').text(cityName);
      var tDate = dayjs(data.dt * 1000).format('M/D/YYYY');
      console.log(tDate);
      var imgIcon = $('<img>').addClass('card-title').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      var tempEl = $('<h6>').addClass('card-text').text('Temp: ' + data.main.temp + ' ºF');
      var windEl = $('<h6>').addClass('card-text').text('Wind: ' + data.wind.speed + ' MPH');
      var humidityEl = $('<h6>').addClass('card-text').text('Humidity: ' + data.main.humidity + ' %');



      cityTitle.append(imgIcon);
      cityTitle.append(tDate);
      $('#today-container').append(card.append(cardBody.append(cityTitle, tempEl, windEl, humidityEl)));

    })
}
// Five Day Forecast Container
function getFiveDay(lat, lon) {
  var requestFive = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=d98bb48723a72ceb98f0fb8ddebd6462`;
  fetch(requestFive)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (var i = 0; i < data.list.length; i = i + 8) {
        // console.log(data.list[i])
        console.log(data.list[i].dt)
        // const data = data.list[i];
        var fDate = dayjs(data.list[i].dt * 1000).format("M/D/YY");
        var card = $('<div>').addClass('card col-2');
        var cardBody = $('<div>').addClass('card-body')
        var cardTitle = $('<h3>').addClass('card-title').text(fDate);
        var imgIcon = $('<img>').addClass('card-title').attr('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
        var tempEl = $('<h6>').addClass('card-text').text('Temp: ' + data.list[i].main.temp + ' ºF');
        var windEl = $('<h6>').addClass('card-text').text('Wind: ' + data.list[i].wind.speed + ' MPH');
        var humidityEl = $('<h6>').addClass('card-text').text('Humidity: ' + data.list[i].main.humidity + ' %');

        $('#five-day-container').append(card.append(cardBody.append(cardTitle.append(imgIcon), tempEl, windEl, humidityEl)));
      }
    })
}

document.querySelector('.search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  console.log(event.target)
  var cityInput = document.getElementById('search-input').value;
  getLatLon(cityInput)
  localStorage.setItem('weather', cityInput);
});

