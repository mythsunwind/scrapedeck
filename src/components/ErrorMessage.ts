export class ErrorMessage extends HTMLElement {
  private _label = "";

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

  connectedCallback() {
    this.render();
  }

  private render(): void {
    this.innerHTML = `
    <div class="alert alert-danger" role="alert">
    ${this.label}
    </div>`
  }
}

customElements.define('error-message', ErrorMessage);