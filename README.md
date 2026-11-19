# Breeze Travel

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square) 
![GitHub stars](https://img.shields.io/github/stars/vikasthakurr/breeze-travel?style=flat-square) 
![GitHub forks](https://img.shields.io/github/forks/vikasthakurr/breeze-travel?style=flat-square)


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