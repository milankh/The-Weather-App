var api = " https://fcc-weather-api.glitch.me/api/current?";
var longitude, latitude;
var currentTemperature;
var temperatureUnit = 'C';

//Get the current Location of the user
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('.location-text').html("Not Supported by your browser");
  }
}

//Takes position and finds latitude and longitude
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

//Calls API and updates html
function getWeather(lat, lon) {
  var urlString = api + "lat=" + lat + "&" + "lon=" + lon;
  var degree = String.fromCharCode(176);
  $.ajax({
    url: urlString,
    success: function(result) {
      $('.location-text').html(result.name + ", " + result.sys.country);
      $('.temperature-text').html(result.weather[0].description);
      $('.temperature-number').html(result.main.temp);
      $('#degree').html(degree);
      $('#cf').html(temperatureUnit);
      $('.wind-text').html('Wind Speed: ' + result.wind.speed + ' Miles/Hr');
      $('.footer').html("<p>Powered by FCC API, Weather icons by pixabay && Developed by Milan</p>");
      $('.btn').css("visibility", "visible");
      $('h1').removeClass('small');
      var temIcon = (result.weather[0].main).toLowerCase();

      switch (temIcon) {
        case "rain":
          $('.temp-icon').append('<img class="temp-image" src="https://cdn.pixabay.com/photo/2012/04/18/13/22/cloud-37011_960_720.png" />');
          $('.body-container').addClass('rain-bg');
          break;

        case "clear":
          $('.temp-icon').append('<img class="temp-image" src="https://cdn.pixabay.com/photo/2016/03/18/15/05/sun-1265199_960_720.png" />');
          $('.body-container').addClass('clear-bg');
          break;

        case "thunderstorm":
          $('.temp-icon').append('<img class="temp-image" src="https://cdn.pixabay.com/photo/2016/03/18/14/51/thunderstorm-1265161_960_720.png" />');
          $('.body-container').addClass('thunderstorm-bg');
          break;

        case "drizzle":
          $('.temp-icon').append('<img class="temp-image" src="https://cdn.pixabay.com/photo/2016/03/18/15/09/light-rain-1265212_960_720.png" />');
          $('.body-container').addClass('drizzle-bg');
          break;

        case "clouds":
          $('.temp-icon').append('<img class="temp-image" src="https://cdn.pixabay.com/photo/2016/03/18/15/09/cloudiness-1265211_960_720.png" />');
          $('.body-container').addClass('cloudy-bg');
          break;

        case "snow":
          $('.temp-icon').append('<img class="temp-image" src="http://celebwallpapers.net/wp-content/uploads/2017/11/snowflakes-snowflake-clipart-transparent-background-free-clipartix-beautiful-pictures-of-snowflakes.png" />');
          $('.body-container').addClass('snow-bg');
          break;

        default:
          $('.temp-icon').append('<img src="https://www.metoffice.gov.uk/binaries/content/gallery/mohippo/images/weather-guide/weather-symbols-jul17/no-data.png" />');

      }
    }
  });
}

//Converts temperature unit according to what's already there
$('.btn').click(function() {
  var finalValue;
  var c = $('#cf').text();
  if (c == 'C') {
    finalValue = $('.temperature-number').text() * 1.8 + 32;
    temperatureUnit = 'F';
    $('#cf').html(temperatureUnit);
    $('.temperature-number').html(finalValue.toFixed(2));
  } else {
    finalValue = ($('.temperature-number').text() - 32) / 1.8;
    temperatureUnit = 'C';
    $('.temperature-number').html(finalValue.toFixed(2));
    $('#cf').html(temperatureUnit);
  }
})

getCurrentLocation();
