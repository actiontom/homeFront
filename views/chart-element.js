// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

// Import services.
import { Covid19Service } from '../services/covid19-service';

// maps api key : AIzaSyDrFoDCHevcCFIpq6CzzBYTgJ4D8g7PVrk old
// maps api key : AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I

import '@google-web-components/google-chart';

export class ChartElement extends LitElement {

  constructor() {
      super();

      this.chartType = null;
      this.countriesSummary = null;
      this.getSummary();    
    }
      
  static get properties() {
    return {
      chartType: { type: String },
      countriesSummary: { type: String }      
    };
  }

  connectedCallback() {
    super.connectedCallback();    
  }

  async getSummary() {
    let result = await Covid19Service.getCovid19Summary();
        result = JSON.parse(result);
   
    let summary = [["CountryCode", "Country", "TotalConfirmed", "TotalDeaths"]]
    result.Countries.map((res)=> {
      summary.push([res.CountryCode, res.Country, res.TotalConfirmed, res.TotalDeaths]);
    })
    
    this.countriesSummary = JSON.stringify(summary);
    
  }

  getChart () {
        this.chartType = this.shadowRoot.getElementById('selectedChartType').value;
        console.log(this.chartType);
  }

  static get styles() {
    return css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
     
      flex-wrap: wrap;
    }
    div{
      margin:auto;
      padding: 5px;
      margin:auto;    
    }
    google-chart{
      margin:auto;
      width: 1200px;
      height: 550px;
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

      <div>

        <select id="selectedChartType">

        <option value = ""></option>
          <option value = "Geo">Geo</option>
          <option value = "Pia">Pie</option>

        </select>

        <bs-button @click="${this.getChart}" info>Select</<bs-button>

      </div>

      <div>
        ${this.chartType === 'Geo' ? html`
        <google-chart 
          type='geo'
          key='AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I'
          options='{ 
                    "backgroundColor": "#81d4fa",
                    "datalessRegionColor": "#f8bbd0",
                    "defaultColor": "#f5f5f5",
                    "colorAxis": {"minValue": "0", "maxValue": "20000", "colors": ["#FFFF00", "#FF0000"]}
                    }'
          data='${this.countriesSummary}'>
        </google-chart>
        ` : ''
        }      
      </div>
    
    `;
  }
}
// Register the new element with the browser.
customElements.define('chart-element', ChartElement);

