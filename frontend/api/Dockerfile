# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.9-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
RUN mkdir -p /pa-server
WORKDIR /pa-server

# Install production dependencies.
RUN pip install --upgrade pip
RUN pip install --upgrade pdm

COPY pdm.lock pyproject.toml /pa-server/
RUN pdm sync --prod

COPY . /pa-server


# Run the web service on container startup. Here we use the gunicorn
CMD exec pdm run start