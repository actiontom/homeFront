import { API } from '../helpers/api';
import config from '../config';
 export class WeatherService {

    static async searchCity(cityText) {        
        let queryString = "?city=".concat(cityText);

        
        var url = 'http://' + config.production.homeServiceIP + ':3000/searchCity'.concat(queryString);
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;
    }

    static async currentWeather(key) {        
        let queryString = "?locationKey=".concat(key);

        
        var url = 'http://' + config.production.homeServiceIP + ':3000/currentWeather'.concat(queryString);
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;
    }
}

