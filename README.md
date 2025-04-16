# Admin Frontend

## Overview

The **Admin Frontend** is a web-based admin interface for managing maintenance periods, users, admins and statistics. It allows authorized users to **create**, **edit**, and **delete** maintenance entries, look at specified user/overall statistics and edit admin rigths. The application communicates with a backend server through **RESTful API calls**.

## Technologies Used

- **React.js** – JavaScript library for building user interfaces  
- **TypeScript** – Typed superset of JavaScript for safer development  
- **Vite** – Fast and modern frontend build tool   

---

## Installation & Running

### 1. Environment Setup

Make sure you have a `.env` file in the root directory with the following environment variable:

```env
VITE_SERVER_BASE_URL=http://your-backend-url/admin
```

> ⚠️ **Note:** The backend base URL **must include `/admin`** for the frontend to communicate properly with the API endpoints.

### 2. Install Dependencies

Run the following command to install all project dependencies:

```sh
npm install
```

### 3. Run the Application (Development Mode)

Start the application in development mode:

```sh
npm run dev
```

The application will be accessible at:  
[http://localhost:5173](http://localhost:5173)

## Available Scripts

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Starts the development server        |
| `npm run build`    | Builds the application for production|

---

## Environment Variables

| Variable Name           | Description                                                   |
|-------------------------|---------------------------------------------------------------|
| `VITE_SERVER_BASE_URL`  | Base URL of the backend API (**must include `/admin`**)       |

---

## Notes

- The application uses **Session Storage** to store the user's token, which is included in the headers of authenticated API calls.
- Ensure the backend server is running and accessible at the configured base URL for the frontend to function properly.
