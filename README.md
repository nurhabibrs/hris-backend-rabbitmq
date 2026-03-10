# HRIS Backend — RabbitMQ Consumer

A [NestJS](https://nestjs.com/) microservice that consumes `log_event` messages from a RabbitMQ queue and persists them to MongoDB.

## Architecture

```
Publisher ──► RabbitMQ (logs_queue) ──► NestJS Consumer ──► MongoDB
```

| Component | Role |
|-----------|------|
| **RabbitMQ** | Message broker — receives log events |
| **NestJS app** | Microservice consumer — processes and stores logs |
| **MongoDB** | Persistence layer — stores log documents |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/) (recommended)
- **or** Node.js 22+, a running RabbitMQ instance, and a running MongoDB instance

## Environment Variables

| Variable | Default (local) | Description |
|----------|-----------------|-------------|
| `RABBITMQ_URL` | `amqp://localhost:5672` | RabbitMQ connection URL |
| `MONGODB_URI` | `mongodb://localhost:27017/hris` | MongoDB connection URI |

## Running with Docker (recommended)

Spin up the consumer together with RabbitMQ and MongoDB in one command:

```bash
docker compose up --build
```

Services exposed on your host:

| Service | Port | Notes |
|---------|------|-------|
| RabbitMQ AMQP | `5672` | Used internally by the app |
| RabbitMQ Management UI | `15672` | `guest` / `guest` |
| MongoDB | `27017` | |

Stop and remove containers:

```bash
docker compose down
```

Remove containers **and** the MongoDB volume:

```bash
docker compose down -v
```

## Running Locally (without Docker)

```bash
# Install dependencies
npm install

# Development (watch mode)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

Make sure RabbitMQ is reachable at `amqp://localhost:5672` and MongoDB at `mongodb://localhost:27017` before starting.

## Project Setup

```bash
npm install
```

## Tests

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Project Structure

```
src/
├── app.module.ts        # Root module — wires Mongoose & consumer
├── log.schema.ts        # Mongoose schema for Log documents
├── logging.consumer.ts  # RabbitMQ event handler (@EventPattern)
└── main.ts              # Bootstraps the RabbitMQ microservice
```

## License

UNLICENSED
