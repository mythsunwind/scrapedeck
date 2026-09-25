# Scrapedeck

Scrape songs and add them to a named directory to create a yearly playlist
that can be easily added to Jellyfin or other servers.

## Build frontend

    pipenv shell
    pipenv install
    npm install
    npm run build

### Run

    flask run

## Alternative: Docker

Build manually:

    docker build -t scrapedeck .

or get from repository:

    docker pull ghcr.io/mythsunwind/scrapedeck:1.0

### Run

    docker run -v ./output:/output -p 5000:5000 scrapedeck

## Development

Run backend in debug:

    pipenv shell
    flask run --debug

Run frontend

    npm run dev

For test run it is best to adjust the output directory by create a **.env** file with the following content:

    OUTPUT_DIRECTORY="/path/to/output/"

## Testing

Test scraping:

    curl "http://127.0.0.1:5000/api/scrape?url=https://www.youtube.com/watch?v=mh4AQkw4Jjc"

Test downloading:

    curl -XPOST -F url="https://www.youtube.com/watch?v=mh4AQkw4Jjc" -F artist="Temper City" -F title="Self Aware" -F year="2026" "http://127.0.0.1:5000/api/download"
