const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search');
const weather = document.getElementById('weather-container');
const title = document.getElementById('cityTitle');
const wind = document.getElementById('wind');
const direction = document.getElementById('direction');
const rain = document.getElementById('rain');
const temp = document.getElementById('temp');
const itemContainer = document.getElementById('item-container');
const dailyData = document.getElementById('daily-data');
const spanData = document.getElementById('span-data');


const weatherImage = document.getElementById('w-image');

const apiKEY = "6wqm0f4vkilufitxhwxlf06d8t39svnfbhbou4gm";

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });

  

async function fetchData() {

      const response = await fetch(`https://www.meteosource.com/api/v1/free/point?place_id=${cityInput.value}&sections=current%2C%20daily&language=en&units=auto&key=${apiKEY}`);
      const data = await response.json();
      // Handle the data returned from the API
      const allData = data;
      console.log(allData)
      const daily = allData.daily.data
      console.log(daily)

      let dailyCards = "";

      daily.forEach(element => {
        let data = element
        console.log(data)
        console.log(data.all_day);
        // console.log(data.day)
        // console.log(data.weather)

        dailyCards += `<div class="daily-data">
        <h2 class="day">${data.day}</h2>
        <span class="summary">${data.all_day.weather}</span>
        </div>
        `

      });

      dailyData.innerHTML = dailyCards;

      const conditions = data.current.summary;
      const temperature = data.current.temperature;

      console.log(data.current)

    const wData = document.getElementById('test');

    wind.innerHTML = `${data.current.wind.speed} km/s`
    direction.innerHTML = `${data.current.wind.dir}`
    rain.innerHTML = `${data.current.precipitation.type}`
    temp.innerHTML = `${temperature}`
    

    title.innerHTML = cityInput.value.capitalize();
    wData.innerHTML = `Current conditions: <strong>${conditions}</strong>`;

    cityInput.value = '';
  }

  function validateInput() {
    if (cityInput.value === "") {
        alert("please enter a city");
    } else {
        fetchData()
        itemContainer.classList.remove('hidden')
    }
  }

  searchBtn.addEventListener('click', validateInput);

  


//   `
//     <h1>The current conditions are <strong>${conditions}</strong></h1>
//     `