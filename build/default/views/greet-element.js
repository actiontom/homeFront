// Import the LitElement base class and html helper function
import { LitElement, html, css } from "../node_modules/lit-element/lit-element.js";
import { GreetService } from "../services/greet-service.js"; // Extend the LitElement base class

export class GreetElement extends LitElement {
  constructor() {
    super();
    this.name = "Enter your name";
  }

  static get properties() {
    return {
      name: {
        type: String
      }
    };
  }

  static get styles() {
    return css`
    :host {
      display: block;
    }`;
  }

  greet() {
    this.name = this.shadowRoot.getElementById('fname').value;
    console.log("Hello " + this.name);
    GreetService.greet(this.name);
    return true;
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
     
        First name: <input type="text" id="fname" value="${this.name}"><br>
        
        <button @click="${this.greet}">Greets</button>
        <!-- <button type="button" onclick="this.greet()">Click Me!</button>  -->
        <button type="button" onclick="alert('Hello world!')">Click Me!</button>
    
        <p>${this.name}</p>
    `;
  }

} // Register the new element with the browser.

customElements.define('greet-element', GreetElement);