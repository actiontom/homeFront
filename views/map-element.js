
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
                            title="Your home or current location." draggable="false" drag-events>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2OzzR623Knht9D7qmufWOtFFbCdeMPVoy7L0nDVqJG7pNzko1&usqp=CAU" width='50px' height="50px"/>
        </google-map-marker>

        <google-map-marker slot="markers" latitude="-34.058787" longitude="18.829376"                            
                            title="Testing centre." draggable="false" drag-events>
        <img src="https://image.freepik.com/free-vector/hand-wear-glove-holding-blood-test-tube-with-covid-19-code-corona-virus-cartoon-flat-illustration-isolated_201904-5.jpg" width='50px' height="50px"/>
        </google-map-marker>

        <google-map-marker slot="markers" latitude="-34.051635" longitude="18.819035"                            
                            title="Testing centre." draggable="false" drag-events>
        <img src="https://image.freepik.com/free-vector/hand-wear-glove-holding-blood-test-tube-with-covid-19-code-corona-virus-cartoon-flat-illustration-isolated_201904-5.jpg" width='50px' height="50px"/>
        </google-map-marker>

        <google-map-marker slot="markers" latitude="-34.054300" longitude="18.824619"                            
                            title="Volunteer" draggable="false" drag-events>
        <img src="https://lh3.googleusercontent.com/proxy/679lbdUU2hapDrxZ2KnKCb5EwlSXRIyu8BQYx2NTukdgz3znRpKT5SDEtiq21JAANal2rJUO1zHcpoj8oHgEbe-u-mVIFRhsEj-Ovx1a8bbc_YA" width='50px' height="50px"/>
        </google-map-marker>

        <google-map-poly closed fill-color="red" fill-opacity=".25" stroke-weight="1" title="ZONE">
            <google-map-point latitude="-34.056732" longitude="18.831495"></google-map-point>
            <google-map-point latitude="-34.057336" longitude="18.828276"></google-map-point>
            <google-map-point latitude="-34.062620" longitude="18.829269"></google-map-point>
        </google-map-poly>

            </google-map>            
      
      `;
    }
  }
  // Register the new element with the browser.
  customElements.define('map-element', MapElement);