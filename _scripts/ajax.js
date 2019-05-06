// add global variable containing XHR object here
let httpRequest = new XMLHttpRequest();

// add get() function here
function get(url, success) {
    httpRequest.open('GET', url)
    httpRequest.onload = function () {
        success(httpRequest.responseText);
    }
    httpRequest.send();
}

function tempToF(kelvin) {
    return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

function successHandler(data) {
    const dataObj = JSON.parse(data);
    const weatherDiv = document.querySelector('#weather');
    const weatherFragment = `
        <h1>Weather</h1>
        <h2 class="top">
        <img
            src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
            alt="${dataObj.weather[0].description}"
            width="50"
            height="50"
        />${dataObj.name}
        </h2>
        <p>
        <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${dataObj.weather[0].description}
        </p>
    `
    weatherDiv.innerHTML = weatherFragment;
    weatherDiv.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'f9f2b9dbbd0092e4d3117e8f16d17432';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=nashville&APPID=' + apiKey;
    // add get() function call here
    get(url, successHandler);
    //The successHandler function needs know that the data was returned before executing. Enter>> callback to call the success callback.
    // successHandler(httpRequest.responseText);
});

