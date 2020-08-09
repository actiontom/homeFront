import { API } from '../helpers/api';
import config from '../config';
 export class SpeedService {

    static async getSpeedReport(beginDate = null, endDate = null) {

        let url = "";
        var method = "GET";

        if (beginDate === '' || endDate === ''){

            url = 'http://' + config.development.homeServiceIP + ':3000/speedHistory';
           
        } 
        else {
            
            url = 'http://' + config.development.homeServiceIP + ':3000/speedHistory?beginDate=' + beginDate + '&endDate=' + endDate;
        }        
        
        // await code here
        let result = await API.makeRequest(method, url);
        console.log(result);
        
        // code below here will only execute when await makeRequest() finished loading               
        return JSON.parse(result);
        }

    static async getSpeedTest() {

        let url = "";
        var method = "GET";       

        url = 'http://' + config.development.homeServiceIP + ':3000/speedTest?type=manually';        
        
        // await code here
        let result = await API.makeRequest(method, url);
        
        
        // code below here will only execute when await makeRequest() finished loading               
        return JSON.parse(result);
        }
}




