FROM postgres:10


RUN apt-get update && \
    apt-get install -y \
            build-essential \
            postgresql-server-dev-10 \
            postgresql-contrib-10 \
            libpq-dev \
            libcurl4-openssl-dev \
            libz-dev 

RUN mkdir -p /docker-entrypoint-initdb.d/

COPY init_db.sh /docker-entrypoint-initdb.d/12-init_db.sh
COPY perfectattendance.sql /docker-entrypoint-initdb.d/perfectattendance.sql

WORKDIR /docker-entrypoint-initdb.d
RUN chown -R postgres:postgres /docker-entrypoint-initdb.d && \
    chmod -R 755 /docker-entrypoint-initdb.d

EXPOSE 5432 5432
