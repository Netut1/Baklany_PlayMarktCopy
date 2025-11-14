// Конфигурация Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Конфигурация вашего проекта
const firebaseConfig = {
  apiKey: "AIzaSyAlGGbJ9IatUZVIYVd8DWRZb5wHAB8BrDc",
  authDomain: "database-470a3.firebaseapp.com",
  projectId: "database-470a3",
  storageBucket: "database-470a3.firebasestorage.app",
  messagingSenderId: "66422557404",
  appId: "1:66422557404:web:ba58df3630e191908b4219",
  measurementId: "G-WCY1Z2GL5R"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Firestore (для базы данных)
export const db = getFirestore(app);

// Инициализация Analytics (только для браузера, опционально)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;