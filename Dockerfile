FROM python:3.8

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ADD https://get.docker.com /get-docker.sh
RUN sh get-docker.sh && rm get-docker.sh

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
