# Video Upload & Streaming Application

A full-stack web application that allows users to register, log in, upload videos, and stream their uploaded content securely.

This project is built as part of a full-stack assignment to demonstrate backend–frontend integration, authentication, file uploads, and media playback.

---

## 🚀 Features Implemented

- User authentication (Register / Login / Logout)
- JWT-based protected routes
- Video upload using Multer
- Secure video storage on server
- User-specific video listing (multi-tenant behavior)
- Video playback in the browser
- Clean and responsive UI

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer (file uploads)

### Frontend
- React
- Vite
- Axios
- CSS (custom styling)

---

## 📁 Project Structure
backend/
├─ src/
│ ├─ config/
│ ├─ controllers/
│ ├─ middleware/
│ ├─ models/
│ ├─ routes/
│ ├─ utils/
│ ├─ server.js
├─ uploads/
├─ .env
├─ package.json

frontend/
├─ src/
├─ public/
├─ package.json

---

## ⚙️ Setup Instructions
### Backend
~~~bash
cd backend
npm install
npm run dev
~~~

Create a .env file
~~~env
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/video_app
JWT_SECRET=your_secret_key
~~~

### Frontend

~~~bash
cd frontend
npm install
npm run dev
~~~

### Frontend Url
http://localhost:5173

### Backend Url
http://localhost:5002



