var searchBtnEl = document.querySelector('#search-btn');
var userInputEl = document.querySelector('#input-val');

// event listener for search button
searchBtnEl.addEventListener('click', function() {
  var cityName = userInputEl.value
  getApi(cityName)
});

// function to retrieve and use weather API
function getApi(cityName) {
    
    var geocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d11a010b66ec76b6b42b5dfdd94abada&units=imperial`;

    fetch(geocodeUrl)
    .then (function(response) {
        return response.json();
    })
    .then(apiResults => {
        console.log(apiResults)
        var htmlCards =""
        for (var i = 0; i < apiResults.list.length; i = i + 8) {
            htmlCards += `
<div class="card-fiveday border border-secondary-subtle">
  <div class="card-body">
    <h5 class="card-title">${apiResults.list[i].dt_txt}</h5>
    <img src="https://openweathermap.org/img/wn/${apiResults.list[i].weather[0].icon}@2x.png" class="card-subtitle"></a>
    <p class="card-tile">Overcast: ${apiResults.list[i].weather[0].description}</p>
    <p class="card-subtitle mb-2 text-body-secondary">Temp: ${apiResults.list[i].main.temp} °F</p>
    <p class="card-text">Wind Speed: ${apiResults.list[i].wind.speed} MPH</p>
    <p class="card-link">Humidity: ${apiResults.list[i].main.humidity} %</p>
    </div>
</div>`
        }
        document.querySelector('.future-forecast').innerHTML = htmlCards;
    })

}