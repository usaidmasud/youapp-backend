start:
	docker compose up -d

down:
	docker compose down -v

build:
	docker compose build

test-api-gateway:
	docker exec api-gateway npm run test

test-user-service:
	docker exec user-service npm run test

test-chat-service:
	docker exec chat-service npm run test

test-notification-service:
	docker exec notification-service npm run test

logs-api-gateway:
	docker logs api-gateway

logs-user-service:
	docker logs user-service

logs-chat-service:
	docker logs chat-service

logs-notification-service:
	docker logs notification-service