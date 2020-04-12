
// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

import '@danielturner/google-map/google-map';
import '@danielturner/google-map/google-map-marker';
import '@danielturner/google-map/google-map-directions';
import '@danielturner/google-map/google-map-search';
import '@danielturner/google-map/google-map-point';
import '@danielturner/google-map/google-map-poly';


export class MapElement extends LitElement {

    constructor() {
        super();
        this.countriesSummary = null;
      }
        
    static get properties() {
        return {
            countriesSummary: { type: String }
          };  
    }
  
    connectedCallback() {
      super.connectedCallback();    
    
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
      },
      google-map-marker{
        display: flex;
        flex-direction: row;
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
        
        <google-map fit-to-markers api-key="AIzaSyDnUSjsDs0OZMURGKNx9jrQ7iKu61U8i8I" latitude="-34.054760" longitude="18.823768" draggable="true" min-zoom="9" max-zoom="18">
        
        <google-map-marker slot="markers" latitude="-34.053865" longitude="18.826252"                            
                            title="Your Home or Current Location." draggable="false" drag-events>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Home_Icon.svg/1200px-Home_Icon.svg.png" width='50px' height="50px"/>
        </google-map-marker>

        <google-map-marker slot="markers" latitude="-34.058787" longitude="18.829376"                            
                            title="Testing Centre." draggable="false" drag-events>
        <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIkQw7PqeLx9BMnTtbn-7-KRkW81EYNCBViWGorrClYbIeAxXs&usqp=CAU" width='50px' height="50px"/></div>
        <div><a href="http://www.health.gov.za/index.php/outbreaks/145-corona-virus-outbreak/465-corona-virus-outbreak" target="_blank">Department of Health Link</a></div>
        <div>24-HOUR HOTLINE NUMBER: <a href="tel:0800 029 999">0800 029 999</a></div>
        </google-map-marker>

        <google-map-marker slot="markers" latitude="-34.051635" longitude="18.819035"                            
                            title="Testing Centre." draggable="false" drag-events>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIkQw7PqeLx9BMnTtbn-7-KRkW81EYNCBViWGorrClYbIeAxXs&usqp=CAU" width='50px' height="50px"/>
        <div><a href="http://www.health.gov.za/index.php/outbreaks/145-corona-virus-outbreak/465-corona-virus-outbreak" target="_blank">Department of Health Link</a></div>
        <div>24-HOUR HOTLINE NUMBER: <a href="tel:0800 029 999">0800 029 999</a></div>
        </google-map-marker>

        <google-map-marker slot="markers" latitude="-34.055923" longitude="18.820758"                            
                            title="HealthCare Volunteer" draggable="false" drag-events>
        <img src="https://cdn4.iconfinder.com/data/icons/medicine-and-healthcare-03-solid/128/nurse_sister_avatar_woman_medical_care-taker_hospital_medical_worker-512.png" width='50px' height="50px"/>
        <div>Contact Number: <a href="tel:123-456-7890">123-456-7890</a></div>
        </google-map-marker>

        <google-map-marker slot="markers" latitude="-34.046913" longitude="18.832782"                            
                            title="Community Outreach" draggable="false" drag-events>
        <img src="data:image/png;base64,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" width='50px' height="50px"/>
        <div><a href="https://www.bbc.com/news/technology-52198946" target="_blank">Community Outreach Link</a></div>
        <div>Contact Number: <a href="tel:123-456-7890">123-456-7890</a></div>        
        </google-map-marker>

        <google-map-poly closed fill-color="red" fill-opacity=".25" stroke-weight="1" title="ZONE">
            
            <google-map-point latitude="-34.056732" longitude="18.831495"></google-map-point>
            <google-map-point latitude="-34.057336" longitude="18.828276"></google-map-point>
            <google-map-point latitude="-34.064023" longitude="18.821328"></google-map-point>
            <google-map-point latitude="-34.062620" longitude="18.829269"></google-map-point>
        </google-map-poly>

            </google-map>          
      
      `;
    }
  }
  // Register the new element with the browser.
  customElements.define('map-element', MapElement);