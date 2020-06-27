// Import dependencies.
import { API } from '../helpers/api';
import config from '../config';

 export class Covid19Service {

    static async getCovid19Summary() {       

        // var url = "http://localhost:3000/covid19summary"
        var url = 'http://' + config.production.homeServiceIP + ':3000/covid19summary'
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;
    }

    static async getCovid19Countries() {   

        // var url = "http://localhost:3000/covid19Countries"
        var url = 'http://' + config.production.homeServiceIP + ':3000/covid19Countries'
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading  
        return result;
    }

    static async getCovid19DayOne(country, status) {      

        // var url = "http://localhost:3000/covid19DayOne?" + "country=" + country + "&status=" + status
        var url = 'http://' + config.production.homeServiceIP + ':3000/covid19DayOne?country=' + country + '&status=' + status
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;
    }
}