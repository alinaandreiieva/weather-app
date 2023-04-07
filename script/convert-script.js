let isCelcius = true;
function convertToFahrenheit(event) {
  event.preventDefault();
  if (!isCelcius) return;
  let celsiusUnit = document.querySelector("#temperature-bar");
  let curValue = celsiusUnit.textContent;
  let fahrenheitUnit = Math.round((curValue * 9) / 5 + 32);
  console.log(fahrenheitUnit);
  celsiusUnit.innerHTML = fahrenheitUnit;
  isCelcius = false;
}

let convertUnitToFahrenheit = document.querySelector("#fahrenheit-unit");
convertUnitToFahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius() {
  if (isCelcius) return;
  let container = document.querySelector("#temperature-bar");
  let curValue = container.textContent;
  let newValue = Math.round(((curValue - 32) * 5) / 9);
  container.innerHTML = newValue;
  isCelcius = true;
}

let convertUnitToCelsius = document.querySelector("#celsius-unit");
convertUnitToCelsius.addEventListener("click", convertToCelsius);
