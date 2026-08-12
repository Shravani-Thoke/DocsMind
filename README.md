<div align="center">

<img src="./frontend/src/assets/icon.png" alt="DocsMind AI Logo" width="90"/>

# DocsMind AI

### AI-Powered Learning Assistant

Transform PDFs into interactive learning experiences with AI-powered conversations, summaries, flashcards, and quizzes.

🌐 **Live Demo:** https://docs-mind-zeta.vercel.app

</div>

---

## 📖 Overview

DocsMind AI is a full-stack AI learning platform designed to help students learn more effectively from their study materials.

Instead of reading long PDFs line by line, users can upload documents and interact with them using AI. The platform generates intelligent summaries, flashcards, quizzes, and allows users to ask questions directly from their uploaded documents.

The project focuses on combining Artificial Intelligence with modern web technologies to create an engaging and productive learning experience.

---

## ✨ Features

### 📄 Document Management
- Upload PDF documents
- Secure cloud storage using Supabase
- Automatic text extraction
- Organize learning resources

### 💬 AI Chat
- Chat directly with uploaded documents
- Context-aware responses
- Markdown support
- Code syntax highlighting

### 🧠 Flashcards
- AI-generated flashcard sets
- Multiple flashcard collections per document
- Interactive study mode

### 📝 Quiz Generator
- Generate quizzes instantly
- AI-created questions
- Evaluate learning progress

### 📊 Dashboard
- Learning statistics
- Document overview
- Personalized workspace

### 🔐 Authentication
- Email & Password Login
- Google OAuth
- JWT Authentication
- Secure Protected Routes

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Recharts
- Lucide Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- JWT Authentication

## AI & Cloud

- Groq API
- Supabase Storage
- MongoDB Atlas

## Deployment

- Vercel
- Render

---

# ⚙️ System Architecture

```
                React + Vite
                     │
                     │
             REST API Requests
                     │
              Express Backend
                     │
        ┌────────────┴────────────┐
        │                         │
    MongoDB Atlas            Supabase
        │                         │
 User Data             PDF Storage

                     │
                  Groq API
                     │
            AI Responses
```

# 🎯 Future Improvements

- Voice-based document interaction
- AI Study Planner
- Collaborative workspaces
- Multi-language document support
- Notes & Highlights
- Spaced Repetition Flashcards
- OCR Support for scanned PDFs

---

# 👩‍💻 Author

**Shravani Thoke**

Computer Engineering Student

GitHub:
https://github.com/Shravani-Thoke

LinkedIn:
https://www.linkedin.com/in/shravani-thoke/

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
