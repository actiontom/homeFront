// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

import { GreetService } from '../services/greet-service';

// Extend the LitElement base class
export class GreetElement extends LitElement {

  constructor() {
    super();    
  }

  connectedCallback() {
    super.connectedCallback();
    this.name = "Enter your name";
    this.greeting = "";
  }

  static get properties() {
    return {
      name: { type: String },
      greeting: { type: String}
    };
  }

  static get styles() {
    return css`   
    `;
  }

 async greet(){
    
  this.name = this.shadowRoot.getElementById('fname').value;

  if(this.name === "Enter your name" || this.name === ""){
    this.greeting = "Please enter your name."
  } else {
    
    this.greeting = await GreetService.greet(this.name) + ', your backend service is working.';
    }    
  } 

  clear(){
    this.name = "";
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
      <link rel="stylesheet" href="./styles/app-styles.css">

     <div class='container'>

     <div>
       <h4>Greet Test</h4>
     </div>

       <div>
         <label>Name:</label> <input @click="${this.clear}" type="text" id="fname" value="${this.name}"><br>
      </div>
       
      <div>
        <bs-button @click="${this.greet}" info>Greet</bs-button>
      </div>
     
      <div>
        <p class='paragraph'>${this.greeting}</p>
      </div>

     </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define('greet-element', GreetElement);