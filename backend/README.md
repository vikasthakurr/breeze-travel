# Breeze Travel Backend

This folder contains the **server-side code** for the Breeze Travel project.

## What this backend does

- Connects to MongoDB
- Serves hotel and category data to the frontend
- Handles user authentication and wishlist features
- Provides admin APIs

## Before you start

Install dependencies:

```bash
npm install
```

Create a `.env` file in this folder with the database connection string:

```env
DATABASE_URI=mongodb://localhost:27017/breeze-travel
PORT=3500
```

If you are using a local MongoDB server, make sure it is running first.

## Run the backend

### Start the server

```bash
npm start
```

### Start with auto-reload during development

```bash
npm run dev
```

### Seed sample data

This project includes a seeder that creates demo hotels, categories, and users.

```bash
npm run seed
```

## Main API routes

- `/api/hotels` → hotel data
- `/api/category` → categories
- `/api/auth` → login and signup
- `/api/wishlist` → wishlist actions
- `/api/admin` → admin features

## Project structure

- `config/` → database connection code
- `controllers/` → business logic for each route
- `model/` → MongoDB schemas
- `routes/` → API endpoints
- `utils/` → helper functions

## Notes for students

- The frontend talks to this backend using `http://localhost:3500`
- If the frontend cannot load data, check that the backend is running
- If you see a database error, verify `DATABASE_URI` in `.env`

## Useful commands

```bash
npm install
npm run dev
npm run seed
```
