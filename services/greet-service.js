// Import dependencies.
import { API } from '../helpers/api';

 export class GreetService {

    static async greet(name) {        
        let queryString = "?name=".concat(name);

        //var url = "http://192.168.101.227:3000/greet".concat(queryString);
        var url = "http://localhost:3000/greet".concat(queryString);
        var method = "GET";

        // await code here
        let result = await API.makeRequest(method, url);
        
        // code below here will only execute when await makeRequest() finished loading               
        return result;

    }
}



