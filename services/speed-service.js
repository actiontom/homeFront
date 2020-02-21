
 export class SpeedService {

    static async getSpeedReport(beginDate = null, endDate = null) {

        let url = "";
        var method = "GET";

        if (beginDate === '' || endDate === ''){

            //url = "http://192.168.101.227:3000/speedHistory";
            url = "http://localhost:3000/speedHistory";
        } 
        else {
            //url = "http://192.168.101.227:3000/speedHistory?beginDate=" + beginDate + "&endDate=" + endDate;
            url = "http://localhost:3000/speedHistory?beginDate=" + beginDate + "&endDate=" + endDate;
        }        
        
        // await code here
        let result = await makeRequest(method, url);
        console.log(result);
        
        // code below here will only execute when await makeRequest() finished loading               
        return JSON.parse(result);
        }

    static async getSpeedTest() {

        let url = "";
        var method = "GET";       

        //url = "http://192.168.101.227:3000/speedTest";
        url = "http://localhost:3000/speedTest?type=manually";        
        
        // await code here
        let result = await makeRequest(method, url);
        
        
        // code below here will only execute when await makeRequest() finished loading               
        return JSON.parse(result);
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




