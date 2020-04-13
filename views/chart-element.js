// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

// Import services.
import { Covid19Service } from '../services/covid19-service';

// Import styles
import 'lit-element-bootstrap/components/button';
import '@lit-element-bootstrap/layout';

// maps api key : AIzaSyDrFoDCHevcCFIpq6CzzBYTgJ4D8g7PVrk old
// maps api key : AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I

import '@google-web-components/google-chart';

// Import Components
import '../helper_components/loader-component'

export class ChartElement extends LitElement {

  constructor() {
      super();

      this.chartType = null;

      this.countriesSummary = null;

      this.pieSummary = null;

      this.barSummary = null;

      this.countryNames = null;
      
      this.dayOneSummary = null;

      this.selectedCountryName = null;

      this.loadingState = false;

      
    }
      
  static get properties() {
    return {
      chartType: { type: String },
      countriesSummary: { type: String },      
      pieSummary: { type: String },   
      barSummary: { type: String },
      countryNames: { type: Array},
      dayOneSummary: { type: Array},
      selectedCountryName: { type: String},
      loadingState: { type: String}
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.getCountryNames();    
    this.getSummary();    
  }

  async getSummary() {
    let result = await Covid19Service.getCovid19Summary();
        result = JSON.parse(result);
   
    let summary = [["CountryCode", "Country", "TotalConfirmed", "TotalDeaths"]]
    result.Countries.map((res)=> {
      summary.push([res.CountryCode, res.Country, res.TotalConfirmed, res.TotalDeaths]);
    })
    
    this.countriesSummary = JSON.stringify(summary);

    let pieSummary = [["Country", "TotalDeaths"]]
    result.Countries.map((res)=> {
      pieSummary.push([res.Country, res.TotalDeaths]);      
    })

    this.pieSummary = JSON.stringify(pieSummary);
    this.getTopTenMortality(result);
    
  }

  getChart() {
        this.chartType = this.shadowRoot.getElementById('selectedChartType').value;       
  }

  getTopTenMortality(countryArray = []){
   
    this.loadingState = true;

    let topValues = countryArray.Countries.sort((a,b) => {
     return b.TotalDeaths - a.TotalDeaths
    }).slice(0,10);   

    let barSummary = [["Country", "Total Confirmed", "Total Deaths"]]
    topValues.map((res)=> {      
      barSummary.push([res.Country, res.TotalConfirmed, res.TotalDeaths]);
    })

    this.barSummary = JSON.stringify(barSummary);

    this.loadingState = false;

  }

  async getCountryNames() {
    this.loadingState = true;

    let countryNames = await Covid19Service.getCovid19Countries();
    this.countryNames = JSON.parse(countryNames).sort((a,b)=>{
        b.Country - a.Country;
    });

    this.loadingState = false;
  }

  async getDayOne() {
    this.loadingState = true;
    this.selectedCountryName = this.shadowRoot.getElementById('selectedCountry').value;
    let dayOneDataConfirmed = JSON.parse(await Covid19Service.getCovid19DayOne(this.selectedCountryName,'confirmed'));    
    let dayOneDataDeaths = JSON.parse(await Covid19Service.getCovid19DayOne(this.selectedCountryName,'deaths'));    

    let dayOneSummary = [["Date", "Confirmed", "Deaths"]]

    dayOneDataConfirmed.map((confirmed)=> {
      dayOneDataDeaths.map((deaths) =>{
        if(confirmed.Date.slice(0,10).slice(2,10) === deaths.Date.slice(0,10).slice(2,10)){
          dayOneSummary.push([confirmed.Date.slice(0,10).slice(2,10), confirmed.Cases, deaths.Cases]);
        }
      })
    })

    this.dayOneSummary = JSON.stringify(dayOneSummary);
    this.loadingState = false; 
    
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
    }
    div{      
      margin:auto;
      padding: 5px;
      font-family: Roboto;  
    }
    select{    
      width:200px;
      height:30px;
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
        <loader-component .loading="${this.loadingState}" ></loader-component>
      </div>

      <div class="container">

        <div>
          <select id="selectedChartType">
            <option value = "Geo">COVID-19 map</option>
            <option value = "MortalityWorldWidePie">Mortality World Wide</option>
            <option value = "MortalityWorldBar">Mortality Rate Per Country</option>
            <option value = "MortalityWorldLine">Mortality Rate Per Country line</option>
            <option value = "DayOne">Since Day One</option>
          </select>
          <bs-button @click="${this.getChart}" info>Select</bs-button>
        </div>
        
          ${this.chartType === 'Geo' ? html`
          <div>
          <header>World (COVID-19) map</header>
          </div>

          <google-chart 
            type='geo'
            key='AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I'
            options='{ 
                      "backgroundColor": "#81d4fa",
                      "datalessRegionColor": "#f8bbd0",
                      "defaultColor": "#f5f5f5",
                      "colorAxis": {"minValue": "0", "maxValue": "20000", "colors": ["#e6faff", "#26004d"]}
                      }'
            data='${this.countriesSummary}'>
          </google-chart>
          ` : ''
          }     

          ${this.chartType === 'MortalityWorldWidePie' ? html`        
          <google-chart 
            type='pie'
            key='AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I'
            options='{                  
                      "title": "Mortality Percenrtage World Wide",
                      "is3D": "true"                   
                      }'
            data='${this.pieSummary}'>
          </google-chart>
          ` : ''
          }

          ${this.chartType === 'MortalityWorldBar' ? html`        
          <google-chart 
            type='bar'
            key='AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I'
            options='{                  
                      "title": "Mortality Rate For Top 10 Countries",
                      "is3D": "true"                   
                      }'
            data='${this.barSummary}'>
          </google-chart>
          ` : ''
          }       

        ${this.chartType === 'MortalityWorldLine' ? html`  
          <google-chart 
            type='line'
            key='AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I'
            options='{                  
                      "title": "Mortality Rate For Top 10 Countries",
                      "is3D": "true"                   
                      }'
            data='${this.barSummary}'>
          </google-chart>
          ` : ''
          }    

      ${this.chartType === 'DayOne' ? html`       

          ${this.countryNames ? html`          
          
          <div>
          <select id="selectedCountry">
            ${ this.countryNames.map(res=> html`<option value = ${res.Slug}>${res.Country}</option>`)}
          </select>
          <bs-button @click="${this.getDayOne}" info>Select</bs-button>
          </div>
          
          ${this.dayOneSummary ? html`

          <div>
          <header>${this.selectedCountry}</header>
          </div>
          
            <google-chart 
              type='area'
              key='AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I'
              options='{                  
                        "hAxis": {
                        "title": "Time Line"
                      },
                      "vAxis": {
                        "title": "COVID-19 Count"
                      },
                      "colors": ["#FFA500", "FF0000"]              
                        }'
              data='${this.dayOneSummary}'>
          </google-chart>
          ` : ''
            }
              ` : ''
          }
          ` : ''
        }
      </div>
    
    `;
  }
}
// Register the new element with the browser.
customElements.define('chart-element', ChartElement);

