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
const highLowContainer = document.getElementById('day-high-low');

const apiKEY = "6wqm0f4vkilufitxhwxlf06d8t39svnfbhbou4gm";

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

async function fetchData() {
  try {
    const response = await fetch(
      `https://www.meteosource.com/api/v1/free/point?place_id=${cityInput.value.trim()}&sections=all%2C%20daily&language=en&units=metric&key=${apiKEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
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

    const wData = document.getElementById("test");

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
    showErrorModal();
    // You can handle the error here, e.g., display an error message to the user.
  }
}

// Validate input, start loader and fetch data
function validateInput() {
  if (cityInput.value === "") {
    showModal();
  } else {
    displayLoading();
    fetchData();

    itemContainer.classList.remove("hidden");
    subTit.classList.remove("hidden");
    highLowContainer.classList.remove('hidden');
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
  }, 7000);
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

const modalBg = document.getElementById('modal-bg');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

function showModal() {
  modalBg.classList.remove('hidden')
  modalContent.classList.remove('hidden')
}

function hideModal() {
  modalBg.classList.add('hidden')
  modalContent.classList.add('hidden')
}

const errorModalBg = document.getElementById('error-modal-bg');
const errorModalContent = document.getElementById('error-modal-content');
const closeErrorModal = document.getElementById('close-error-modal');
const infoModalBtn = document.getElementById('info-modal');
const infoModalBg = document.getElementById('info-modal-bg');
const infoModalContent = document.getElementById('info-modal-content');

function showErrorModal() {
  errorModalBg.classList.remove('hidden')
  errorModalContent.classList.remove('hidden')
}

function hideErrorModal() {
  errorModalBg.classList.add('hidden')
  errorModalContent.classList.add('hidden')
}

// Event listeners
searchBtn.addEventListener("click", validateInput);
subTit.addEventListener("click", showSummary);
closeModal.addEventListener('click', hideModal);
closeErrorModal.addEventListener('click', hideErrorModal);




const modal = document.querySelector('.main-modal');
    const closeButton = document.querySelectorAll('.modal-close');

    const modalClose = () => {
        modal.classList.remove('fadeIn');
        modal.classList.add('fadeOut');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }

    const openModal = () => {
        modal.classList.remove('fadeOut');
        modal.classList.add('fadeIn');
        modal.style.display = 'flex';
    }

    for (let i = 0; i < closeButton.length; i++) {

        const elements = closeButton[i];

        elements.onclick = (e) => modalClose();

        modal.style.display = 'none';

        window.onclick = function (event) {
            if (event.target == modal) modalClose();
        }
    }