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
      <form class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="inputURL" class="col-form-label">Enter URL from Youtube:</label>
          <input type="text" id="inputURL" value="" class="form-control" pattern="https?://.*" placeholder="Example: https://www.youtube.com/watch?v=..." required>
          <div class="invalid-feedback">
            This is no valid URL.
          </div>
        </div>
        <div class="d-grid">
          <button class="btn btn-primary" type="submit">Scrape</button>
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