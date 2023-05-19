let searchInputEl = document.querySelector("#search-input");
let searchBtnEl = document.querySelector("#search-button");
let todaySection = document.querySelector("#today");
let searchLocationEl = document.querySelector("#search-location");
let todayDateEl = document.querySelector("#today-date");
let todayTempEl = document.querySelector("#today-temp");
let todayWindEl = document.querySelector("#today-wind");
let todayHumidityEl = document.querySelector("#today-humidity");
let forecastContainerEl = document.querySelector("#forecast");
let historyContainerEl = document.querySelector("#history");

let apiKey = "40640050a45cbd8cf8d35ada1e14fee3";

/** Get user's location */
let userLocation = {};
if (window.navigator.geolocation) {     
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      userLocation.latitude = latitude;
      userLocation.longitude = longitude;
    },
    (err) => console.log(err)
  );
}

// let myCity = "Bristol"

let searchCity = searchInputEl.value;

function getWeatherInfo(searchCity) {
  let queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then(function (cityFound) {
      let city = cityFound[0];

      let cityDataQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

      fetch(cityDataQueryURL)
        .then((response) => response.json())
        .then((cityData) => {
          let cityWeatherInfo = cityData.list;

          // Display today's data for searched location
          todayDateEl.textContent = displayDate(cityWeatherInfo[0].dt);
          searchLocationEl.textContent = cityData.city.name;
          todayTempEl.textContent = cityWeatherInfo[0].main.temp;
          todayHumidityEl.textContent = cityWeatherInfo[0].main.humidity;
          todayWindEl.textContent = cityWeatherInfo[0].wind.speed;

          // Display next 5 days data
          let fiveDayForecastArr = [
            cityWeatherInfo[8],
            cityWeatherInfo[16],
            cityWeatherInfo[24],
            cityWeatherInfo[32],
            cityWeatherInfo[39],
          ];

          fiveDayForecastArr.forEach((forecast) => {
            forecastContainerEl.innerHTML += `
            <div class="col-sm">
              <div class="forecast-card card">
                <h2 class="text-center mt-1">${moment(forecast.dt, "X").format(
                  "dddd"
                )}</h2>
                <img src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png">
                <div class="card-body">
                  <p class="card-text">Temp: <span id="temp">${
                    forecast.main.temp
                  }</span></p>
                  <p class="card-text">Wind: <span id="wind">${
                    forecast.wind.speed
                  }</span></p>
                  <p class="card-text">
                    Humidity: <span id="humidity">${
                      forecast.main.humidity
                    }</span>
                  </p>
                </div>
              </div>
            </div>
            `;
          });
        });
    });
};

searchBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  forecastContainerEl.innerHTML = "";
  getWeatherInfo(searchInputEl.value);
});

historyContainerEl.addEventListener("click", (e) => {
  let element = e.target.textContent;
  getWeatherInfo(element);
  console.log(element);
});

function displayDate(unix) {
  return moment(unix, "X").format("dddd, MMM Do YYYY");
};

/** Geolocation URL
 * https://api.openweathermap.org/geo/1.0/direct?q=bristol&limit=5&appid=40640050a45cbd8cf8d35ada1e14fee3
 */
/** Bristol forecastURL
 * https://api.openweathermap.org/data/2.5/forecast?lat=51.4538022&lon=-2.5972985&appid=40640050a45cbd8cf8d35ada1e14fee3
 */
/** Openweather Weather condition codes
 * https://openweathermap.org/weather-conditions
 *
 * http://openweathermap.org/img/wn/10d@2x.png
 *
 */