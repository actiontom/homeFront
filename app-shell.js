import { LitElement, html, css } from 'lit-element';
import { router, RouterSlot, RouterLink } from 'lit-element-router';

import './views/greet-element'
import './views/speed-element'
import './views/report-element'
import './views/weather-element'
import './views/chart-element'
import './views/map-element'

class AppShell extends LitElement {

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object },
            query: { type: Object },
            data: { type: Object}
        }
    }

    constructor() {
        super()

       router([{
            name: 'home',
            pattern: 'home',
            data: { title: 'Home' }
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
            name: 'weather',
            pattern: 'weather'
        }, {
            name: 'chart',
            pattern: 'chart'
        }, {
            name: 'map',
            pattern: 'map'
        }, {
            name: 'not-found',
            pattern: '*'
        }], (route, params, query, data) => {
            this.route = route
            this.params = params
            this.query = query
            this.data = data
        })
    }

    static get styles() {
        return css`
:host {
    display: block;
}

/* Add a black background color to the top navigation */
.topnav {
  background-color: #273E4B;
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
            <router-link href='/weather'>Weather</router-link>
            <router-link href='/chart'>Chart</router-link>
            <router-link href='/map'>Map</router-link>
            </div>
          
            <router-slot route='${this.route}'>
                <div slot='home'>Home</div>
                <div slot='greet'><greet-element></greet-element></div>
                <div slot='speed'><speed-element></speed-element></div>
                <div slot='report'><report-element></report-element></div>
                <div slot='weather'><weather-element></weather-element></div>
                <div slot='chart'><chart-element>Covid19 Chart</chart-element></div>
                <div slot='map'><map-element></map-element></div>
                <div slot='not-found'>Not Found</div>
            </router-slot>
        `
    }
}

customElements.define('app-shell', AppShell)