# Test Submission

This is a backend system built with a microservices architecture using NestJS Monorepo. It includes services for:

- User management
- Chat system
- Notifications
- Api Gateway

It uses RabbitMQ for service communication, MongoDB for storage, and Socket.IO for real-time events. All services are containerized using Docker & Docker Compose.

## Technology Used

- NestJS Monorepo
- RabbitMQ
- MongoDB
- Socket.IO
- Docker & Docker Compose
- Typescript

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
API_GATEWAY_PORT=3091
CHAT_SERVICE_PORT=3092
USER_SERVICE_PORT=3093
NOTIFICATION_SERVICE_PORT=3094

# RabbitMQ
RABBITMQ_URI=amqp://guest:guest@rabbitmq:5672

# MongoDB URLs
USER_DB_URI=mongodb://mongo-user-db/user_db
CHAT_DB_URI=mongodb://mongo-chat-db/chat_db

# JWT
JWT_SECRET=secretKey
JWT_EXPIRES_IN=12h
```

## Installation

- Make sure **Docker** and **Docker Compose** are installed.
- Run the project using:

  ```bash
  docker compose up -d --build
  ```

- Access Services

  ```bash
  - API Gateway        : http://localhost:3091
  - Swagger API Docs   : http://localhost:3091/api-docs
  - MongoDB (Container): mongodb://localhost:27017
  - Socket.IO Endpoint : http://localhost:3094
  - RabbitMQ UI        : http://localhost:15672
  (default user/pass : guest / guest)

  ```

- Run Unit Test (Inside Container)

  ```bash
    docker exec api-gateway npm run test
    docker exec user-service npm run test
    docker exec chat-service npm run test
    docker exec notification-service npm run test
  ```

- View Logs (Per Service)

  ```bash
    docker logs api-gateway
    docker logs user-service
    docker logs chat-service
    docker logs notification-service
  ```

## System Overview

### 1. API Gateway

- Central entry point for all HTTP requests.
- No database.
- Uses RabbitMQ to forward requests.

### 2. User Service

- Manages login, registration, profile.
- Uses MongoDB.
- Communicates via RabbitMQ.

### 3. Chat Service

- Handles sending/receiving messages.
- Uses MongoDB and Socket.IO.
- Forwards events to Notification Service.

### 4. Notification Service

- Listens to events via RabbitMQ.
- No database.
- Sends real-time notifications to frontend using Socket.IO.

## Folder Structure

```bash
youapp-backend/
├── apps/
│   ├── api-gateway/
│   ├── chat-service/
│   ├── notification-service/
│   └── user-service/
├── commons/
│   └── libs/
│   └── utils/
├── docker/
├── docker-compose.yml
├── .env
├── Makefile
├── uploads/
└── README.md

```
