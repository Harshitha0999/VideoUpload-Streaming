# 🎥 Video Upload & Streaming Platform

A full-stack web application that allows users to **register, upload videos, stream them efficiently, and track real-time processing updates**.  
The platform is built with a secure authentication system, protected APIs, video management features, and live status updates using **Socket.IO**.

---

## 🚀 Project Overview

This application provides a secure and scalable platform where users can:

- ✅ Create an account and log in securely  
- 📤 Upload videos (stored locally)  
- 🎬 Stream videos efficiently using range requests  
- ⚡ Track real-time video processing progress  
- 📊 View dashboard statistics  
- 🔎 Search and manage uploaded videos  

**Security** is handled using **JWT authentication**, and **real-time updates** are powered by **Socket.IO**.

---

## 🔐 Authentication System

The platform includes a complete authentication flow:

- Users can **register and log in**
- Passwords are **securely hashed** before storage
- JWT tokens are generated on **login and registration**
- Protected routes require a **valid token**
- Tokens are **automatically attached** to frontend API requests
- If a token is **expired or invalid**, the user is logged out automatically

---

## 📤 Video Upload System

- Upload videos up to **100MB**
- Files are stored in the `/uploads` directory
- Each upload creates a **video document in MongoDB**

Each video record includes:
- User reference  
- File path  
- Original file name  
- Status (`processing`, `safe`, `flagged`)  
- Progress percentage (`0–100`)

---

## 🎬 Video Streaming

- Videos are streamed using **HTTP range requests**
- Supports **smooth playback**
- Public streaming endpoint
- Efficient **partial loading** instead of full file downloads

---

## ⚡ Real-Time Video Processing (Socket.IO)

After a video is uploaded:

1. Status starts as **processing**
2. Progress increases automatically
3. Updates are sent in **real time**
4. When processing completes:
   - Video is marked as **safe** or **flagged**
   - Frontend UI updates automatically (no refresh required)

---

## 📊 Dashboard Features

The dashboard displays:

- 📁 Total uploaded videos  
- ✅ Safe videos count  
- 🚫 Flagged videos count  
- ⏳ Processing videos count  
- 🕒 Recently uploaded videos  

---

## 🔎 Search Functionality

Users can search videos by:

- File name  
- Status (`safe`, `flagged`, `processing`)  

Search results update **dynamically**.

---

## 🗑 Video Management

Users can:

- View all uploaded videos  
- Delete videos  
- Automatically:
  - Remove the file from storage  
  - Remove the record from the database  

---

## 📁 Project Structure

### 🔹 Backend Structure

backend/
│
├── src/
│ ├── models/
│ │ ├── user.js 
│ │ └── video.js 
│ │
│ ├── routes/
│ │ ├── auth.routes.js 
│ │ └── video.routes.js 
│ │
│ ├── middleware/
│ │ └── auth.middleware.js
│ │
│ ├── utils/
│ │ ├── upload.js 
│ │ └── videoProcessing.js 
│ │
│ └── server.js
│
├── uploads
├── .env
└── package.json

---

### 🔹 Frontend Structure

src/
│
├── api/
│ └── api.js 
├── components/
│ ├── UploadVideo.jsx 
│ ├── VideoList.jsx 
│ └── VideoPlayer.jsx 
│
├── App.jsx 
└── App.css 

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/videoApp
JWT_SECRET=yourSecretKey
PORT=5002
```
▶️ Running the Application

1️⃣ Start Backend
```
cd backend
npm install
npm run dev
```
Backend will run at:
👉 http://localhost:5002

2️⃣ Start Frontend
```
npm install
npm run dev
```

Frontend will run at:
👉 http://localhost:5173

---

## 📌 Future Enhancements

 Real AI-based video moderation

 Cloud storage integration (AWS S3)

 Admin control panel

 Pagination for large video lists

 Thumbnail generation

 Backend password change implementation



👩‍💻 Developed By Harshitha Ganta
