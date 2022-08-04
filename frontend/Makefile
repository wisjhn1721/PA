
.PHONY: build

init:
	yarn
	pdm sync
	yarn build

build:
	docker compose -f docker-compose.yml -f *.dev.yml build

build-force:
	docker compose -f docker-compose.yml -f *.dev.yml build --no-cache --pull

up:
	docker compose -f docker-compose.yml -f *.dev.yml up --force-recreate

down:
	docker compose -f docker-compose.yml -f *.dev.yml down
