# Task Manager Web Application

This is a web application designed to manage tasks and users. It provides authentication for users and an admin interface to manage all tasks and users.

## Features

- User Registration and Login:
  - Secure authentication using JSON Web Tokens (JWT).
  - Users can register with basic details like name, email, and password.
  - Existing users can log in with their credentials.

- Task Management:
  - Users can create, update, and delete their tasks.
  - Admin users have access to all tasks and users.
  - Tasks contain information such as name, description, status, and assigned user.

- Admin Dashboard:
  - Additional privileges for admin users to manage all tasks and users.
  - View all tasks and users.
  - Edit and delete tasks/users as needed.

## Technology Stack

- **Backend:**
  - Node.js
  - Express.js
  - MySQL
  - JSON Web Tokens (JWT) for authentication
  - cors for enabling cross-origin resource sharing
  - body-parser for parsing request bodies

- **Frontend:**
  - React
  - React Router for client-side routing
  - Axios for making API calls

## Setup Instructions

- **Clone the repository:**
   ```bash
   git clone https://github.com/Ilvian/TaskManager.git

## Deployment

The Task Manager Web Application is deployed and accessible at [https://main--mellow-moonbeam-2ca3ac.netlify.app/](https://main--mellow-moonbeam-2ca3ac.netlify.app/).

- **Frontend:**  Netlify
- **Backend:**  Glitch
- **Backend:**  Aiven