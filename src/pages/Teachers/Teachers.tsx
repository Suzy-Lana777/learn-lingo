import { useEffect, useMemo, useState } from "react";

import styles from "./Teachers.module.scss";

import TeachersFilters from "../../components/Filters/TeachersFilters";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

import type { Teacher } from "../../types/teacher";
import { getFirstTeachers, getNextTeachers } from "../../services/teachers";

type Filters = {
  language: string;
  level: string;
  price: string;
};

const PAGE_SIZE = 4;

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    language: "",
    level: "A1 Beginner",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      try {
        const page = await getFirstTeachers(PAGE_SIZE);
        setTeachers(page.items);
        setLastKey(page.lastKey);
      } catch {
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
      const page = await getNextTeachers(lastKey, PAGE_SIZE);
      setTeachers(prev => [...prev, ...page.items]);
      setLastKey(page.lastKey);
    } catch {
      setError("Не вдалося завантажити більше викладачів.");
    } finally {
      setLoadingMore(false);
    }
  };

  // ✅ ФІЛЬТРАЦІЯ
  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      if (filters.language && !t.languages?.includes(filters.language))
        return false;
      if (filters.level && !t.levels?.includes(filters.level)) return false;

      if (filters.price) {
        const maxPrice = Number(filters.price);
        if (!Number.isNaN(maxPrice) && t.price_per_hour > maxPrice)
          return false;
      }

      return true;
    });
  }, [teachers, filters]);

  const isEmpty = !loading && !error && filteredTeachers.length === 0;

  return (
    <section className={styles.teachers}>
      <div className={styles.teachersContainer}>
        {/* ✅ ФІЛЬТРИ зліва (128px) і зверху (96px) */}
        <div className={styles.filtersBox}>
          <TeachersFilters filters={filters} onChange={setFilters} />
        </div>

        {/* ✅ ВЕСЬ КОНТЕНТ по центру 1184px */}
        <div className={styles.inner}>
          {error && <div className={styles.alert}>{error}</div>}

          {loading && (
            <div className={styles.stateBox}>
              <div className={styles.spinner} aria-hidden="true" />
              <p className={styles.stateText}>Завантаження викладачів…</p>
            </div>
          )}

          {isEmpty && (
            <div className={styles.stateBox}>
              <p className={styles.stateText}>Нічого не знайдено 😕</p>
            </div>
          )}

          {!loading && filteredTeachers.length > 0 && (
            <>
              <ul className={styles.teachersList}>
                {filteredTeachers.map(t => (
                  <li key={t.id}>
                    <TeacherCard teacher={t} selectedLevel={filters.level} />
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
      </div>
    </section>
  );
}
