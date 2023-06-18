dev:
	cp .env.dev .env
	docker compose up -d --build
	rm .env
prod:
	cp .env.prod .env
	docker compose up -d --build
	rm .env