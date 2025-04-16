Maintenance Frontend
Overview
This is the frontend application for managing maintenance periods within an administrative interface. It allows users to create, edit, and delete maintenance entries. The application interacts with a backend server via RESTful API calls.

Technologies Used
React.js – JavaScript library for building user interfaces

TypeScript – Typed superset of JavaScript for safer development

Vite – Fast and modern frontend build tool

Tailwind CSS – Utility-first CSS framework for styling

Getting Started
1. Environment Setup
Make sure you have a .env file in the root directory with the following environment variable:

VITE_SERVER_BASE_URL=http://your-backend-url/admin
⚠️ The backend base URL must include /admin for the frontend to communicate properly with the API endpoints.

2. Install Dependencies
Run the following command to install all project dependencies:

npm install
3. Run the Application (Development Mode)
Start the application in development mode using:

npm run dev
By default, the app runs on http://localhost:5173.

4. Build and Preview (Production Mode)
To generate a production-ready build:

npm run build
Then, to preview the built version locally:

npm run preview
Available Scripts

Command	Description
npm run dev	Starts the development server
npm run build	Builds the application for production
npm run preview	Previews the production build locally
npm run lint	(Optional) Lints the codebase

Environment Variables

Variable Name	Description
VITE_SERVER_BASE_URL	Base URL of the backend API (must include /admin at the end)
Notes
The application uses session storage to store the user's token for authenticated API calls.
