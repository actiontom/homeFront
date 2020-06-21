// Import dependencies.
import { API } from '../helpers/api';

 export class Covid19Service {

    static async getCovid19Summary() {       

        //var url = "http://192.168.101.227:3000/searchCity".concat(queryString);
        var url = "http://localhost:3000/covid19summary"
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;
    }

    static async getCovid19Countries() {   

        //var url = "http://192.168.101.227:3000/searchCity".concat(queryString);
        var url = "http://localhost:3000/covid19Countries"
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading  
        return result;
    }

    static async getCovid19DayOne(country, status) {      

        //var url = "http://192.168.101.227:3000/searchCity".concat(queryString);
        var url = "http://localhost:3000/covid19DayOne?" + "country=" + country + "&status=" + status
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;
    }
}