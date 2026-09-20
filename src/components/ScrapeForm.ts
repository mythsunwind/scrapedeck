export class ScrapeForm extends HTMLElement {
  private _onSubmit?: (value: string) => void;

  constructor() {
    super();
  }

  get onSubmit(): ((value: string) => void) | undefined {
    return this._onSubmit;
  }

  set onSubmit(callback: ((value: string) => void) | undefined) {
    this._onSubmit = callback;
  }

  connectedCallback() {
    this.render();
  }

  private render(): void {
    this.innerHTML = `
      <form class="row g-3 needs-validation" novalidate>
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <label for="inputURL" class="col-form-label">URL</label>
          </div>
          <div class="col-auto">
            <input type="text" id="inputURL" value="" class="form-control" pattern="https?://.*" required>
            <div class="invalid-feedback">
              This is no valid URL.
            </div>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary" type="submit">Scrape</button>
          </div>
        </div>
        
      </form>
    `;

    const input = document.querySelector('input') as HTMLInputElement;
    const form = document.querySelector('.needs-validation') as HTMLFormElement;
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
      } else {
        this._onSubmit?.(input.value);
      }

      form.classList.add('was-validated')
    }, false)
  }

}

customElements.define('scrape-form', ScrapeForm);