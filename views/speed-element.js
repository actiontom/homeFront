// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

import { SpeedService } from '../services/speed-service';

// Extend the LitElement base class
export class SpeedElement extends LitElement {

  constructor() {
    super();

    this.setDefaultDates();
    
  }

  static get properties() {
    return {
      name: { type: String },
      report: { type: Array},
      beginDate: { type: String},
      endDate: { type: String} 
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
    this.beginDate = dateYesterday.toISOString().substr(0,16);
    this.endDate = dateToday.toISOString().substr(0,16);
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
      font-family: Palatino;
    }

   
    .button
    {
      width: 150px;
      text-align: center;
      margin:0 auto;

    }

    table {
      font-family: Palatino;
      
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

    th{
      height: 50px;
    }

    tr:hover {background-color: #f5f5f5;}
    
    td{
      font-size: 14px;
    }
    `;
  }

  /**
   * Call Speed service to get speed report.
   * 
   */
  async speed(){ 

    this.beginDate = this.shadowRoot.getElementById('bDate').value;
    this.endDate = this.shadowRoot.getElementById('eDate').value;
    console.log(this.beginDate, this.endDate)
    
    
  this.report = await SpeedService.getSpeedReport(this.beginDate, this.endDate); 
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
      <h4>Get today's speed report</h4>
      <div class="flex-container">
      
      <div><label>Start Date: </label>      
      <input type="datetime-local" id="bDate" value="${this.beginDate}">
      <label>End Date: </label>
      <input type="datetime-local" id="eDate" value="${this.endDate}"></div>
            
      <div><button class="button" @click="${this.speed}">Get Report</button></div>
    </div>
       <div class="divOverFlow">
          ${!this.report ? null : html`
        <table class="center">
          <tr>
            <th>Time</th>
            <th>Upload Speed</th>
            <th>Download Speed</th>
          </tr>
          ${ this.report.map(res=> html` <tr><td>${res.time}</td><td>${res.uploadSpeed}</td><td>${res.downloadSpeed}</td></tr>`)}                 
        </table>        
          `}
       </div>       
    `;
  }
}
// Register the new element with the browser.
customElements.define('speed-element', SpeedElement);