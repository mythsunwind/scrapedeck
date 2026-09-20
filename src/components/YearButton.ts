export class YearButton extends HTMLElement {
  private _year: string = "";
  private _checked: boolean = false;

  get year(): string {
    return this._year;
  }

  set year(value: string) {
    this._year = value;
  }

  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  private render(): void {
    this.innerHTML = `
      <input type="radio" class="btn-check" name="year" id="${this.year}" autocomplete="off" checked="${this.checked}">
      <label class="btn btn-outline-primary" for="${this.year}">${this.year}</label>
    `;
  }
}

customElements.define('year-button', YearButton);