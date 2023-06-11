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
const titleTemp = document.getElementById("titleTemp");
const weatherImage = document.getElementById("w-image");
const iconEl = document.getElementById("icon");
const titleIcon = document.getElementById("titleIcon");
const mainLogo = document.getElementById("mainLogo");
const tagline = document.getElementById("tagline");
const high = document.getElementById("dayHigh");
const low = document.getElementById("dayLow");
const highLowContainer = document.getElementById("day-high-low");
const wData = document.getElementById("test");

const apiKEY = "6wqm0f4vkilufitxhwxlf06d8t39svnfbhbou4gm";

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

function getUserLocation() {
  displayLoading();

  function locationSuccess(position) {
    console.log("success");
    let coords = position.coords;
    console.log(coords);

    getLocationData(coords);
    itemContainer.classList.remove("hidden");
    subTit.classList.remove("hidden");
    highLowContainer.classList.remove("hidden");
    pageTitle.classList.add("hidden");
    tagline.classList.add("hidden");
  }

  function locationError() {
    console.log("error");
  }
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}

function app() {
  getUserLocation();
}

// window.onload = app();

const homeLocation = document.getElementById("home");

function getLocation() {
  displayLoading();
  getUserLocation();
  getLocationData();
  itemContainer.classList.remove("hidden");
  subTit.classList.remove("hidden");
  highLowContainer.classList.remove("hidden");
  pageTitle.classList.add("hidden");
  tagline.classList.add("hidden");
}

homeLocation.addEventListener("click", getUserLocation);

// // data on load by location
async function getLocationData(coords) {
  const response = await fetch(
    `https://www.meteosource.com/api/v1/free/nearest_place?lat=${coords.latitude}&lon=${coords.longitude}&key=${apiKEY}`
  );

  const data = await response.json();
  let locationId = data.place_id;
  console.log(locationId);

  // This gets the current weather for the users location
  const locationResponse = await fetch(
    `https://www.meteosource.com/api/v1/free/point?place_id=${locationId}&sections=all%2C%20daily&language=en&units=metric&key=${apiKEY}`
  );

  hideLoading();
  mainLogo.classList.add("hidden");

  const newResponse = await locationResponse.json();
  let myHome = newResponse;

  console.log(myHome);
  let localHigh = myHome.daily.data[0].all_day.temperature_max;
  let localLow = myHome.daily.data[0].all_day.temperature_min;

  const localConditions = myHome.current.summary;
  let localIcon = myHome.current.icon_num;
  let currentIconSource = "./assets/weather-icons-big/" + localIcon + ".png";
  titleIcon.innerHTML = `<img src="${currentIconSource}" alt="weather icon"</img>`;

  wData.innerHTML = `Current conditions: <strong>${localConditions}</strong>`;
  // High-Low temperature for the current day
  high.innerHTML = `H:<strong>${localHigh}℃</strong>`;
  low.innerHTML = `L:<strong>${localLow}℃</strong>`;

  titleTemp.innerHTML = `${myHome.current.temperature}℃`;
  title.innerHTML = locationId;
  wind.innerHTML = `${myHome.current.wind.speed} mph`;
  direction.innerHTML = `${myHome.current.wind.dir}`;
  rain.innerHTML = `${myHome.current.precipitation.type}`;
  temp.innerHTML = `${myHome.current.temperature}℃`;
  // titleTemp.innerHTML = `${temperature}℃`;

  const localDaily = myHome.daily.data;
  console.log(myHome.daily.data);

  let localDailyCards = "";

  localDaily.forEach((element) => {
    let data = element;
    // console.log(data)
    // console.log(data.all_day);

    // Get the icon code and add it to the src string from the image assets
    let icon = data.icon;
    let iconSource = "./assets/weather-icons/" + icon + ".png";

    // re-format day data
    let options = { weekday: "long", month: "long", day: "numeric" };
    let today = new Date(data.day);
    let correctData = today.toLocaleString("en-us", options);
    console.log(correctData);

    localDailyCards += `<div class="daily-data">
    <div class="card-date">
    <h2 class="day">${correctData}</h2>
    </div>
    <div class="icon"><img src="${iconSource}" alt="weather icon"</img></div>
    <span id="summary">${data.all_day.weather}</span>
    <div class="temp-data">
    <i class="fa-solid fa-temperature-low text-slate-300"></i><span id="min-temp">Min Temp: <strong>${data.all_day.temperature_min}</strong>℃</span>
    <span id="max-temp">Max Temp: <strong>${data.all_day.temperature_max}</strong>℃</span>
    </div>
    <div class="card-wind">
    <i class="fa-solid fa-wind mt-2"></i>
    <span><strong>${data.all_day.wind.speed}</strong>mph</span>
    </div>
    <div>
    <i class="fa-solid fa-umbrella"></i>
    <span><strong>${data.all_day.precipitation.type}</strong></span>
    </div>
    </div>
    `;
  });

  dailyData.innerHTML = localDailyCards;

}

async function fetchData() {
  try {
    // find place id
    const response = await fetch(
      `https://www.meteosource.com/api/v1/free/find_places?text=${cityInput.value.trim()}&key=${apiKEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const placeData = await response.json();
    let placeId = placeData[0].place_id;

    // use place id to search for city
    const placeResponse = await fetch(
      `https://www.meteosource.com/api/v1/free/point?place_id=${placeId}&sections=all%2C%20daily&language=en&units=metric&key=${apiKEY}`
    );

    const data = await placeResponse.json();
    hideLoading();
    mainLogo.classList.add("hidden");

    // Handle the data returned from the API
    const allData = data;
    console.log(allData);
    const daily = allData.daily.data;
    console.log(daily);

    // Rest of the code...
    let dailyCards = "";
    let dailyModal = "";

    // High-Low temperature for the current day
    high.innerHTML = `H:<strong>${daily[0].all_day.temperature_max}℃</strong>`;
    low.innerHTML = `L:<strong>${daily[0].all_day.temperature_min}℃</strong>`;

    // 7 day summary - get the data for each day
    daily.forEach((element) => {
      let data = element;
      // console.log(data)
      // console.log(data.all_day);

      // Get the icon code and add it to the src string from the image assets
      let icon = data.icon;
      let iconSource = "./assets/weather-icons/" + icon + ".png";

      // re-format day data
      let options = { weekday: "long", month: "long", day: "numeric" };
      let today = new Date(data.day);
      let correctData = today.toLocaleString("en-us", options);
      console.log(correctData);

      dailyCards += `<div class="daily-data">
      <div class="card-date">
      <h2 class="day">${correctData}</h2>
      </div>
      <div class="icon"><img src="${iconSource}" alt="weather icon"</img></div>
      <span id="summary">${data.all_day.weather}</span>
      <div class="temp-data">
      <i class="fa-solid fa-temperature-low text-slate-300"></i><span id="min-temp">Min Temp: <strong>${data.all_day.temperature_min}</strong>℃</span>
      <span id="max-temp">Max Temp: <strong>${data.all_day.temperature_max}</strong>℃</span>
      </div>
      <div class="card-wind">
      <i class="fa-solid fa-wind mt-2"></i>
      <span><strong>${data.all_day.wind.speed}</strong>mph</span>
      </div>
      <div>
      <i class="fa-solid fa-umbrella"></i>
      <span><strong>${data.all_day.precipitation.type}</strong></span>
      </div>
      </div>
      `;
    });

    let currentIcon = data.current.icon_num;
    let currentIconSource =
      "./assets/weather-icons-big/" + currentIcon + ".png";
    titleIcon.innerHTML = `<img src="${currentIconSource}" alt="weather icon"</img>`;

    dailyData.innerHTML = dailyCards;

    const conditions = data.current.summary;
    const temperature = data.current.temperature;

    console.log(data.current);

    wind.innerHTML = `${data.current.wind.speed} mph`;
    direction.innerHTML = `${data.current.wind.dir}`;
    rain.innerHTML = `${data.current.precipitation.type}`;
    temp.innerHTML = `${temperature}℃`;
    titleTemp.innerHTML = `${temperature}℃`;

    title.innerHTML = cityInput.value.capitalize();
    wData.innerHTML = `Current conditions: <strong>${conditions}</strong>`;

    cityInput.value = "";
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error! Please check name and try again.");
    // You can handle the error here, e.g., display an error message to the user.
  }
}

// Validate input, start loader and fetch data
function validateInput() {
  if (cityInput.value === "") {
    openModal();
  } else {
    displayLoading();
    fetchData();
    // findPlace();

    itemContainer.classList.remove("hidden");
    subTit.classList.remove("hidden");
    highLowContainer.classList.remove("hidden");
    pageTitle.classList.add("hidden");
    tagline.classList.add("hidden");
  }
}

// Show the loading spinner
function displayLoading() {
  loader.classList.remove("hidden");
  loader.classList.add("display");

  setTimeout(() => {
    loader.classList.remove("display");
  }, 15000);
}

// Hide the loading spinner
function hideLoading() {
  loader.classList.remove("display");
  loader.classList.add("hidden");
}

// Show the 7 day summary
function showSummary() {
  dailyContainer.classList.toggle("hidden");
}

const modalBg = document.getElementById("modal-bg");
const modalContent = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");

function showModal() {
  modalBg.classList.remove("hidden");
  modalContent.classList.remove("hidden");
}

function hideModal() {
  modalBg.classList.add("hidden");
  modalContent.classList.add("hidden");
}

const errorModalBg = document.getElementById("error-modal-bg");
const errorModalContent = document.getElementById("error-modal-content");
const closeErrorModal = document.getElementById("close-error-modal");
const infoModalBtn = document.getElementById("info-modal");
const infoModalBg = document.getElementById("info-modal-bg");
const infoModalContent = document.getElementById("info-modal-content");

function showErrorModal() {
  errorModalBg.classList.remove("hidden");
  errorModalContent.classList.remove("hidden");
}

function hideErrorModal() {
  errorModalBg.classList.add("hidden");
  errorModalContent.classList.add("hidden");
}

// Event listeners
searchBtn.addEventListener("click", validateInput);
subTit.addEventListener("click", showSummary);
closeModal.addEventListener("click", hideModal);
closeErrorModal.addEventListener("click", hideErrorModal);

const modal = document.querySelector(".main-modal");
const closeButton = document.querySelectorAll(".modal-close");

function modalClose() {
  modal.classList.remove("fadeIn");
  modal.classList.add("fadeOut");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
}

function openModal() {
  modal.classList.remove("fadeOut");
  modal.classList.add("fadeIn");
  modal.style.display = "flex";
}

for (let i = 0; i < closeButton.length; i++) {
  const elements = closeButton[i];

  elements.onclick = (e) => modalClose();

  modal.style.display = "none";

  window.onclick = function (event) {
    if (event.target == modal) modalClose();
  };
}

// About Modal

const aboutModal = document.querySelector(".about-modal");
const aboutCloseButton = document.querySelectorAll(".about-modal-close");

function aboutModalClose() {
  aboutModal.classList.remove("fadeIn");
  aboutModal.classList.add("fadeOut");
  setTimeout(() => {
    aboutModal.style.display = "none";
  }, 500);
}

function aboutOpenModal() {
  aboutModal.classList.remove("fadeOut");
  aboutModal.classList.add("fadeIn");
  aboutModal.style.display = "flex";
}

for (let i = 0; i < aboutCloseButton.length; i++) {
  const elements = aboutCloseButton[i];

  elements.onclick = (e) => aboutModalClose();

  aboutModal.style.display = "none";

  window.onclick = function (event) {
    if (event.target == aboutModal) aboutModalClose();
  };
}

const aboutBtn = document.getElementById("about");

aboutBtn.addEventListener("click", aboutOpenModal);
