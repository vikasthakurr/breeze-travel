# Breeze Travel Frontend

This folder contains the **user interface** for the Breeze Travel app.

## What this frontend does

- Shows the home page with hotel categories and search options
- Lets students search for hotels and view hotel details
- Handles login, signup, wishlist, payment, and order summary screens
- Talks to the backend API to fetch and update data

## Before you start

Install dependencies:

```bash
npm install
```

Create a `.env` file in this folder if you want to point the app to a different backend URL:

```env
REACT_APP_API_BASE_URL=http://localhost:3500
```

If you do not create this file, the app will use `http://localhost:3500` by default.

## Run the frontend

```bash
npm start
```

The app will open in your browser at:

- http://localhost:3000

## Main folders

- `src/components/` → reusable UI parts like navbar, cards, filters, alerts
- `src/pages/` → screens for home, hotel details, wishlist, payment, and admin
- `src/services/` → API helper files
- `src/context/` → React context for shared state
- `src/reducer/` → reducer logic for state updates

## How the app works

1. The user opens the app in the browser.
2. React renders the pages from `src/pages/`.
3. Components call the backend using the API helper in `src/services/api.js`.
4. The backend returns hotel, category, auth, and wishlist data.
5. The UI updates based on that response.

## Common student questions

### What port does the frontend use?

- `3000`

### What port does the backend use?

- `3500`

### Why is the app blank or not loading data?

- Make sure the backend is running
- Check that the backend URL in `.env` is correct

## Useful commands

```bash
npm install
npm start
npm run build
```

## Notes

- This project uses React and Tailwind CSS
- The app is connected to the backend through `src/services/api.js`
- If you change the backend port, update `REACT_APP_API_BASE_URL`
