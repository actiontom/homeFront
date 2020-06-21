// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

// Extend the LitElement base class
export class LoaderComponent extends LitElement {

  constructor() {
    super();
    this.loading = null;
  }

  connectedCallback() {
    super.connectedCallback();   
  }

  static get properties() {
    return {
      loading: { type: Boolean }
    };
  }

  static get styles() {
    return css`

    #overlay {
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;

      position: fixed; /* Sit on top of the page content */
      
      width: 100%; /* Full width (cover the whole page) */
      height: 100%; /* Full height (cover the whole page) */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5); /* Black background with opacity */
      z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
      cursor: pointer; /* Add a pointer on hover */
    }

    .loader {      
        
      height: 250px;
      width: 250px;
      margin: 0 auto;
      background-color: red;
      animation-name: stretch;
      animation-duration: 1.5s; 
      animation-timing-function: ease-out; 
      animation-delay: 0;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-fill-mode: none;
      animation-play-state: running;        
      }
      
      @keyframes stretch {
        0% {
          transform: scale(.3);
          background-color: red;
          border-radius: 100%;
        }
        50% {
          background-color: orange;
        }
        100% {
          transform: scale(1.5);
          background-color: yellow;
        }
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
      ${!this.loading ? `` : html`
       <div id="overlay">
        <div class='loader'>
        </div>
     </div>
     `}
    `;
  }
}
// Register the new element with the browser.
customElements.define('loader-component', LoaderComponent);