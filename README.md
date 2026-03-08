# Merchant Refund Portal

A full-stack **Merchant Refund Portal** that allows merchants to authenticate, view transaction history, inspect transaction details, and initiate refund requests while enforcing strict backend eligibility rules.

This project simulates a real production feature commonly found in payment systems and merchant dashboards.

---

# Live Demo

Frontend (Live App)

https://merchant-refund-portal.netlify.app/

Backend API

https://merchant-portal-k3zl.onrender.com/api

Example endpoint

https://merchant-portal-k3zl.onrender.com/api/transactions

---

# Test Credentials

Use the following seeded accounts:

### Merchant 1
Email: merchant1@test.com 
Password: Test@1234

### Merchant 2
Email: merchant2@test.com  
Password: Test@1234

Each merchant has a different transaction history seeded in the database.

---

# Project Overview

The Merchant Refund Portal allows merchants to:

- Securely log in
- View transaction history
- Filter and search transactions
- Inspect transaction details
- Track status timeline
- Initiate refund requests

The backend enforces strict **refund eligibility rules** to ensure financial correctness and prevent misuse.

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

## Infrastructure

Frontend Deployment: **Vercel**  
Backend Deployment: **Render**  
Database: **MongoDB Atlas**

---

# Architecture

This project uses a **monorepo structure**.

```
merchant-refund-portal
│
├── frontend
│   ├── src
        ├──components
│       ├── context
│       ├── hooks
│       ├── layout
│       └── pages
│       ├── router
│       ├── services
│       └── types
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   └── routes
│   │   ├── seed
│   │   ├── service
│   │   └── utils
│   │
│   └── app.js
│
└── README.md
```

This separation keeps the frontend and backend clearly organized while sharing a single repository.

---

# Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

Flow:

1. Merchant logs in with email and password.
2. Backend validates credentials.
3. Server returns a JWT access token.
4. Token is stored in local storage.
5. Protected routes require a valid token.
6. Token is attached to all API requests via Authorization header.

Example header:

```
Authorization: Bearer <token>
```

Unauthenticated users are redirected to the login page.

---

# Core Features

## Authentication

- Login screen with email/password
- JWT-based authentication
- Session persistence across refresh
- Logout functionality
- Protected routes

---

## Transaction List

Merchants can view a paginated list of their transactions.

Features:

- Pagination (10 records per page)
- Server-side filtering
- Search by transaction ID
- Status filtering
- Loading state
- Empty state

Query parameters used:

```
page
limit
status
search
fromDate
toDate
```

Example request:

```
GET /api/transactions?page=1&limit=10&status=failed
```

---

## Transaction Detail

Clicking a transaction opens a detailed view.

Displayed information:

- Transaction ID
- Amount
- Currency
- Status
- Payment method
- Transaction date

### Status Timeline

Each transaction maintains a timeline of status events such as:

```
Initiated
Processing
Successful
Refunded
```

Timeline events are stored in a dedicated collection.

---

## Refund Flow

The refund flow enforces strict backend validation.

### Refund eligibility rules

1. Only **Successful transactions** are eligible.
2. A transaction can only be refunded **once**.
3. Refund must be requested **within 30 days** of transaction.
4. Refund amount **cannot exceed original amount**.
5. **Partial refunds are allowed**.

### Refund process

1. Merchant opens transaction detail
2. Clicks **Raise Refund**
3. Submits refund amount and reason
4. Backend validates eligibility
5. Refund record is created
6. Transaction status updates to **Refunded**
7. Timeline event is recorded

If validation fails, the backend returns a clear error message.

Example error:

```
Refund request must be within 30 days of transaction
```

---

# Database Design

The system uses MongoDB Atlas.

Collections used:

### Merchants

Stores merchant credentials.

Fields:

```
email
password
name
```

---

### Transactions

Stores merchant transactions.

Fields:

```
transactionId
merchantId
amount
currency
status
paymentMethod
createdAt
```

---

### Refunds

Stores refund requests.

Fields:

```
transactionId
merchantId
amount
reason
createdAt
```

---

### TransactionStatusEvents

Tracks the lifecycle of transactions.

Fields:

```
transactionId
status
createdAt
```

---

# Database Indexes

Indexes were added to optimize query performance.

```
merchantId
transactionId
createdAt
status
```

Reasons:

| Field | Reason |
|------|------|
| merchantId | fast merchant transaction lookup |
| transactionId | quick search |
| createdAt | date range filtering |
| status | status filtering |

---

# API Endpoints

## Authentication

```
POST /api/auth/login
```

---

## Transactions

```
GET /api/transactions
GET /api/transactions/:id
```

---

## Refunds

```
POST /api/refunds
```

---

# UI / UX Considerations

The interface is designed similar to real merchant dashboards.

Features include:

- Clean typography
- Consistent spacing
- Responsive layout
- Hover states
- Active button states
- Disabled button states
- Toast notifications
- Loading states
- Empty states

Transaction statuses are visually distinguishable for quick scanning.

---

# Running the Project Locally

## Clone repository

```
git clone https://github.com/Pannakbhushana/merchant-refund-portal.git
```

---

## Backend Setup

```
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:8080
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

Example:

```
PORT=8080
MONGO_URI
JWT_SECRET=bruce
```

---

# Deployment

Frontend deployed on:

```
Netlify
```

Backend deployed on:

```
Render
```

Database hosted on:

```
MongoDB Atlas
```

All services are connected and running in production.

---

# Tradeoffs and Decisions

### Express vs NestJS

The assignment suggested NestJS. Express was chosen because:

- Faster setup
- Simpler architecture for the scope
- Greater flexibility for custom middleware

However the codebase still follows modular architecture similar to NestJS.

---

### MongoDB

MongoDB was chosen because:

- Flexible schema
- Fast prototyping
- Natural fit for transaction-style data

---

### React vs Next.js

React was chosen because:

- No SSR needed
- Simpler routing
- Faster development for a dashboard-style UI

---

# Future Improvements

Possible improvements if extended further:

- Role-based access control
- Refund approval workflows
- Email notifications
- Rate limiting
- API request logging
- Integration tests
- Audit logs

---

# Author

Rahul Kumar Mishra  
Full Stack Developer