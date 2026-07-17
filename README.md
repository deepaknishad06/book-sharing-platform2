# Book Sharing Platform

A simple MERN Stack Book Sharing Platform where users can browse books, upload books, borrow books, and manage their profile.

## How to Run

Open the project folder and install dependencies:

```bash
npm install
```

Start both frontend and backend together:

```bash
npm run dev
```

This will start:

* Backend → `http://localhost:5000`
* Frontend → `http://localhost:5173`

## You can also run them separately

Backend:

```bash
npm run backend
```

Frontend:

```bash
npm run frontend
```

## Backend Setup

Create a `.env` file inside the `backend` folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

If you're using MongoDB locally:

```env
MONGO_URI=mongodb://127.0.0.1:27017/bookstore
```

Or if you're using MongoDB Atlas:

```env
MONGO_URI=your_atlas_connection_string
```

## Features

* User Registration & Login
* Upload Books
* Browse Books
* Borrow Books
* My Books Section
* Search Books
* Responsive UI

## Tech Stack

* React
* Vite
* Node.js
* Express.js
* MongoDB

## Notes

* Make sure MongoDB is running before starting the backend.
* Don't upload your `.env` file to GitHub.
* If you're deploying the project, use MongoDB Atlas instead of the local database.
