# 🏷️ AI‑Powered Real‑Time Auction Platform

Scalable real-time auction backend built with Node.js (Express), Socket.IO, MongoDB, RabbitMQ, and a FastAPI ML microservice. Includes JWT auth, rate limiting, Swagger docs, queues, cron jobs, and structured logging.

## 🚀 Overview

This repository implements a production‑ready backend for a live auction system with:
- Real-time bidding via WebSockets
- Concurrency‑safe bid processing (queues)
- Auction lifecycle management and cron tasks
- AI predictions service (FastAPI) for bid/win likelihood
- Robust security (JWT, helmet, rate limiting)
- Swagger/OpenAPI docs
- Dockerized local stack (API + MongoDB + RabbitMQ + Redis)

## 🧭 Project Structure

Key files and folders:
- `server.js` — Express app entrypoint, Socket.IO bootstrap, routes, middleware
- `src/config/` — DB, RabbitMQ, Swagger setup
- `src/routers/` — REST endpoints (auth, auction, bid, etc.)
- `src/controllers/` — Business logic per route
- `src/models/` — Mongoose models
- `src/queues/` — Bid and wallet producers/consumers (RabbitMQ)
- `src/cron-job/` — Auction scheduler and cleanup jobs
- `src/sockets/` — Socket.IO server and event wiring
- `ml-service/main.py` — FastAPI microservice (`/predict`) using `auction_model.pkl`
- `logger/` — Winston and daily rotate file logger
- `Dockerfile`, `docker-compose.yml` — Containerization and local stack
- `jest.config.js`, `src/test/` — Unit/Integration tests

## ✅ Features

- JWT authentication and role-based access
- Create/manage auctions and bids
- Real‑time highest bid updates and notifications
- Auction countdown handling (util + cron jobs)
- Input validation (Joi) and API rate limiting
- Centralized error handling + structured logs
- Swagger docs at `/api-docs`
- Message queues for reliable bid processing (RabbitMQ)
- Redis ready (for caching/pubsub, if needed)
- ML predictions endpoint (FastAPI)

## 🔧 Prerequisites

- Node.js 18+
- Docker (optional but recommended)
- MongoDB, RabbitMQ, Redis (via Docker compose provided)

## 🔐 Environment Variables

Create a `.env` file in `Backend/` with at least:

```
PORT=5002
MONGO_URI=mongodb://localhost:27017/tradeclone
JWT_SECRET=replace_me
CLIENT_ORIGIN=http://localhost:3000
```

Notes:
- When using Docker Compose, `MONGO_URI` is set to `mongodb://mongo:27017/tradeclone` for the `backend` container.
- RabbitMQ connection in `src/config/rabbitmq.js` defaults to `amqp://localhost`. In Docker Compose, use `amqp://rabbitmq` if you run the API inside Docker.

## ▶️ Run Locally (Node)

1) Install dependencies

```bash
npm install
```

2) Start the API (development)

```bash
npm start
```

This runs `server.js` with Nodemon. Default port: `5002`. Swagger is at `http://localhost:5002/api-docs`.

3) Optional: Start ML service

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install fastapi uvicorn joblib numpy pydantic
python ml-service/main.py
```

ML service serves `http://localhost:8000/predict`.

## 🐳 Run with Docker Compose

The provided `docker-compose.yml` spins up API, MongoDB, RabbitMQ, and Redis.

```bash
docker compose up --build
```

Ports:
- API: `5001` (container mapped to host 5001)
- MongoDB: `27017`
- RabbitMQ: `5672` (AMQP) and `15672` (management UI)
- Redis: `6379`

Important:
- `backend` service Dockerfile references `Dockerfile.dev`. Ensure it exists or update the compose file to use `Dockerfile`.
- In container, set `MONGO_URI=mongodb://mongo:27017/tradeclone` and RabbitMQ to `amqp://rabbitmq`.

## 📡 WebSockets

Socket.IO is initialized in `server.js` via `initIo(server)` and `InitializeIo(io)`.
- Client origin is controlled by CORS: `CLIENT_ORIGIN` (`http://localhost:3000` by default).
- Real-time events include bid updates, countdowns, and notifications.

## 📦 Queues (RabbitMQ)

`src/config/rabbitmq.js` connects to RabbitMQ and exposes a channel. Producers/consumers:
- `src/queues/bidQueue.producer.js` / `src/queues/bidQueue.consumer.js`
- `src/queues/walletQueue.producer.js` / `src/queues/walletQueue.consumer.js`

Use queues to serialize bid handling and avoid race conditions. Start consumers on app boot once RabbitMQ is connected.

## ⏱️ Cron Jobs

`src/cron-job/` contains auction finalizer, notifications, and cleanup jobs. Wire `startCronJobs()` in `server.js` once stable.

## 🤖 ML Service

`ml-service/main.py` exposes `POST /predict`:

contain the following features:
    bid_amount,
    current_highest_bid,
    num_competitors,
    bidder_win_rate,
    bidder_aggressiveness,

Request body:
```json
{ "features": [0.12, 1.5, 3.0,0.3,3.4] }
```

Response:
```json
{
	"target": 1,
	"probability": { "loss": 0.1234, "win": 0.8766 },
	"status": "success"
}
```

Run locally at `http://localhost:8000`. Integrate via Axios from the Node API or directly from clients as needed.

## 📘 API Docs

Swagger UI is available at:
- `http://localhost:5002/api-docs` (Node local)
- `http://localhost:5001/api-docs` (Docker Compose default port mapping)

Routes include:
- `/api/auth` — login/register, JWT
- `/api/auction` — CRUD and lifecycle
- `/api/Bid` — place bids
- `/api/Transcation` — payments/transactions
- `/api/Notification` — notifications
- `/api/wallet` — wallet ops
- `/api/category` — categories

## 🧪 Testing

Run tests with Jest:

```bash
npm test
```

Notes:
- Jest is run with `NODE_OPTIONS=--experimental-vm-modules` for ESM support.
- Tests are under `src/test/`.

## 🗂️ Logging

Winston with daily rotate file is configured under `logger/`. Logs are written to `logs/` and an `exceptions.log` is present for error tracking.

## ⚠️ Troubleshooting

- MongoDB connection fails: verify `MONGO_URI` and that Mongo is running (`docker compose ps`).
- RabbitMQ connection fails on Docker: use `amqp://rabbitmq` from the API container; from host use `amqp://localhost`.
- CORS issues: update `CLIENT_ORIGIN` and `cors` config in `server.js`.
- Port mismatch: `server.js` uses `PORT=5002` by default; Docker maps `5001`. Access Swagger accordingly.
- Missing `Dockerfile.dev`: either create it or update `docker-compose.yml` to use `Dockerfile`.



## 🙌 Contributing

PRs welcome. Please include tests for behavior changes.

---


