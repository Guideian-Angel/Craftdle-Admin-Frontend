# Maintenance Frontend

## Overview

The **Maintenance Frontend** is a web-based admin interface for managing maintenance periods. It allows authorized users to **create**, **edit**, and **delete** maintenance entries. The application communicates with a backend server through **RESTful API calls**.

## Technologies Used

- **React.js** – JavaScript library for building user interfaces  
- **TypeScript** – Typed superset of JavaScript for safer development  
- **Vite** – Fast and modern frontend build tool  
- **Tailwind CSS** – Utility-first CSS framework for styling  

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

### 4. Build and Preview (Production Mode)

To create a production build:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

---

## Available Scripts

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Starts the development server        |
| `npm run build`    | Builds the application for production|
| `npm run preview`  | Previews the production build locally|
| `npm run lint`     | (Optional) Lints the codebase        |

---

## Environment Variables

| Variable Name           | Description                                                   |
|-------------------------|---------------------------------------------------------------|
| `VITE_SERVER_BASE_URL`  | Base URL of the backend API (**must include `/admin`**)       |

---

## Notes

- The application uses **Session Storage** to store the user's token, which is included in the headers of authenticated API calls.
- Ensure the backend server is running and accessible at the configured base URL for the frontend to function properly.
