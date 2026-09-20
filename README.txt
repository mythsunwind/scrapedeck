## Install

    pipenv shell
    pipenv install
    npm install

## Build frontend

    npm run build

## Run

    flask run

## Development

Run backend in debug:

    pipenv shell
    flask run --debug

Run frontend

    npm run dev

## Test

Test scraping:

    curl "http://127.0.0.1:5000/api/scrape?url=https://www.youtube.com/watch?v=mh4AQkw4Jjc"

Test downloading:

    curl -XPOST -F url="https://www.youtube.com/watch?v=mh4AQkw4Jjc" -F artist="Temper City" -F title="Self Aware" -F year="2026" "http://127.0.0.1:5000/api/download"
