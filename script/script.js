let time = new Date();
let currentDateOutput = document.querySelector(".current-date");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[time.getDay()];
let currentDate = time.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[time.getMonth()];
let currentTimeOutput = document.querySelector(".current-time");
let currentHour = time.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = time.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
currentDateOutput.innerHTML = `${currentDay} ${currentDate} ${currentMonth}`;
currentTimeOutput.innerHTML = `${currentHour}:${currentMinute}`;

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
            <div class="forecast-day">${formateDay(forecastDay.time)}</div>
            <div class="forecast-temperature">
              <span class="max-temperature">${Math.round(
                forecastDay.temperature.maximum
              )}°</span>
              <span class="low-temperature"> ${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </div>
            <img class="forecast-image" 
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png">
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastDaily(coorinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coorinates.longitude}&lat=${coorinates.latitude}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#temperature-bar").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  let feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  document.querySelector(
    "#feels_like"
  ).innerHTML = `Feels like: ${feelsLikeTemp}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  iconElement.setAttribute("alt", response.data.condition.description);

  document.querySelector("#city").innerHTML = response.data.city;

  getForecastDaily(response.data.coordinates);
}

let apiKey = "cfcd0o2e4cf5f2899e2b3c0ae3bc56dt";

function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city-form");
  let searchValue = searchInput.value.toLowerCase();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchValue}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function seachCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let searchCityForm = document.querySelector("#search-submit");
searchCityForm.addEventListener("click", searchForm);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let currentButton = document.querySelector("#current-submit");
currentButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
});

function convertToFahrenheit(event) {
  event.preventDefault();
  convertUnitToCelsius.classList.remove("active");
  convertUnitToFahrenheit.classList.add("active");

  let celsiusUnit = document.querySelector("#temperature-bar");
  let fahrenheitUnit = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusUnit.innerHTML = fahrenheitUnit;
}

function convertToCelsius(event) {
  event.preventDefault();
  convertUnitToCelsius.classList.add("active");
  convertUnitToFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-bar");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let convertUnitToCelsius = document.querySelector("#celsius-unit");
convertUnitToCelsius.addEventListener("click", convertToCelsius);

let convertUnitToFahrenheit = document.querySelector("#fahrenheit-unit");
convertUnitToFahrenheit.addEventListener("click", convertToFahrenheit);

seachCity("Krakow");
