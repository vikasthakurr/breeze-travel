# Breeze Travel

Breeze Travel is a full-stack travel booking app with a React frontend and an Express + MongoDB backend.

## Project structure

- `frontend/` → React app for the user interface
- `backend/` → Express API and database connection

## Prerequisites

- Node.js and npm installed
- MongoDB running locally (or a valid `DATABASE_URI` in the backend `.env` file)

## Setup

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure the backend

Create a `.env` file in the `backend/` folder:

```env
DATABASE_URI=mongodb://localhost:27017/breeze-travel
PORT=3500
```

### 3. Start the backend

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:3500`.

### 4. Start the frontend

Open a new terminal and run:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`.

## Demo data

To seed sample hotels, categories, and users:

```bash
cd backend
npm run seed
```

## Useful links

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3500`

## Notes for students

- The frontend uses the backend API helper in `frontend/src/services/api.js`
- If the UI does not load data, confirm the backend is running
- If the database connection fails, check the `DATABASE_URI` in `backend/.env`
