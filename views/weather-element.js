// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

// Import services.
import { WeatherService } from '../services/weather-service';

// Import components
import '../helper_components/loader-component'

//Import styles
import 'lit-element-bootstrap/components/button';
import '@lit-element-bootstrap/layout';

// Extend the LitElement base class
export class WeatherElement extends LitElement {

  constructor() {
    super();
    this.city = "Enter city name here";
    this.feedBack = "";
    this.cities = [];
    this.currentWeather = [];
    this.loadingState = false;
  }

  static get properties() {
    return {
      city: { type: String },
      feedBack: { type: String},
      cities: { type: Array},
      currentWeather: { type: Array}
    };
  }

  static get styles() {
    return css`
 
    `;
  }

 async searchCity(){

  this.loadingState = true;
    
  this.city = this.shadowRoot.getElementById('cityName').value;

  if(this.city === "Enter your name" || this.name === ""){
    this.feedBack = "Please enter a city name."
  } else {
    
    let resCities = await WeatherService.searchCity(this.city);

    this.cities = JSON.parse(resCities);   
    }
    
    this.loadingState = false;
  }

  async getCurrentWeather(){

    this.loadingState = true;

    let selectedCityKey = this.shadowRoot.getElementById('cityID').value;
   
    let resCurrentWeather = await WeatherService.currentWeather(selectedCityKey);

    this.currentWeather = JSON.parse(resCurrentWeather);

    this.loadingState = false;
    
  }

  clear(){
    this.city = "";
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
     <div class="container">

     <div>
        <h4>Get a weather report.</h4>
      </div>

     <div>
        <loader-component .loading="${this.loadingState}" ></loader-component>
      </div>

      <div>
         <label>City Name:</label> <input @click="${this.clear}" type="text" id="cityName" value="${this.city}"><br>
      </div>

      <div>
      ${ this.cities.length === 0 ? '' : html`
      <select id="cityID">

      ${ this.cities.map(res=> html` <option value = ${res.Key} >${res.LocalizedName}, ${res.AdministrativeArea.LocalizedName}, ${res.Country.LocalizedName} </option> `) }
      
      </select>
      `}
      </div>
       
      <div>
        <bs-button @click="${this.searchCity}" info>Search</<bs-button>
      </div>
     
      <div>
        <p>${this.feedBack}</p>
      </div>
    
    ${ this.cities.length === 0 ? 'No City Results' : html`    

      <div>

      <bs-button @click="${this.getCurrentWeather}" info>Get current weather</<bs-button>

      </div>

      <div class="divOverFlow">
      ${Array.isArray(this.currentWeather) && this.currentWeather.length > 0 ? html`
        <table>
                <tr>
                  <th>Time</th>
                  <th>Current Conditions</th>
                  <th>Temperature</th>                  
                </tr>
                ${ this.currentWeather.map(res=> html` <tr><td>${ res.LocalObservationDateTime }</td><td>${res.WeatherText}</td><td>${res.Temperature.Metric.Value} ${res.Temperature.Metric.Unit}</td></tr> ` ) }             
        </table>
      ` : ''}
      </div>
    `}

    `;   
  }
}
// Register the new element with the browser.
customElements.define('weather-element', WeatherElement);