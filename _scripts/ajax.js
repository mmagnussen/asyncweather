// add global variable containing XHR object here
let httpRequest = new XMLHttpRequest();

// add get() function here
function get(url) {
    return new Promise(function (resolve, reject) {
        httpRequest.open('GET', url)
        httpRequest.onload = function () {
            if (httpRequest.status === 200) {
                resolve(httpRequest.response);
            } else {     //Next define a fail-error status
                reject(Error(httpRequest.statusText)); //This error is not promise-specific
            }

        }
        httpRequest.send();
    })
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

}
//Display this image if the data GET fails
function failHandler(status) {
    console.log(status);

}

document.addEventListener('DOMContentLoaded', function () {
    //const apiKey = 'f9f2b9dbbd0092e4d3117e8f16d17432';
    const apiKey = '';

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=nashville&APPID=' + apiKey;
    // add get() function call here
    //  get(url, successHandler, failHandler);
    //The successHandler function needs know that the data was returned before executing. Enter>> callback to call the success callback.
    // successHandler(httpRequest.responseText);

    //console.log(get(url));

    //Here, a resolved promise is handing off the resultant data
    get(url)
        //handle a resolved promise
        .then(function (response) {
            successHandler(response);
        })

        //handle a rejected promise
        .catch(function (status) {
            failHandler(status);
        })
        //handle an alternate fail response to reduce redundancy
        .finally(function () {
            const weatherDiv = document.querySelector('#weather');
            weatherDiv.classList.remove('hidden');
        });
});

