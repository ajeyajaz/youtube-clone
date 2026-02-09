# YouTube Clone – MERN Stack

A full‑stack **YouTube‑like video streaming platform** built using the **MERN stack**. This project supports user authentication, video upload & streaming, channels, comments, and responsive UI.

---
DEMO VIDEO : https://drive.google.com/file/d/14IHnrXWy2D1qsh_SxsFOjzVpvjP4z6JY/view?usp=drive_link

## 🚀 Features

### 👤 Authentication

* JWT‑based authentication (Access & Refresh Tokens)
* Login / Register
* Protected routes

### 📹 Video

* Upload videos with thumbnail
* Video streaming
* Edit & delete videos
* Category selection
* Graceful fallback UI when no videos exist

### 📺 Channel

* Create & manage channel
* Channel videos listing

### 💬 Engagement

* Comment system

### 🎨 UI / UX

* Responsive design (Mobile / Tablet / Desktop)
* Skeleton loaders
* Optimized image loading (handles large 4K thumbnails)
* Custom **Not Found (404)** page

---

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* Multer (file uploads)

---

## 📂 Project Structure

```
root
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   └── App.jsx
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   └── index.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ajeyajaz/youtube-clone.git
cd youtube-clone
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

> By default the server runs on **port 4000**. If it throws a port error, try changing the port number in `.env`.

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 API Authentication

* Protected routes require JWT token
* Send token in headers:

```
x-auth-token: <your_jwt_token>
```

---

---

## 📌 Future Enhancements

* Subscriptions
* Video recommendations
* Watch history
* Playlists
* Live streaming

---

## 👨‍💻 Author

**Ajay (Ajaz)**

Happy Coding 🚀
