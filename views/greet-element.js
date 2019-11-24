// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

import { GreetService } from '../services/greet-service';

// Extend the LitElement base class
export class GreetElement extends LitElement {

  constructor() {
    super();
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
    `;
  }

 async greet(){
    
  this.name = this.shadowRoot.getElementById('fname').value;

  if(this.name === "Enter your name"){
    this.greeting = "Please enter your name."
  } else {
    
    this.greeting = await GreetService.greet(this.name);
    }    
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
     <div class='container'>

       <div>
         <label>Name:</label> <input type="text" id="fname" value="${this.name}"><br>
      </div>
       
      <div>
        <button @click="${this.greet}">Greet</button>
      </div>
      
      <div>
        <p>${this.greeting}</p>
      </div>

     </div>
    `;
  }
}
// Register the new element with the browser.
customElements.define('greet-element', GreetElement);