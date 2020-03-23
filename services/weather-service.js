
 export class WeatherService {

    static async searchCity(cityText) {        
        let queryString = "?city=".concat(cityText);

        //var url = "http://192.168.101.227:3000/searchCity".concat(queryString);
        var url = "http://localhost:3000/searchCity".concat(queryString);
        var method = "GET";

        // await code here
        let result = await makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;
    }

    static async currentWeather(key) {        
        let queryString = "?locationKey=".concat(key);

        //var url = "http://192.168.101.227:3000/currentWeather".concat(queryString);
        var url = "http://localhost:3000/currentWeather".concat(queryString);
        var method = "GET";

        // await code here
        let result = await makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;
    }
}

function makeRequest(method, url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }