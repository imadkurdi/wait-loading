// @ts-check

const tmpl = document.createElement("template");
tmpl.innerHTML = `
   <style>
      :host {
         --default-dot-size: 0.25em;
         --default-dot-color: #dc3545;

         /* display: inline-block; */
         margin-inline-start: 0.25em;
         pointer-events: none;
         text-align: center;
      }

      #dot-1, #dot-2, #dot-3 {
         display: inline-block;
         inline-size: var(--dot-size, var(--default-dot-size, 0.25em));
         block-size: var(--dot-size, var(--default-dot-size, 0.25em));
         border-radius: 50%;
         background-color: var(--dot-color, var(--default-dot-color, #dc3545));
      }
   </style>

   <span id="container" inert>
      <span id="dot-1" part="dot"></span>
      <span id="dot-2" part="dot"></span>
      <span id="dot-3" part="dot"></span>
   </span>
`;

class WaitLoading extends HTMLElement {
   #period = 900; // default period

   constructor(period) {
      super();

      if (period > 0) this.#period = parseInt(period);

      this.attachShadow({ mode: "open" });
      this.shadowRoot?.appendChild(tmpl.content.cloneNode(true));
   }

   connectedCallback() {
      const thirdPeriod = this.#period / 3;

      const dot1 = this.shadowRoot?.getElementById("dot-1");
      const dot2 = this.shadowRoot?.getElementById("dot-2");
      const dot3 = this.shadowRoot?.getElementById("dot-3");
      if (!dot1 || !dot2 || !dot3) throw new ReferenceError("Should never happen");
      
      const dotSize = dot1.offsetHeight;

      const dotKeyframes = [
         { opacity: 1, transform: `scale(1.5) translateY(-${dotSize / 4}px)`, easing: "ease-in" },
         { opacity: 0.25, transform: `scale(1) translateY(${dotSize / 6}px)` }];

      dot1.animate(dotKeyframes,
         { duration: thirdPeriod, iterations: Infinity, direction: "alternate" }
      );
      dot2.animate(dotKeyframes,
         { delay: thirdPeriod / 2, duration: thirdPeriod, iterations: Infinity, direction: "alternate" }
      );
      dot3.animate(dotKeyframes,
         { delay: thirdPeriod, duration: thirdPeriod, iterations: Infinity, direction: "alternate" }
      );
   }
}

customElements.define("wait-loading", WaitLoading);

export default WaitLoading;
