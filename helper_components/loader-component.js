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
    //let loading = document.addEventListener('loading');
    //console.log(this.loading);
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
        
        border: 10px solid #f3f3f3;
        border-radius: 50%;
        border-top: 10px solid #3498db;
        width: 20px;
        height: 20px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;        
      }
      
      /* Safari */
      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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