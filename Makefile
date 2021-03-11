BINARY=engine

docker:
	docker build -t node-rest .

run:
	docker-compose up -d

stop:
	docker-compose down