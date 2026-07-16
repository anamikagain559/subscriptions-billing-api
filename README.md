<div align="center">
  <h1>🚀 Subscription Billing API</h1>
  <p><strong>A robust, scalable RESTful API for handling modern subscription plans and billing seamlessly.</strong></p>

  <!-- Badges -->
  <p>
    <img alt="NodeJS" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img alt="Stripe" src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" />
  </p>
</div>

<hr/>

## ✨ Features
- 🔐 **Authentication & Authorization:** Secure registration and login flows using JWT and bcrypt.
- 💳 **Stripe Billing Integration:** Fully integrated with Stripe Checkout for secure and hassle-free payments.
- 📦 **Plan Management:** Flexible creation and listing of varied subscription tiers (monthly/yearly).
- 🔄 **Subscription Lifecycle:** Purchase, upgrade, and cancel subscriptions instantly.
- ⚡ **Automated Webhooks:** Built-in listener for Stripe events (e.g., successful payments, cancellations, etc).
- 🛡️ **Security First:** Robust validation with **Zod**, HTTP header security with **Helmet**, and intelligent error handling.
- 🐳 **Docker Ready:** Comes with a `Dockerfile` and `docker-compose.yml` for rapid deployment.

---

## 🛠️ Tech Stack
| Category | Technology |
| :--- | :--- |
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB (Mongoose) |
| **Payment Gateway**| Stripe API |
| **Validation** | Zod |
| **Logging** | Winston & Morgan |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- [Docker](https://www.docker.com/) (Optional, for containerized deployment)
- [Stripe Account](https://stripe.com/) (For API keys and webhooks)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd subscription-billing-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root folder and add the required variables. Example:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/billing_db
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=1d
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. **Start the Application:**
   
   **Development Mode:**
   ```bash
   npm run dev
   ```
   **Production Mode:**
   ```bash
   npm run build
   npm start
   ```
   
   **Using Docker (Recommended):**
   ```bash
   docker-compose up --build
   ```

---

## 🌐 API Overview

The API is mounted under the `/api/v1` prefix. 

### 🧪 Postman Collection
Test the API seamlessly via the included Postman Collection:  
👉 [View API on Postman](https://winter-sunset-301429-1.postman.co/workspace/My-Workspace~7addf033-df20-4e26-8d51-282ef0de3cf8/collection/18689428-241e600e-f62a-4273-99a0-40e42bd64b7c?action=share&source=copy-link&creator=18689428)  
*(Alternatively, import `postman_collection.json` located in the root directory)*

<details>
<summary><strong>Click to see Endpoints Summary</strong></summary>

- **Auth** (`/api/v1/auth`)
  - `POST /register` - Register user
  - `POST /login` - Login user
- **Plans** (`/api/v1/plans`)
  - `GET /` - List all plans
  - `POST /` - Create a plan (Admin/Auth)
- **Subscriptions** (`/api/v1/subscriptions`)
  - `GET /my` - Fetch current user's subscription
  - `GET /history` - Fetch current user's subscription history
  - `POST /purchase` - Purchase/upgrade plan via Stripe Checkout
  - `POST /:subscriptionId/cancel` - Cancel active subscription
- **Webhooks** (`/api/v1/webhooks`)
  - `POST /` - Stripe webhook listener for real-time syncing
</details>

---

## 📂 Project Structure

```text
subscription-billing-api/
├── src/
│   ├── config/       # Environment & 3rd-party configs
│   ├── controllers/  # Route handlers (Req/Res logic)
│   ├── middlewares/  # Express middlewares (Auth, Validation)
│   ├── models/       # Mongoose schemas & TypeScript interfaces
│   ├── routes/       # API router setup
│   ├── services/     # Business logic & Stripe interactions
│   ├── utils/        # Utilities and helpers (Error classes, Async handlers)
│   └── server.ts     # Express app entry point
├── Dockerfile        # Container build instructions
├── docker-compose.yml# Container orchestration
└── package.json      # Dependencies and scripts
```

---

## 📜 License
This project is licensed under the **ISC License**.
