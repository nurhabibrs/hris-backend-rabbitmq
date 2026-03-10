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

The Docker Compose setup uses an **external** Docker network named `hris-network`. Create it once before the first run:

```bash
docker network create hris-network
```

Then spin up the consumer together with RabbitMQ and MongoDB:

```bash
docker compose up --build
```

Services exposed on your host:

| Service | Container | Port | Notes |
|---------|-----------|------|-------|
| RabbitMQ AMQP | `hris-rabbitmq` | `5672` | Used internally by the app |
| RabbitMQ Management UI | `hris-rabbitmq` | `15672` | `guest` / `guest` |
| MongoDB | `hris-mongodb` | `27017` | |
| NestJS consumer | `hris-rabbitmq-consumer` | — | No HTTP port exposed |

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
├── app.module.ts           # Root module — wires Mongoose & consumer
├── app.controller.ts       # Scaffold controller (unused by microservice)
├── app.controller.spec.ts  # Unit tests for AppController
├── app.service.ts          # Scaffold service (unused by microservice)
├── log.schema.ts           # Mongoose schema for Log documents
├── logging.consumer.ts     # RabbitMQ event handler (@EventPattern)
└── main.ts                 # Bootstraps the RabbitMQ microservice
```

## Data Model

Log documents stored in MongoDB (`hris` database, `logs` collection):

| Field | Type | Description |
|-------|------|-------------|
| `message` | `string` (required) | Log message extracted from the event |
| `payload` | `object` | Full raw event payload |
| `createdAt` | `Date` | Auto-set by Mongoose timestamps |
| `updatedAt` | `Date` | Auto-set by Mongoose timestamps |

## License

UNLICENSED
