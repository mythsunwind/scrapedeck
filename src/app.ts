import './components/ScrapeForm';
import './components/Error';
import './components/LoadingBar';
import './components/DownloadForm';

const app = document.getElementById('app') as HTMLElement;
const scrapeForm = document.createElement('scrape-form') as ScapeForm;
const errorMessage = document.createElement('error-message') as ErrorMessage;
const loadingBar = document.createElement('loading-bar');
const downloadForm = document.createElement('download-form') as DownloadForm;

interface ScrapeResponse {
  title: string;
  upload_date: string;
}

async function scrape(url: string): Promise<ScrapeResponse> {
  try {
    const response = await fetch(`/api/scrape?url=${url}`); // Example API endpoint

    if (!response.ok) {
      throw new Error(`${await response.text()}`);
    }

    const data: ScrapeResponse = await response.json(); // Parse JSON into a TypeScript object
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
    throw error; // Re-throw the error if you want calling code to handle it
  }
}

async function download(url: string, artist: string, title: string, year: string): Promise<string> {
  try {
    const response = await fetch(`/api/download`, { method: "POST" });

    if (!response.ok) {
      throw new Error(`${response.text}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
    throw error;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  scrapeForm.label = 'URL';
  scrapeForm.onClick = () => {
    app.removeChild(scrapeForm);
    app.appendChild(loadingBar);
    scrape(scrapeForm.url)
        .then((data) => {
            app.removeChild(loadingBar);
            app.appendChild(downloadForm);
            downloadForm.original = data.title;
            downloadForm.uploadDate = data.upload_date;
            downloadForm.onClick = () => {
                download(scrapeForm.url, downloadForm.artist, downloadForm.title, downloadForm.year)
            }
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