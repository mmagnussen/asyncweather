// add global variable containing XHR object here


// add get() function here
function get(url) {
    return new Promise(function (resolve, reject) {

        //move httpRequest to get function
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', url)
        httpRequest.onload = function () {
            if (httpRequest.status === 200) {
                resolve(httpRequest.response);
            } else {     //Next define a fail-error status
                reject(Error(httpRequest.statusText)); //This error is not promise-specific
            }

        };
        //handle network errors
        httpRequest.onerror = function () {
            reject(Error('Network Error'));
        };

        httpRequest.send();
    });
}

function tempToF(kelvin) {
    return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

function successHandler(data) {
    const dataObj = JSON.parse(data);
    // const weatherDiv = document.querySelector('#weather');
    const div = `
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
        </p>`;
    return div;
    // weatherDiv.innerHTML = weatherFragment;

}
//Display this image if the data GET fails
function failHandler(status) {
    console.log(status);

}

document.addEventListener('DOMContentLoaded', function () {
    //const apiKey = 'f9f2b9dbbd0092e4d3117e8f16d17432';
    const apiKey = '';

    //const url = 'https://api.openweathermap.org/data/2.5/weather?q=nashville&APPID=' + apiKey;

    const weatherDiv = document.querySelector('#weather');


    const locations = [
        `los+angeles`,
        `san+francisco,us`,
        `lone+pine,us`,
        `mariposa,us`
    ];

    const urls = locations.map(function (location) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
    });
    // add get() function call here

    // Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])
    //     //  get(url, successHandler, failHandler);
    //     //The successHandler function needs know that the data was returned before executing. Enter>> callback to call the success callback.
    //     // successHandler(httpRequest.responseText);

    //     //console.log(get(url));

    //     //Here, a resolved promise is handing off the resultant data
    //     // get(url)
    //     //handle a resolved promise
    //     .then(function (responses) {
    //         return responses.map(function (response) { //return array of literals/api urls
    //             return successHandler(response);
    //         })
    //     })
    //     //markup the weather header 
    //     .then(function (literals) {
    //         weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join('')}`;
    //     })
    //     //handle a rejected promise
    //     .catch(function (status) {
    //         failHandler(status);
    //     })
    //     //handle an alternate fail response to reduce redundancy
    //     .finally(function () {

    //         weatherDiv.classList.remove('hidden');
    //     });

    //create an async/await function that will wait to get the weather data for each of the four cities before moving on
    (async function () {

        // the 'try' block is part of error handling in an async/await function
        try {
            let responses = [];

            //each of the await statements will begin at the same time, but the obejct 'literals' is waiting for those awaits to return a
            responses.push(await get(urls[0]));
            responses.push(await get(urls[1]));
            responses.push(await get(urls[2]));
            responses.push(await get(urls[3]));

            let literals = responses.map(function (response) { //return array of literals/api urls
                return successHandler(response);
            });

            weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join('')}`;
            weatherDiv.classList.remove('hidden');
        }

        catch (status) {
            failHandler(status);

        }
        finally {
            weatherDiv.classList.remove('hidden');
        }


    })();
});

