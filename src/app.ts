import './components/ScrapeForm';
import './components/ErrorMessage';
import './components/SuccessMessage';
import './components/LoadingBar';
import './components/DownloadForm';

const app = document.getElementById('app') as HTMLElement;
const scrapeForm = document.createElement('scrape-form') as ScapeForm;
const errorMessage = document.createElement('error-message') as ErrorMessage;
const successMessage = document.createElement('success-message') as SuccessMessage;
const loadingBar = document.createElement('loading-bar');
const downloadForm = document.createElement('download-form') as DownloadForm;

interface ScrapeResponse {
  title: string;
  upload_date: string;
}

async function scrape(url: string): Promise<ScrapeResponse> {
  try {
    const response = await fetch(`/api/scrape?url=${url}`);

    if (!response.ok) {
      throw new Error(`${await response.text()}`);
    }

    const data: ScrapeResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
    throw error;
  }
}

async function download(url: string, artist: string, title: string, year: string): Promise<string> {
  try {
    const response = await fetch(`/api/download`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: url,
            artist: artist,
            title: title,
            year: year,
        })
    });

    if (!response.ok) {
      throw new Error(`${await response.text()}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
    throw error;
  }
}

function sanitizeTitle(original: string): string {
    original = original.replace("(Official)", "")
    original = original.replace("(Official Video)", "")
    original = original.replace("(Official Music Video)", "")
    return original.trim().replace(/[^a-zA-Z ,-]/g, '');
}

function getArtist(original: string): string {
    return (original.indexOf('-') > 0) ? original.split('-')[0].trim() : original;
}

function getTitle(original: string): string {
    return (original.indexOf('-') > 0) ? original.split('-')[1].trim() : original;
}

function getDefaultYear(original: string): string {
    return original.length > 4 ? original.substring(0, 4) : String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', () => {
  scrapeForm.onSubmit = (value: string) => {
    try {
        app.removeChild(successMessage);
    } catch(error) {
        // noop
    }
    app.removeChild(scrapeForm);
    app.appendChild(loadingBar);
    scrape(value)
        .then((data) => {
            app.removeChild(loadingBar);
            app.appendChild(downloadForm);
            downloadForm.url = value;
            downloadForm.original = data.title;
            downloadForm.uploadDate = data.upload_date;
            const original = sanitizeTitle(data.title);
            downloadForm.artist = getArtist(original);
            downloadForm.title = getTitle(original);
            downloadForm.defaultYear = Number(getDefaultYear(data.upload_date));
            downloadForm.onCancel = () => {
                app.removeChild(downloadForm);
                app.appendChild(scrapeForm);
            };
            downloadForm.onSubmit = (url: string, artist: string, title: string, year: number) => {
                app.removeChild(downloadForm);
                app.appendChild(loadingBar);
                download(url, artist, title, String(year))
                    .then((message) => {
                        app.removeChild(loadingBar);
                        app.appendChild(successMessage);
                        successMessage.label = message;
                        app.appendChild(scrapeForm);
                    })
                    .catch((error) => {
                        app.removeChild(loadingBar);
                        app.appendChild(errorMessage);
                        errorMessage.label = error.message;
                        app.appendChild(downloadForm);
                    });
            };
        })
        .catch((error) => {
            app.removeChild(loadingBar);
            app.appendChild(errorMessage);
            errorMessage.label = error.message;
            app.appendChild(scrapeForm);
        })
  };
  app.appendChild(scrapeForm);
});