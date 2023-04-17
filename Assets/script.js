var searchBtnEl = document.querySelector("#search-btn");
var userInputEl = document.querySelector("#input-val");
var historyTab = document.querySelector('.historyTab')

// load history as soon as page loads
getHistory();

// an empty array to hold the stringified values of the city names
var cityArr = JSON.parse(localStorage.getItem("city")) || []

// event listener to push user input (city name) 
searchBtnEl.addEventListener("click", function () {
  var cityName = userInputEl.value;
  cityArr.push(cityName)
  localStorage.setItem("city", JSON.stringify(cityArr))
  getApi(cityName);
  addCityBtn(cityName);
});

// function to add a city button based on last search
function addCityBtn(cityName) {
    var cityBtn = document.createElement("button")
    cityBtn.setAttribute("class", "btn btn-primary")
    cityBtn.innerHTML = cityName;
    cityBtn.addEventListener("click", function () {
      getApi(cityName)
    })
    historyTab.append(cityBtn)
}

// function to generate search history from saved local storage
function getHistory() {
  var history = JSON.parse(localStorage.getItem("city"))
  if (history == null) {
    return;
  } else {
  for(let i = 0; i < history.length; i++) {
    var cityBtn = document.createElement("button")
    cityBtn.setAttribute("class", "btn btn-primary")
    cityBtn.innerHTML = history[i]
    cityBtn.addEventListener("click", function () {
      getApi(history[i])
    })
    historyTab.append(cityBtn)
    }  
  }
}

// function to retrieve and use weather API for 5-day forecast
function getApi(cityName) {
  var geocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d11a010b66ec76b6b42b5dfdd94abada&units=imperial`;
  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then((apiResults) => {
      console.log(apiResults);
      var htmlCards = "";

      // for loop to iterate through every 8 spots in the array to get different days
      for (var i = 0; i < apiResults.list.length; i = i + 8) {
        htmlCards += `
<div class="card-fiveday border border-secondary-subtle">
  <div class="card-body">
    <h5 class="card-title">${apiResults.list[i].dt_txt}</h5>
    <img src="https://openweathermap.org/img/wn/${apiResults.list[i].weather[0].icon}@2x.png" class="card-subtitle" alt="weather-icon"></img>
    <p class="card-desc">Overcast: ${apiResults.list[i].weather[0].main}</p>
    <p class="card-subtitle mb-2 text-body-secondary">Temp: ${apiResults.list[i].main.temp} °F</p>
    <p class="card-text">Wind Speed: ${apiResults.list[i].wind.speed} MPH</p>
    <p class="card-link">Humidity: ${apiResults.list[i].main.humidity} %</p>
    </div>
</div>`;
      }
      document.querySelector(".future-forecast").innerHTML = htmlCards;
    })
    // function to retrieve and use weather API for current day forecast
    .then(function() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d11a010b66ec76b6b42b5dfdd94abada&units=imperial`)
      .then((response) => {
        return response.json()
      })
      .then((apiResults) => {
        console.log(apiResults)
        var htmlBox = "";

        // current day forecast html
        htmlBox += `
        <h4 class='weather-title'>${apiResults.name}</h4>
        <h5 id='date-title'>${dayjs().format('MMM D, YYYY')}</h5>
        <img src="https://openweathermap.org/img/wn/${apiResults.weather[0].icon}@2x.png"></img>
        <p>Overcast: ${apiResults.weather[0].main}</p>
        <p>Temp: ${apiResults.main.temp} °F</p>
        <p class="card-text">Wind Speed: ${apiResults.wind.speed} MPH</p>
        <p>Humidity: ${apiResults.main.humidity} %</p>
        `
        document.querySelector(".current-forecast").innerHTML = htmlBox;
      })
    }) 
}

 