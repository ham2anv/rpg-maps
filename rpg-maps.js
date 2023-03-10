class RpgMap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const src = this.getAttribute("src");
    const caption = this.getAttribute("caption");
    const scale = parseFloat(this.getAttribute("scale")) || 2.5;

    /** @type {HTMLImageElement} */
    const image = createElement("img", { src, class: "rpg-map-image" });

    /** @type {HTMLDivElement} */
    const container = createElement("div",{class: "rpg-map-container"}, image);

    image.addEventListener("mousemove", event => {
      throttle(() => {
        image.setAttribute("style", `transform-origin: ${event.offsetX}px ${event.offsetY}px; transform: scale(${Math.min(scale, image.naturalHeight / image.clientHeight)})`);
      }, 200)();
    });
    image.addEventListener("mouseleave", () => {
      image.setAttribute("style","");
    });

    /** @type {HTMLStyleElement} */
    const style = createElement("style",{},
    `.rpg-map {
      max-width: 100%;
      border: 
        var(--rpg-map-border-width, 3px) 
        var(--rpg-map-border-style, solid) 
        var(--rpg-map-border-color, black);
      overflow: hidden;
    }
    
    .rpg-map-image {
      max-width: 100%;
      transition: transform var(--rpg-map-transform-duration, 300ms) var(--rpg-map-transform-function, ease-in-out);
    }
    
    .rpg-map-caption {
      text-align: center;
      margin-block: 0.5em;
    }

    .rpg-map-container {
      position: relative;
      overflow: hidden;
    }
    `);
    
    const map = createElement("figure", { class: "rpg-map" }, container, style);
    
    if (caption) map.append(
      createElement("figcaption",{class: "rpg-map-caption"}, caption)
    );
    shadow.append(map);
  }


}

customElements.define("rpg-map", RpgMap);

/**
 * Creates a new HTML element and returns it.
 * @param {string} type The type of HTML element to create.
 * @param {object} props An object where each key is an attribute to be set on the element at the given value.
 * @param  {...HTMLElement | string} children HTML elements and text nodes to be appended as children of the element.
 * @returns {HTMLElement} The new element.
 */
function createElement(type, props, ...children) {
  const element = document.createElement(type);
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      element.setAttribute(key, value);
    }
  }
  element.append(...children);
  return element;
}

/**
 * Throttles a function to run no more frequently than a given delay.
 * @param {function} cb The function to be run throttled.
 * @param {number} delay The delay in milliseconds
 * @returns {function}
 */
function throttle(callback, delay = 1000) {
  let waiting = false;
  let waitingArgs;
  const timeoutFn = () => {
    if (waitingArgs == null) {
      waiting = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFn, delay);
    }
  }

  return (...args) => {
    if (waiting) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    waiting = true;

    setTimeout(timeoutFn, delay);
  }
}