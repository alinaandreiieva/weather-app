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
    response.data.temperature.current
  );
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

seachCity("Krakow");
