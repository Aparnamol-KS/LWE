# Listen With Eyes (LWE)

![React](https://img.shields.io/badge/React-17.0-blue?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.18-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue?logo=tailwind-css&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.21-purple)
![License](https://img.shields.io/badge/License-MIT-green)

**Listen With Eyes (LWE)** is a **document-centric learning platform** designed for **text-based, self-paced study**.

The platform allows users to upload learning material (text or PDF), converts it into structured documents, and provides **AI-assisted learning tools** such as quizzes, flashcards, and document-based question answering.

All AI features operate strictly on document content to ensure predictable and explainable behavior.

---

## ✨ Features

- Upload learning material via text input or PDF
- Document-centric architecture (single source of truth)
- AI-generated quizzes from document content
- AI-generated flashcards from document content
- Ask-Doubts chat scoped strictly to document content
- Save-once, reuse-forever logic for AI outputs
- User authentication with JWT
- User-scoped document access and actions


## Tech Stack
### Frontend
- React
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Groq API for AI-powered generation
- Multer & pdf-parse for PDF text extraction
- dotenv for environment configuration

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or cloud)
- npm

---

### 📥 Clone the Repository
```
git clone https://github.com/Aparnamol-KS/LWE.git
cd LWE
```

### ⚙️ Backend Setup

```
cd backend/server
npm install
```

#### Create a .env file
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```
#### Start the backend server:
```
node src/index.js
```

### 🌐 Frontend Setup
```
cd frontend
npm install
npm start
```
