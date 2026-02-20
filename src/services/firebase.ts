// Firebase init
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Конфіг із .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// Ініціалізація
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

// 🔐 LOGIN
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  // Примусово оновлюємо дані локального об'єкта
  await userCredential.user.reload();

  // Повертаємо актуальний стан з auth, щоб displayName точно був
  return auth.currentUser;
};

// 📝 REGISTER
export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  // 1. Створюємо користувача
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  // 2. Одразу оновлюємо профіль, додаючи ім'я
  await updateProfile(userCredential.user, {
    displayName: name,
  });

  // 3. ⭐ Обов'язково робимо reload, щоб Firebase підтягнув зміни displayName локально
  await userCredential.user.reload();

  // 4. Повертаємо саме auth.currentUser, бо в ньому вже оновлені дані
  return auth.currentUser;
};
