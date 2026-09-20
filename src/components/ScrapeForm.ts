export class ScrapeForm extends HTMLElement {
  private _label = "";
  private _onClick?: () => void;

  constructor() {
    super();
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;

    if (this.isConnected) {
      this.render();
    }
  }

  get onClick(): (() => void) | undefined {
    return this._onClick;
  }

  set onClick(callback: (() => void) | undefined) {
    this._onClick = callback;
  }

  connectedCallback() {
    this.render();
  }

  private render(): void {
    this.innerHTML = `
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputURL" class="col-form-label">${this.label}</label>
        </div>
        <div class="col-auto">
          <input type="text" id="inputURL" class="form-control">
        </div>
        <div class="col-auto">
          <button class="btn btn-primary">Scrape</button>
        </div>
      </div>
    `;
    const button = this.querySelector("button");
    button?.addEventListener("click", () => {
      this._onClick?.();
    });
  }
}

customElements.define('scrape-form', ScrapeForm);