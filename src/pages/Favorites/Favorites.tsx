import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "../../services/firebase";
import { getFirstTeachers } from "../../services/teachers";
import { getFavorites } from "../../services/favoriteTeachers";
import type { Teacher } from "../../types/teacher";

import TeacherCard from "../../components/TeacherCard/TeacherCard";
import styles from "./Favorites.module.scss";

export default function Favorites() {
  const [favoriteTeachers, setFavoriteTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // 1. Стежимо за авторизацією
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (!currentUser) setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Завантажуємо вчителів
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const favIds = await getFavorites(user.uid);

        if (favIds.length === 0) {
          setFavoriteTeachers([]);
          return;
        }

        // Отримуємо вчителів (завантажуємо достатню кількість для фільтрації)
        const { items } = await getFirstTeachers(100);

        // Залишаємо тільки тих, хто є в списку ID улюблених
        const filtered = items.filter(t => favIds.includes(t.id));
        setFavoriteTeachers(filtered);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <p>Loading favorites...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>
          Please log in to view your favorite teachers.
        </p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {favoriteTeachers.length > 0 ? (
          <ul className={styles.list}>
            {favoriteTeachers.map(teacher => (
              <li key={teacher.id} className={styles.listItem}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p>
              Your favorites list is empty. Add some teachers to see them here!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
