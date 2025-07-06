# 🎧 User Service API (Microservice)

This service handles user registration, authentication, playlist management, and song interactions. It is part of a larger music streaming platform using microservices.

## 🚀 Base URL

```
http://localhost:5000/api/v1
```

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
