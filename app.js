let appId = '150264657cbfd69e885923082532aa13';
let units = 'metric';
//Metoda pretrage po gradu
let searchMethod;


function getSearchMethod(searchTerm) {
        searchMethod = 'q';
}

/*
Poziva URL za API i pretrazuje vrednost koja se koristi u searchMethod, daje API kljuc kao ID aplikacije, a ta jedinica koja se koristi je metrička jedinica, a zatim vraca HTTP odgovor kao JSON element, a zatim cal init funkciju.
*/
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=150264657cbfd69e885923082532aa13&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

/*
Prikazuje rezultat na konzoli.
Menja pozadinu u skladu sa podacima dobijenom iz vremenskog JSON elementa
*/
function init(resultFromServer) {
    console.log(resultFromServer);
    switch (resultFromServer.weather[0].main) {
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("img/thunderstorm.jpg")';
            break;
        case 'Rain':
            document.body.style.backgroundImage = 'url("img/rain.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("img/snow.jpg")';
            break;
        case 'Atmosphere':
            document.body.style.backgroundImage = 'url("img/atmosphere.jpg")';
            break;
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/sunny.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
            break;
        default:
            break;

    }

    let weatherDescriptionHeader = document.getElementById('weather-description-header');
    let temperatureEle = document.getElementById('temperature');
    let windSpeed = document.getElementById('wind-speed');
    let humidityEle = document.getElementById('humidity');
    let cityName = document.getElementById('city-name');
    let weatherIcon = document.getElementById('weather-icon');

    //Uzima detalje o vremenu iz JSON elementa
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerHTML = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureEle.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';

    windSpeed.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s.';

    cityName.innerHTML = resultFromServer.name;

    humidityEle.innerHTML = 'Humidity level is ' + resultFromServer.main.humidity + '%';

    weatherInfoPosition();
}


function weatherInfoPosition() {
    let weatherContainer = document.getElementById("weather-container");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
    weatherContainer.style.visibility = 'visible';
}

/*
Pretraga
*/
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm)
        searchWeather(searchTerm);
})
