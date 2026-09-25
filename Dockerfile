#
# Build container
#
FROM node:22-trixie-slim AS build

WORKDIR /app
COPY . .

# Create static files
RUN npm install -g vite && \
    npm install && \
    npm run build

#
# Production container
#
FROM python:3.13-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy frontend
COPY --from=build /app/dist /app/dist

# Copy backend
COPY app.py app.py
COPY Pipfile .
COPY Pipfile.lock .

# Install Python dependencies
RUN pip install pipenv gunicorn
RUN pipenv requirements > requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Do not buffer log output
ENV PYTHONUNBUFFERED=1

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
