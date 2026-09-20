import { YearButton } from './YearButton';

export class DownloadForm extends HTMLElement {
  private _url = "";
  private _original = "";
  private _artist = "";
  private _title = "";
  private _defaultYear = 2026;
  private _uploadDate = "";
  private _onCancel?: () => void;
  private _onSubmit?: (url: string, artist: string, title: string, year: number) => void;

  constructor() {
    super();
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;

    if (this.isConnected) {
      this.render();
    }
  }

  get original(): string {
    return this._original;
  }

  set original(value: string) {
    this._original = value;

    if (this.isConnected) {
      this.render();
    }
  }

  get artist(): string {
    return this._artist;
  }

  set artist(value: string) {
    this._artist = value;

    if (this.isConnected) {
      this.render();
    }
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;

    if (this.isConnected) {
      this.render();
    }
  }

  get uploadDate(): string {
    return this._uploadDate;
  }

  set uploadDate(value: string) {
    this._uploadDate = value;

    if (this.isConnected) {
      this.render();
    }
  }

  get defaultYear(): number {
    return this._defaultYear;
  }

  set defaultYear(value: number) {
    this._defaultYear = value;
  }

  get onCancel(): (() => void) | undefined {
    return this._onCancel;
  }

  set onCancel(callback: (() => void) | undefined) {
    this._onCancel = callback;
  }

  get onSubmit(): ((url: string, artist: string, title: string, year: number) => void) | undefined {
    return this._onSubmit;
  }

  set onSubmit(callback: ((url: string, artist: string, title: string, year: number) => void) | undefined) {
    this._onSubmit = callback;
  }

  connectedCallback() {
    this.render();
  }

  private render(): void {
    this.innerHTML = `
    <form class="row g-3 needs-validation" novalidate>
      <div class="row mb-3">
        <div class="col-12 col-form-label">
          Original video title: ${this.original}
          <input type="hidden" id="url" class="form-control" value="${this.url}" />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2 col-form-label">
          <label for="artist" class="col-form-label">Artist</label>
        </div>
        <div class="col-auto">
          <input type="text" id="artist" class="form-control" value="${this.artist}" />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2 col-form-label">
          <label for="title" class="col-form-label">Title</label>
        </div>
        <div class="col-auto">
          <input type="text" id="title" class="form-control" value="${this.title}" />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 col-form-label">
          Original upload date: ${this.uploadDate}
        </div>
      </div>
      <fieldset class="row mb-3">
        <legend class="col-form-label col-2 pt-0">Playlist</legend>
        <div class="col-auto" id="years">
        </div>
      </fieldset>
      <button type="submit" class="btn btn-primary">Download</button>
      <button id="cancel" class="btn btn-danger">Cancel</button>
    </form>
    `;
    const cancelButton = document.getElementById("cancel");
    cancelButton?.addEventListener("click", () => this.onCancel!());
    const yearsContainer = document.getElementById("years");
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    const years = [lastYear, currentYear];
    if (!years.includes(this.defaultYear)) {
      years.push(this.defaultYear);
    }
    years.map( (year) => {
      const button = document.createElement('year-button') as YearButton;
      button.year = String(year);
      if (this.defaultYear === year) {
        button.checked = true;
      }
      yearsContainer?.appendChild(button);
    });

    const inputUrl = document.getElementById('url') as HTMLInputElement;
    const inputArtist = document.getElementById('artist') as HTMLInputElement;
    const inputTitle = document.getElementById('title') as HTMLInputElement;
    //const inputYear = document.getElementById('year') as HTMLInputElement;
    const form = document.querySelector('.needs-validation') as HTMLFormElement;
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
      } else {
        this._onSubmit?.(inputUrl.value, inputArtist.value, inputTitle.value, 2026);
      }

      form.classList.add('was-validated')
    }, false)
  }
}

customElements.define('download-form', DownloadForm);