// event listener for search button

// function to retrieve and use weather API
function getApi() {
    
    var geocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d11a010b66ec76b6b42b5dfdd94abada`;

    fetch(geocodeUrl)
    .then (function(response) {
        return response.json();
    });

}