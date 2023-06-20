dev:
	cp .env.dev .env
	docker compose up -d --build
	rm .env
test:
	cp .env.test .env
	docker compose up -d --build
	rm .env
prod:
	cp .env.prod .env
	docker compose up -d --build
	rm .env
clean:
	docker compose down --rmi all
