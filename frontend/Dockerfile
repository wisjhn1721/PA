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



RUN mkdir -p /perfectattendance
WORKDIR /perfectattendance

COPY .yarnrc.yml /perfectattendance/
COPY .yarn/ /perfectattendance/.yarn/
COPY package.json yarn.lock /perfectattendance/
RUN yarn

COPY pdm.lock pyproject.toml /perfectattendance/
RUN pdm sync --prod

COPY ./ /perfectattendance

RUN yarn build

EXPOSE 5000

ENTRYPOINT ["pdm", "run", "gunicorn", "--bind=0.0.0.0:5000", "build.app:app"]