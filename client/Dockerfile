FROM python:3.9-slim

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y --no-install-recommends \
        gpg \
        git \
        nodejs \
        openssl \
        openssh-server && \
    python -m pip --no-cache-dir install \
        git+https://github.com/pdm-project/pdm.git && \
    npm install -g npm@latest yarn && \
    apt-get --purge remove -y gpg && \
    apt-get autoclean -y && \
    apt-get autoremove -y && \
    rm -rf /root/.cache \
           /root/.npm \
           /root/.gnupg \
           /var/cache/debconf/templates.dat*


RUN mkdir -p /pa-client
WORKDIR /pa-client

COPY .yarnrc.yml /pa-client/
COPY .yarn/ /pa-client/.yarn/
COPY package.json yarn.lock /pa-client/

RUN yarn

COPY ./ /pa-client

EXPOSE 3000

CMD ["yarn", "start"]


