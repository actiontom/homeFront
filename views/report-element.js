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

    this.getLocalTime(date);

    let dateToday = date;
    let dateYesterday = new Date(date - 1000 * 60 * 60 * 24 * 1);

    dateToday.setSeconds(0,0);
    dateYesterday.setHours(0,0,0,0);
         
    this.report = null;
    this.speedTest = null;
    this.reportRequested = 'Not Requested.';
    this.beginDate = this.getLocalTime(dateYesterday).toISOString().substr(0,16);
    this.endDate = this.getLocalTime(dateToday).toISOString().substr(0,16);

  }

  /**
   * Call Speed service to get speed report.
   * 
   */
  async speed(){
    this.loadingState = true;
    this.reportRequested = 'Requested.';
    this.beginDate = this.shadowRoot.getElementById('bDate').value;
    this.endDate = this.shadowRoot.getElementById('eDate').value;
    this.report = await SpeedService.getSpeedReport(this.beginDate, this.endDate);
    this.loadingState = false;
  }

  /**
   *  Get the local "Time Zone" time.
   */
  getLocalTime(gmtTime){

    let timeZoneOffset = null;
    let localTime = null;
    
    if(gmtTime instanceof Date){
      timeZoneOffset = gmtTime.getTimezoneOffset();
      localTime = new Date(gmtTime.getTime() - ( timeZoneOffset * 60000) );
    }
    else {
      gmtTime = new Date(Date.parse(gmtTime));
      timeZoneOffset = gmtTime.getTimezoneOffset();
      localTime = gmtTime;
    }

    return localTime;
  }

  static get styles() {
    return css`
    :host {
      display: block;
    }
    
    .flex-container {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      margin: auto;
      flex-direction: column;
      width: auto;
    }
    
    .flex-container > div {
      background-color: #f1f1f1;     
      text-align: center;
    }

    h4 {
      text-align: center;
    }

    div{
      padding: 5px;
      font-family: Roboto;
    }
    .divOverFlow{
      height: 300px;
      overflow-y: scroll;
      background-color: white;
    }
    
    table {
      font-family: Roboto;
    }
    
    table.center {
      margin-left:auto;
      margin-right:auto;
    }  
    
    th, td {
      padding: 5px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .th{
      position: sticky;     
      height: 50px;
    }

    tr:hover {background-color: #f5f5f5;}
    
    td{
      font-size: 14px;
    }    
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

      <div class="flex-container">
      
      <div>
        <h4>Get your speed report.</h4>
      </div>

      <div>
        <loader-component .loading="${this.loadingState}" ></loader-component>
      </div>

        <div>
          <label>Start Date: </label>
          <input type="datetime-local" id="bDate" value="${this.beginDate}">
          <label>End Date: </label>
          <input type="datetime-local" id="eDate" value="${this.endDate}">
        </div>

        <div>
          <bs-button @click="${this.speed}" info>Get Report</bs-button>
        </div>

        <div>
          ${this.report === null ? 'Nothing to display yet.' : html`
            <div class="divOverFlow">
              <table class="center">
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
      </div>
      </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define('report-element', ReportElement);