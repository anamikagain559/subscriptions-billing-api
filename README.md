# Subscription Billing API

A robust RESTful API for managing user subscriptions, billing plans, and webhook events. Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Authentication**: Secure user registration and login using JWT and bcrypt.
- **Plan Management**: Create and list subscription plans with different billing cycles and features.
- **Subscription Handling**: Purchase, upgrade, and cancel subscriptions seamlessly.
- **Webhook Integration**: Endpoint to handle external payment/subscription events (e.g., `payment_success`).
- **Security & Validation**: Input validation using Zod, and security headers with Helmet & CORS.
- **Logging**: Comprehensive logging setup using Winston and Morgan.
- **Dockerized**: Easy to deploy with provided Dockerfile and Docker Compose configurations.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Auth**: JSON Web Tokens (JWT) & bcryptjs
- **Logging**: Winston & Morgan

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB running locally or a MongoDB URI
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd subscription-billing-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables. Create a `.env` file in the root directory based on the `.env` configuration (e.g., PORT, MONGO_URI, JWT_SECRET, WEBHOOK_SECRET).

### Running the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

**Using Docker:**
```bash
docker-compose up --build
```

## API Endpoints

The API is structured under the `/api/v1` prefix. 

### Postman Collection
You can view and test all the API endpoints directly using the following Postman link:
👉 [View API Collection on Postman](https://winter-sunset-301429-1.postman.co/workspace/My-Workspace~7addf033-df20-4e26-8d51-282ef0de3cf8/collection/18689428-241e600e-f62a-4273-99a0-40e42bd64b7c?action=share&source=copy-link&creator=18689428)

Alternatively, a Postman collection (`postman_collection.json`) is included in the root directory for manual import.

### Authentication (`/api/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login and receive a JWT token

### Plans (`/api/v1/plans`)
- `GET /` - Retrieve all available plans
- `POST /` - Create a new plan (Requires Auth)

### Subscriptions (`/api/v1/subscriptions`)
- `GET /my` - Get the current user's subscription details (Requires Auth)
- `POST /purchase` - Purchase or upgrade a subscription (Requires Auth)
- `POST /:id/cancel` - Cancel a specific subscription (Requires Auth)

### Webhooks (`/api/v1/webhook`)
- `POST /` - Handle incoming webhook events (Requires `x-webhook-secret` header)

## Project Structure

```
subscription-billing-api/
├── src/
│   ├── config/       # Environment variables and configuration
│   ├── controllers/  # Route controllers (req, res logic)
│   ├── middlewares/  # Custom Express middlewares (Auth, Error handling)
│   ├── models/       # Mongoose schemas and models
│   ├── routes/       # API route definitions
│   ├── services/     # Business logic layer
│   ├── utils/        # Helper functions and utilities
│   └── app.ts        # Express app entry point
├── Dockerfile        # Docker image configuration
├── docker-compose.yml# Multi-container Docker setup
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## License

ISC
