// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';

// Import Icons
import chevronUp from '@alaskaairux/icons/dist/icons/interface/chevron-up_es6.js';
import chevronDown from '@alaskaairux/icons/dist/icons/interface/chevron-down_es6.js';

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * auro-accordion provides users a way to have collapsable content on a page.
 * Use auro-accordion-group if you want to have auto closing accordion components when others are selected.
 *
 * @attr {String} id - used to generate the ID for the elements inside the component
 * @attr {String} header - used to provide the header text of the Accordion
 * @attr {Boolean} expanded - toggles the panel on and off
 */

// build the component class
class AuroAccordion extends LitElement {
  // constructor() {
  //   super();
  // }

  // function to define props used within the scope of thie component
  static get properties() {
    return {
      id: { type: String },
      header: { type: String },
      expanded: {
        type: Boolean,
        reflect: true
      }
    };
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  /**
   * Internal function to generate the HTML for the icon to use
   * @param {string} svgContent - The imported svg icon
   * @returns {TemplateResult} - The html template for the icon
   */
  generateIconHtml(svgContent) {
    const dom = new DOMParser().parseFromString(svgContent, 'text/html'),
    svg = dom.body.firstChild;

   return html`${svg}`;
  }

  /**
   * Internal function to handle the click event to trigger the expansion of the accordion
   * @param {object} event - Standard event parameter
   * @returns {nothing} - Returns nothing
   */
  handleClick(event) {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent('toggleExpanded', {
      bubbles: true,
      composed: true,
      target: event.target
    }));
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    const buttonClasses = {
      'expanded': this.expanded
    }

    return html`
      <button
        id="${this.id}Heading"
        class="${classMap(buttonClasses)}"
        aria-expanded="${this.expanded}"
        @click=${this.handleClick}
      >
        ${this.header}
        ${this.generateIconHtml(this.expanded ? chevronUp.svg : chevronDown.svg)}
      </button>

      <div
        id="${this.id}Panel"
        aria-labelledby="${this.id}Heading"
        class="panel"
        ?hidden=${!this.expanded}
      >
        <slot></slot>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-accordion")) {
  customElements.define("auro-accordion", AuroAccordion);
}
