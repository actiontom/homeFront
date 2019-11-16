// Import the LitElement base class and html helper function
import { LitElement, html, css } from "../node_modules/lit-element/lit-element.js";
import { SpeedService } from "../services/speed-service.js"; // Extend the LitElement base class

export class SpeedElement extends LitElement {
  constructor() {
    super();
    this.setDefaultDates();
  }

  static get properties() {
    return {
      name: {
        type: String
      },
      report: {
        type: Array
      },
      beginDate: {
        type: String
      },
      endDate: {
        type: String
      }
    };
  }

  setDefaultDates() {
    let date = new Date();
    let dateToday = date;
    let dateYesterday = date - 1000 * 60 * 60 * 24 * 1;
    dateYesterday = new Date(dateYesterday);
    dateToday.setSeconds(0, 0);
    dateYesterday.setSeconds(0, 0);
    this.report = null;
    this.beginDate = dateYesterday.toISOString().substr(0, 16);
    this.endDate = dateToday.toISOString().substr(0, 16);
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

    .button {
      display: inline-block;
      padding: 15px 25px;
      font-size: 15px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: #fff;
      background-color: #4CAF50;
      border: none;
      border-radius: 15px;
      box-shadow: 0 9px #999;
      margin:auto;
    }
    
    .button:hover {background-color: #3e8e41}
    
    .button:active {
      background-color: #3e8e41;
      box-shadow: 0 5px #666;
      transform: translateY(2px);
    }
    

    .divOverFlow{
      height: 250px;
      overflow-y: scroll;
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


  async speed() {
    this.beginDate = this.shadowRoot.getElementById('bDate').value;
    this.endDate = this.shadowRoot.getElementById('eDate').value;
    console.log(this.beginDate, this.endDate);
    this.report = await SpeedService.getSpeedReport(this.beginDate, this.endDate);
  }
  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */


  render() {
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
      <input type="datetime-local" id="bDate" value="${this.beginDate}"></div>  
      <div><label>End Date: </label>
      <input type="datetime-local" id="eDate" value="${this.endDate}"></div>
            
       </div>
       <p><button class="button" @click="${this.speed}">Get Report</button></p>
       <div class="divOverFlow">
          ${!this.report ? null : html`
        <table class="center">
          <tr>
            <th>Time</th>
            <th>Upload Speed</th>
            <th>Download Speed</th>
          </tr>
          ${this.report.map(res => html` <tr><td>${res.time}</td><td>${res.uploadSpeed}</td><td>${res.downloadSpeed}</td></tr>`)}                 
        </table>        
          `}
       </div>       
    `;
  }

} // Register the new element with the browser.

customElements.define('speed-element', SpeedElement);