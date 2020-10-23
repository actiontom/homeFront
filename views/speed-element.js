// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

//Import Services
import { SpeedService } from '../services/speed-service';

//Import Components
import '../helper_components/loader-component'

//Import Styles
import 'lit-element-bootstrap/components/button';
import '@lit-element-bootstrap/layout';

// Extend the LitElement base class
export class SpeedElement extends LitElement {

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

    let dateToday = date;    

    let dateYesterday = date- 1000 * 60 * 60 * 24 * 1; 
    dateYesterday = new Date(dateYesterday); 

    dateToday.setSeconds(0,0);
    dateYesterday.setSeconds(0,0);    
         
    this.report = null;
    this.speedTest = null;
    this.reportRequested = 'Not Requested.';
    this.beginDate = dateYesterday.toISOString().substr(0,16);
    this.endDate = dateToday.toISOString().substr(0,16);    
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
   * Call Speed service to get a speed test result.
   */
  async speedTester(){
    this.loadingState = true;    
    this.speedTest = await SpeedService.getSpeedTest();   
    this.loadingState = false;
  }

  static get styles() {
    return css``;
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
     <link rel="stylesheet" href="./styles/app-styles.css">

      <!-- template content -->

      <div>
        <loader-component .loading="${this.loadingState}" ></loader-component>
      </div>

      <div class="container">
      <div>
        <h4>Test your line speed.</h4>
      </div>
        <div>
          <bs-button @click="${this.speedTester}" info>Run Test</bs-button>
          ${this.speedTest === null ? html`<div></div>` : html`           
            <div>
              <table class="center">
                <tr>             
                  <th>Download Speed</th>
                </tr>
                ${ this.speedTest ? html` <tr><td>${this.speedTest.speeds.download + ' kB/s'}</td></tr>` : `` }
              </table>        
            </div>
            `}
        </div>
       
      </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define('speed-element', SpeedElement);