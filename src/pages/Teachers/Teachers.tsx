import { useEffect, useState } from "react";

import styles from "./Teachers.module.scss";

import TeachersFilters from "../../components/Filters/TeachersFilters";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

import type { Teacher } from "../../types/teacher";
import { getFirstTeachers, getNextTeachers } from "../../services/teachers";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      try {
        const page = await getFirstTeachers(4);

        // console.log("PAGE FROM FIREBASE ✅", page); // 👈 ОЦЕ СЮДИ
        // console.log("ITEMS ✅", page.items); // 👈 і це

        setTeachers(page.items);
        setLastKey(page.lastKey);
      } catch (e) {
        setError("Не вдалося завантажити викладачів. Спробуй ще раз.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLoadMore = async () => {
    if (!lastKey || loadingMore) return;

    setLoadingMore(true);
    setError(null);

    try {
      const page = await getNextTeachers(lastKey, 4);
      setTeachers(prev => [...prev, ...page.items]);
      setLastKey(page.lastKey);
    } catch (e) {
      setError("Не вдалося завантажити більше викладачів.");
    } finally {
      setLoadingMore(false);
    }
  };

  const isEmpty = !loading && !error && teachers.length === 0;

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>Teachers</h1>
            <p className={styles.subtitle}>
              Обирай викладача за мовою, рівнем та ціною — і починай навчання.
            </p>
          </div>

          <div className={styles.filters}>
            <TeachersFilters />
          </div>
        </header>

        {error && <div className={styles.alert}>{error}</div>}

        {loading && (
          <div className={styles.stateBox}>
            <div className={styles.spinner} aria-hidden="true" />
            <p className={styles.stateText}>Завантаження викладачів…</p>
          </div>
        )}

        {isEmpty && (
          <div className={styles.stateBox}>
            <p className={styles.stateText}>Поки що немає викладачів 😕</p>
          </div>
        )}

        {!loading && teachers.length > 0 && (
          <>
            <ul className={styles.list}>
              {teachers.map(t => (
                <li key={t.id} className={styles.item}>
                  <TeacherCard teacher={t} />
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.loadMore}
                onClick={handleLoadMore}
                disabled={!lastKey || loadingMore}
              >
                {loadingMore ? "Loading…" : lastKey ? "Load more" : "No more"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
