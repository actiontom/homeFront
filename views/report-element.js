// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

//Import services
import { SpeedService } from '../services/speed-service';

//Import components
import '../helper_components/loader-component'

//Import styles
import 'lit-element-bootstrap/components/button';
import '@lit-element-bootstrap/layout';

// Extend the LitElement base class
export class ReportElement extends LitElement {

  constructor() {
    super();

    this.setDefaultDates();
    this.loadingState = false;   
  }

  static get properties() {
    return {
      name: { type: String },
      report: { type: Array},
      speedTest: { type: Object},
      beginDate: { type: String},
      endDate: { type: String},
      loadingState: { type: Boolean} 
    };
  }

  setDefaultDates(){

    let date = new Date();

    let dateToday = date.setHours(date.getHours()+2);
    let dateYesterday = new Date(date - 1000 * 60 * 60 * 24 * 1);

   dateYesterday.setHours(0,0,0,0);
         
    this.report = null;
    this.speedTest = null;
    this.reportRequested = false;
    this.beginDate = this.getLocalTime(dateYesterday, false).toISOString().substr(0,16);
    this.endDate = this.getLocalTime(dateToday, false).toISOString().substr(0,16);

    console.log(this.beginDate);

  }

  /**
   * Call Speed service to get speed report.
   * 
   */
  async speed(){
    this.loadingState = true;
    this.reportRequested = true;
    this.beginDate = this.shadowRoot.getElementById('bDate').value;
    this.endDate = this.shadowRoot.getElementById('eDate').value;
    this.report = await SpeedService.getSpeedReport(this.beginDate, this.endDate);
    this.loadingState = false;
  }

  /**
   *  Get the local "Time Zone" time.
   */
  getLocalTime(gmtTime, dateString = true){

    let localTime = null;

    const options = {
      timeZone:"Africa/Johannesburg",
      hour12 : false,
      hour:  "2-digit",
      minute: "2-digit",
     second: "2-digit"
   };

    if (dateString){

      
      if(gmtTime instanceof Date){
       
        localTime = new Date(gmtTime).toLocaleDateString("en-ZA", options);
      }
      else {
       localTime = new Date(Date.parse(gmtTime)).toLocaleDateString("en-ZA", options);       
      }
    }
    else {
      localTime = new Date(new Date(gmtTime).toLocaleDateString("en-ZA", options));
    }


    return localTime;
  }

  static get styles() {
    return css`
    `;
  }

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render(){
    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
      <!-- template content -->
      <link rel="stylesheet" href="./styles/app-styles.css">

      <div class="container">
      
      <div>
        <h4>Get your speed report.</h4>
      </div>

      <div>
        <loader-component .loading="${this.loadingState}" ></loader-component>
      </div>

      <div>
        <label>Start Date: </label>
      </div>
      
      <div>
        <input type="datetime-local" id="bDate" value="${this.beginDate}">
      </div>

      <div>  
        <label>End Date: </label>
      </div>

      <div>
        <input type="datetime-local" id="eDate" value="${this.endDate}">
      </div>

      <div>
        <bs-button @click="${this.speed}" info>Get Report</bs-button>
      </div>   

     
          ${this.report === null ? '' : html`
            <div class="divOverFlow">
              <table>
                <tr>
                  <th>Time</th>
                  <th>Upload Speed</th>
                  <th>Download Speed</th>
                  <th>Type</th>
                </tr>
                ${ this.report.map(res=> html` <tr><td>${this.getLocalTime(res.time)}</td><td>${res.uploadSpeed}</td><td>${res.downloadSpeed}</td><td>${res.type}</td></tr>`)}
              </table>       
            </div>
        `}
        </div>
    
    `;
  }
}
// Register the new element with the browser.
customElements.define('report-element', ReportElement);