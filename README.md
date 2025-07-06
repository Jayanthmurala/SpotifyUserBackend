# 🎧 User Service API (Microservice)

This service handles user registration, authentication, playlist management, and song interactions. It is part of a larger music streaming platform using microservices.

## 🚀 Base URL

```
http://localhost:5000/api/v1
```
## 🧱 Architecture Overview

This project is a full-stack **music streaming platform** built with a **microservice architecture**. It consists of the following services:

- **User Server**: Handles authentication, user profiles, and playlists using **MongoDB**, **JWT**, and **Redis**.
  - **Git**: https://github.com/Jayanthmurala/SpotifyUserBackend
- **Songs Server**: Manages albums and songs with **PostgreSQL**.
  - **Git**: https://github.com/Jayanthmurala/SpotifySongBackend
- **Admin Server**: Provides admin panel APIs for content management using **PostgreSQL**.
  - **Git**: https://github.com/Jayanthmurala/SpotifyAdminBackend
- **Frontend**: Built with **React + TypeScript**, featuring role-based authentication (User/Admin).
  - **Git**: https://github.com/Jayanthmurala/SpotifyFrontend 

![System Architecture](https://ik.imagekit.io/jayanthmurala05/ChatGPT%20Image%20Jul%206,%202025,%2004_17_19%20PM.png?updatedAt=1751798915788)

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Redis (Caching & Session)
- Cloudinary (Media Storage)
- CORS + Helmet + Morgan

## 🔐 Roles & Credentials (For Testing)

| Role | Email            | Password  |
| ---- | ---------------- | --------- |
| User | userv1@gmail.com | 123456789 |

## 📦 Installation

```bash
cd User server
npm install
```

### ⚙️ Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 📑 API Endpoints

### 🧍 User

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/user/register` | Register new user      |
| POST   | `/user/login`    | Login user & get token |
| GET    | `/user`          | Get user profile       |

### 🎵 Song Interactions

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| GET    | `/user/song/:id` | Get a song by ID              |
| PUT    | `/user/song/:id` | Add/remove song from playlist |

### 📃 Playlist

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/user/playlist` | Get user's playlist |

## 🧑 Author

- **Jayanth Murala**
- 📧 jayanthmurala1@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/jayanth-murala-0045b2281)
