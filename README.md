# Codenixia AI Business Automation Assistant

Production-ready full-stack AI assistant for business/course queries, lead capture, chat persistence, and admin reporting.

## Stack

- Frontend: React + TypeScript + Axios + Vite
- Backend: Node.js + Express + TypeScript
- Database: MySQL with `mysql2` connection pooling
- AI: OpenRouter Chat Completions API
- Bonus: JWT admin login, role-protected admin APIs, Docker setup

## Project Structure

```text
/client
  /components
  /pages
  /services
/server
  /controllers
  /routes
  /models
  /services
  /config
/database
  schema.sql
/docs
  API.md
  ARCHITECTURE.md
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment files:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Update secrets in `server/.env`:

```text
OPENROUTER_API_KEY=your_key
JWT_SECRET=use_a_long_random_secret
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=codenixia_ai_assistant
```

4. Create the database:

```bash
mysql -u root -p < database/schema.sql
```

5. Run locally:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Docker

Copy `server/.env.example` to `server/.env`, set `OPENROUTER_API_KEY` and `JWT_SECRET`, then run:

```bash
docker compose up --build
```

## Default Admin

The schema creates a starter admin account:

```text
Email: pundharshad6464@gmail.com
Password: Harshad@12345
```

Change this immediately in production.

## Main Features

- Chatbot with OpenRouter-powered responses
- Session-based chat history persisted in MySQL
- Lead form with frontend and backend validation
- Lead storage in MySQL
- Lead notification automation via SMTP or mock logging
- JWT-protected admin dashboard
- Admin stats, leads table, chat logs, and lead status updates

## Documentation

- API: `docs/API.md`
- Architecture: `docs/ARCHITECTURE.md`
- Schema: `database/schema.sql`
