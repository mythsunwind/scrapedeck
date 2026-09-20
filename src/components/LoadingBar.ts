export class LoadingBar extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  private render(): void {
    this.innerHTML = `
        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
        </div>
    `;
  }
}

customElements.define('loading-bar', LoadingBar);