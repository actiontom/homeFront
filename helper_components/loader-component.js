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
    
    #overlay{
      position:absolute;
      top:0px;
      left:0px;
      bottom:0px;
      right:0px;
      background-color:rgba(255,255,0,0.5);
      
  }
    .parent {
      position:fixed;
      z-index: 1;
      top:40%;
      left:40%;
      background-color: green;
      height: 100px;
      width: 100px;
      animation: rotation 12s ease-in forwards infinite;
    }
    .child {
      background-color: blue;
      height: 50%;
      width: 50%;      
      animation: right-to-left 6s ease-in forwards infinite;
    }  
    .child2 {
      background-color: yellow;
      height: 50%;
      width: 50%;   
      animation: rotation 3s ease-in forwards infinite;
    }
    
    @keyframes right-to-left {
      0% {
        transform: translateX(50%);       
      }
      25% {
        transform: translateY(50%) rotate(90deg);          
      }
      50% {
        transform: translateX(50%) translateY(100%) rotate(180deg);          
      }
      75% {
        transform: translateX(100%) translateY(50%) rotate(270deg);          
      }
      100% {
        transform: translateX(50%) rotate(360deg);       
      }
    }

    @keyframes rotation {
      0% {
        transform: translateX(50%);       
      }
      25% {
        transform: translateY(50%) rotate(90deg);          
      }
      50% {
        transform: translateX(50%) translateY(100%) rotate(180deg);          
      }
      75% {
        transform: translateX(100%) translateY(50%) rotate(270deg);          
      }
      100% {
        transform: translateX(50%) rotate(360deg);       
      }
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
      <div id = "overlay">
        <div class="parent">
          <div class="child">
            <div class="child2"></div>
          </div>
        </div>
      </div>
     `}
    `;
  }
}
// Register the new element with the browser.
customElements.define('loader-component', LoaderComponent);