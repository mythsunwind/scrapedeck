from flask import Flask, Response, abort, make_response, redirect, render_template, request, send_from_directory, url_for
from yt_dlp import YoutubeDL

import eyed3
import re
import json

app = Flask(__name__)

@app.route("/")
def index():
    return send_from_directory('static', 'index.html')

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('dist', filename)

@app.route("/api/scrape")
def scrape():
    # Load value from input form and put value in variable called URL
    url = request.args.get('url')
    try:
        if (url):
            # Get metadata via yt-dlp
            with YoutubeDL() as ydl:
                info_dict = ydl.extract_info(url, download=False)
                title: str | None = info_dict.get('title', None)
                upload_date: str | None = info_dict.get('upload_date', None)

                return {
                    'title': title,
                    'upload_date': upload_date
                }
        else:
            return Response("URL is missing\n", mimetype="text/plain", status=400)
    except Exception as e:
        text = re.sub(r'\x1b\[[0-9;]*m', '', str(e))
        return Response(text, status=500)

@app.route("/api/download", methods=['POST'])
def download():
    data = json.loads(request.data)
    url = data.get('url')
    artist = data.get('artist')
    title = data.get('title')
    year = data.get('year')
    filename = f'{artist} - {title}'
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': filename,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3'
        }],
    }
    if not url:
        return Response("URL is missing\n", mimetype="text/plain", status=400)
    if not artist:
        return Response("Artist name is missing\n", mimetype="text/plain", status=400)
    if not title:
        return Response("Title is missing\n", mimetype="text/plain", status=400)
    if not year:
        return Response("Year is missing\n", mimetype="text/plain", status=400)
    try:
        with YoutubeDL(ydl_opts) as ydl: # type: ignore
            ydl.download([url])

        update_metadata(filename, artist, title, year)
    except Exception as e:
        return Response("Exception: " + str(e), mimetype="text/plain", status=500)
    return Response(f"Successfully added song '{artist} - {title}' to playlist {year}!\n", mimetype="text/plain", status=200)

def update_metadata(filename: str, artist: str, title: str, year: str):
    audiofile = eyed3.load(f'{filename}.mp3')
    if audiofile:
        audiofile.tag.artist = artist
        audiofile.tag.title = title
        audiofile.tag.album = year
        audiofile.tag.album_artist = "Various Artists"
        audiofile.tag.save() # type: ignore

