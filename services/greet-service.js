// Import dependencies.
import { API } from '../helpers/api';
import config from '../config';

 export class GreetService {
     
     
    static async greet(name) {        
        let queryString = "?name=".concat(name);

        var url = 'http://' + config.production.homeServiceIP + ':3000/greet'.concat(queryString);
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;

    }
}



