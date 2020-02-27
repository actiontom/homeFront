import { LitElement, html, css } from 'lit-element';
import { router, RouterSlot, RouterLink } from 'lit-element-router';

import './views/greet-element'
import './views/speed-element'
import './views/report-element'

class AppShell extends LitElement {

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        }
    }

    constructor() {
        super()

       router([{
            name: 'home',
            pattern: 'home'
        }, {
            name: 'greet',
            pattern: 'greet'
        }, {
            name: 'speed',
            pattern: 'speed'
        },  {
            name: 'report',
            pattern: 'report'
        }, {
            name: 'not-found',
            pattern: '*'
        }], (route, params, query) => {
            this.route = route
            this.params = params            
        })
    }

    static get styles() {
        return css`
:host {
    display: block;
}

/* Add a black background color to the top navigation */
.topnav {
  background-color: #566d7c;
  overflow: hidden;
  font-family: "Roboto";
}

/* Style the links inside the navigation bar */
.topnav router-link{
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;    
  }

/* Change the color of links on hover */
.topnav router-link:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav router-link.active {
  background-color: #4CAF50;
  color: white;
}       
        `;
      }

    render() {
        return html`
            <div class="topnav">
            <router-link href='/home'>Home</router-link>
            <router-link href='/greet'>Greet</router-link>
            <router-link href='/speed'>Speed</router-link>
            <router-link href='/report'>Report</router-link>
            </div>
          
            <router-slot route='${this.route}'>
                <div slot='home'>Home</div>
                <div slot='greet'><greet-element></greet-element></div>
                <div slot='speed'><speed-element></speed-element></div>
                <div slot='report'><report-element></report-element></div>
                <div slot='not-found'>Not Found</div>
            </router-slot>
        `
    }
}

customElements.define('app-shell', AppShell)