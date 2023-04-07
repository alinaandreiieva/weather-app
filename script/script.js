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

function showWeather(response) {
  document.querySelector("#temperature-bar").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  let maxTemperature = Math.round(response.data.main.temp_max);
  let minTemperature = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#min-max-temperature"
  ).innerHTML = `H:${maxTemperature} L:${minTemperature}`;

  document.querySelector("#city").innerHTML = response.data.name;
}

let apiKey = "a710bd8bd76400c9658ef649d9e81728";

function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city-form");
  let searchValue = searchInput.value.toLowerCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function seachCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let searchCityForm = document.querySelector("#search-submit");
searchCityForm.addEventListener("click", searchForm);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let currentButton = document.querySelector("#current-submit");
currentButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
});

seachCity("Krakow");
