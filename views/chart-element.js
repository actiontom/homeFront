// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

// Import services.
import { Covid19Service } from '../services/covid19-service';

// maps api key : AIzaSyCbrdkMYW4lDiu5Ywmxa2tSdFSGJiWXVxg 

import '@google-web-components/google-chart';

export class ChartElement extends LitElement {

  constructor() {
      super();

      this.countriesSummary = null;
      this.getSummary();     
    }
      
  static get properties() {
    return {
      countriesSummary: { type: String }      
    };
  }

  connectedCallback() {
    super.connectedCallback()
    
    console.log('connected')
  }

  async getSummary() {
    let result = await Covid19Service.getCovid19Summary();
        result = JSON.parse(result);
   
    let summary = [["Country", "TotalConfirmed", "TotalDeaths"]]
    result.Countries.map((res)=> {
      summary.push([res.Country, res.TotalConfirmed, res.TotalDeaths]);
    })
    
    this.countriesSummary = JSON.stringify(summary);
    
    console.log(this.countriesSummary);
    
  }

  static get styles() {
    return css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      flex-direction: column;
     
      flex-wrap: wrap;
    }
    div{
      padding: 5px;
      margin:auto;    
    }
    google-chart{
      width: 900px;
      height: 500px;
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
     <google-chart 
      type='geo'
      mapsApiKey: 'AIzaSyCbrdkMYW4lDiu5Ywmxa2tSdFSGJiWXVxg'
      options='{ 
                 "backgroundColor": "#81d4fa",
                 "datalessRegionColor": "#f8bbd0",
                 "defaultColor": "#f5f5f5",
                 "colorAxis": {"minValue": "10", "maxValue": "10000", "colors": ["#FFFF00", "#FF8000", "FF4200", "FF0000"]}
                }'
      data='${this.countriesSummary}'>
    </google-chart>     
    
    `;
  }
}
// Register the new element with the browser.
customElements.define('chart-element', ChartElement);

