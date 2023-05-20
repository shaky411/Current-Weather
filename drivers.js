const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search");
const weather = document.getElementById("weather-container");
const title = document.getElementById("cityTitle");
const wind = document.getElementById("wind");
const direction = document.getElementById("direction");
const rain = document.getElementById("rain");
const temp = document.getElementById("temp");
const itemContainer = document.getElementById("item-container");
const dailyData = document.getElementById("daily-data");
const spanData = document.getElementById("span-data");
const subTit = document.getElementById("subTitle");
const pageTitle = document.getElementById("page-title");
const dailyContainer = document.getElementById("daily-container");
const loader = document.getElementById("loading");
const titleTemp = document.getElementById('titleTemp');
const weatherImage = document.getElementById("w-image");

const apiKEY = "6wqm0f4vkilufitxhwxlf06d8t39svnfbhbou4gm";

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

// Fetch data and update the DOM
async function fetchData() {
  const response = await fetch(
    `https://www.meteosource.com/api/v1/free/point?place_id=${cityInput.value.trim()}&sections=current%2C%20daily&language=en&units=auto&key=${apiKEY}`
  );
  const data = await response.json();
  hideLoading();
  // Handle the data returned from the API
  const allData = data;
  console.log(allData);
  const daily = allData.daily.data;
  console.log(daily);

  let dailyCards = "";

  // 7 day summary
  daily.forEach((element) => {
    let data = element;
    // console.log(data)
    // console.log(data.all_day);

    dailyCards += `<div class="daily-data">
        <h2 class="day">${data.day}</h2>
        <span id="summary">${data.all_day.weather}</span>
        <div class="temp-data">
        <i class="fa-solid fa-temperature-low text-slate-300"></i><span id="min-temp">Min Temp: ${data.all_day.temperature_min}</span>
        <span id="max-temp">Max Temp: ${data.all_day.temperature_max}</span>
        </div>
        </div>
        `;
  });

  dailyData.innerHTML = dailyCards;

  const conditions = data.current.summary;
  const temperature = data.current.temperature;

  console.log(data.current);

  const wData = document.getElementById("test");

  wind.innerHTML = `${data.current.wind.speed} mph`;
  direction.innerHTML = `${data.current.wind.dir}`;
  rain.innerHTML = `${data.current.precipitation.type}`;
  temp.innerHTML = `${temperature}℃`;
  titleTemp.innerHTML = `${temperature}℃`

  title.innerHTML = cityInput.value.capitalize();
  wData.innerHTML = `Current conditions: <strong>${conditions}</strong>`;

  cityInput.value = "";
}

// Validate input, start loader and fetch data
function validateInput() {
  if (cityInput.value === "") {
    alert("please enter a city");
  } else {
    displayLoading();
    fetchData();
    itemContainer.classList.remove("hidden");
    subTit.classList.remove("hidden");
    pageTitle.classList.add("hidden");
  }
}

// Show the loading spinner
function displayLoading() {
  loader.classList.add("display");

  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

// Hide the loading spinner
function hideLoading() {
  loader.classList.remove("display");
}

// Show the 7 day summary
function showSummary() {
  dailyContainer.classList.toggle("hidden");
}

// Event listeners
searchBtn.addEventListener("click", validateInput);
subTit.addEventListener("click", showSummary);
