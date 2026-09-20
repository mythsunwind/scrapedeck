import './YearButton';

export class DownloadForm extends HTMLElement {
  private _original = "Test";
  private _artist = "";
  private _title = "";
  private _defaultYear = "";
  private _uploadDate = "";
  private _onClick?: () => void;

  constructor() {
    super();
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

  get defaultYear(): string {
    return this._defaultYear;
  }

  set defaultYear(value: string) {
    this._defaultYear = value;

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
      <div class="row mb-3">
        <div class="col-12 col-form-label">
          Original video title: ${this.original}
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
    `;
    const button = this.querySelector("button");
    button?.addEventListener("click", () => {
      this._onClick?.();
    });
    const yearsContainer = document.getElementById("years");
    const yearButton = document.createElement('year-button') as YearButton;
    const currentYear = String(new Date().getFullYear());
    if (currentYear === this.defaultYear) {
      yearButton.year = this.defaultYear;
      yearButton.checked = true;
    }
    yearsContainer?.appendChild(yearButton);
  }
}

customElements.define('download-form', DownloadForm);