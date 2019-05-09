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
    const apiKey = 'f9f2b9dbbd0092e4d3117e8f16d17432';
    //const apiKey = ''; //invalid apiKey for testing

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

/*
    //enter transpiled code of the above async/await function from Babel-Rebel transpiler:

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

    function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

    _asyncToGenerator(
        /*#__PURE__*/ /*
        regeneratorRuntime.mark(function _callee() {
            var responses, literals;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            responses = [];
                            _context.t0 = responses;
                            _context.next = 5;
                            return get(urls[0]);

                        case 5:
                            _context.t1 = _context.sent;

                            _context.t0.push.call(_context.t0, _context.t1);

                            _context.t2 = responses;
                            _context.next = 10;
                            return get(urls[1]);

                        case 10:
                            _context.t3 = _context.sent;

                            _context.t2.push.call(_context.t2, _context.t3);

                            _context.t4 = responses;
                            _context.next = 15;
                            return get(urls[2]);

                        case 15:
                            _context.t5 = _context.sent;

                            _context.t4.push.call(_context.t4, _context.t5);

                            _context.t6 = responses;
                            _context.next = 20;
                            return get(urls[3]);

                        case 20:
                            _context.t7 = _context.sent;

                            _context.t6.push.call(_context.t6, _context.t7);

                            literals = responses.map(function (response) {
                                return successHandler(response);
                            });
                            weatherDiv.innerHTML = "<h1>Weather</h1>".concat(literals.join(''));
                            weatherDiv.classList.remove('hidden');
                            _context.next = 30;
                            break;

                        case 27:
                            _context.prev = 27;
                            _context.t8 = _context["catch"](0);
                            failHandler(_context.t8);

                        case 30:
                            _context.prev = 30;
                            weatherDiv.classList.remove('hidden');
                            return _context.finish(30);

                        case 33:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, null, [[0, 27, 30, 33]]);
        }))();
});

*/
