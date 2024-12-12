# Todo App - Frontend and Backend Setup

This project is a simple Todo app with a front-end built using React and Material UI (MUI) and a back-end powered by Node.js, Express, and MongoDB.

## Table of Contents
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Challenges Faced](#challenges-faced)

---

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm run dev
   ```

   This will start the frontend server on `http://localhost:5173`.

---

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory and include the following variables:
     ```
     PORT=5000
     DATABASE_URL=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

4. Run the backend:
   ```bash
   npm start
   ```

   This will start the backend server on `http://localhost:5000`.

---

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **React-MUI**: A popular Material UI framework for React that helps in building beautiful UI components quickly.

### Backend:
- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: NoSQL database for storing todo items.

---

## Environment Variables

### Backend:
- **PORT**: The port number the backend server will run on (default: `5000`).
- **DATABASE_URL**: MongoDB connection string for the database.
- **JWT_SECRET**: A secret key used for signing JWT tokens.

### Frontend:
- **VITE_API_URL**: The URL of the backend API to which the frontend will make requests.

---

## Challenges Faced

1. **MongoDB Integration**: Integrating MongoDB into the project initially posed some challenges, particularly with handling database connections and ensuring the correct setup of MongoDB URI. 
   
2. **JWT Authentication**: Implementing JWT-based authentication to ensure secure user sessions and managing the token flow between the frontend and backend was complex. It involved correctly setting up the JWT middleware on the backend and handling token storage on the frontend (in `localStorage`).

---

This README serves as a guide for setting up and running the Todo app locally.

---

Feel free to adjust any sections based on additional project-specific details!