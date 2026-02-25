# 🌍 LearnLingo — Language Tutor Search Platform

**LearnLingo** is a modern web application designed to help users find professional language tutors. The project is implemented as a user-friendly catalog with a filtering system, personal user accounts, and an interactive lesson booking feature.

## 🚀 Key Features

- **User Authentication**: Secure Sign Up and Log In functionality powered by Firebase Auth.
- **Tutor Catalog**: Browse detailed tutor profiles, including their experience, ratings, and student reviews.
- **Advanced Filtering**: Search for tutors by language, level of knowledge (A1–C2), and hourly rate.
- **Favorites System**: Authenticated users can save tutors to a personal "Favorites" list, with data synchronized via Firebase Realtime Database.
- **Lesson Booking**: Instant trial lesson booking through an interactive modal form with automatic data storage.
- **Smart Notifications**: Real-time user feedback using `react-hot-toast` for successful actions, errors, and authentication prompts.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite.
- **Styling**: SCSS Modules (modular approach to ensure style isolation).
- **Backend & DB**: Firebase (Authentication for user profiles and Realtime Database for data persistence).
- **Form Management**: React Hook Form with Yup validation.
- **Routing**: React Router Dom.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/learn-lingo.git](https://github.com/Suzy-Lana777/learn-lingo)
   ```
   Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your Firebase configuration keys:

Фрагмент коду
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_DATABASE_URL=your_url
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Run the development server:

Bash
npm run dev
