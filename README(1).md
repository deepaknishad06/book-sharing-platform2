# Book Sharing Platform

## Run the project

From the root folder (`Book Sharing Platform`):

1. Install root dependencies:
   ```bash
   npm install
   ```

2. Start backend and frontend together:
   ```bash
   npm run dev
   ```

This runs both:
- `npm run backend` → starts the backend server on `http://localhost:5000`
- `npm run frontend` → starts the Vite app on `http://localhost:5173`

## Alternative commands

- Start only backend:
  ```bash
  npm run backend
  ```

- Start only frontend:
  ```bash
  npm run frontend
  ```

## Backend requirements

- MongoDB must be running locally at `mongodb://127.0.0.1:27017/bookstore`
- The backend uses `backend/.env` for `MONGO_URI` and `JWT_SECRET`

## Notes

- The Profile page handles login and registration in one page.
- Borrowed books are stored in the backend and are visible under `My Books`.
- The frontend proxies API requests to the backend using the Vite dev server.
