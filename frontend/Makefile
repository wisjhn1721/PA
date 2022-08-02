
.PHONY: build

init:
	yarn
	pdm sync
	yarn build

build:
	docker compose build

up:
	docker compose -f docker-compose.yml -f perfectattendance.dev.yml up