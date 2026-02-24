import { useMemo, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import toast from "react-hot-toast";
import BookLessonModal from "../BookLessonModal/BookLessonModal";

import { auth } from "../../services/firebase";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../../services/favoriteTeachers";

import styles from "./TeacherCard.module.scss";
import type { Teacher } from "../../types/teacher";

type Props = {
  teacher: Teacher;
  selectedLevel?: string;
};

export default function TeacherCard({ teacher, selectedLevel }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsFav(false);
      return;
    }

    const checkFavoriteStatus = async () => {
      try {
        const favoriteIds = await getFavorites(user.uid);
        setIsFav(favoriteIds.includes(teacher.id));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    checkFavoriteStatus();
  }, [user, teacher.id]);

  const fullName = useMemo(
    () => `${teacher.name} ${teacher.surname}`.trim(),
    [teacher.name, teacher.surname],
  );

  const speaksText = useMemo(
    () => teacher.languages.join(", "),
    [teacher.languages],
  );

  const conditionsText = useMemo(
    () => teacher.conditions.join(" "),
    [teacher.conditions],
  );

  // ✅ ФУНКЦІЯ ПЕРЕМИКАННЯ СЕРДЕЧКА (БЕЗ ЖОРСТКИХ СТИЛІВ)
  const toggleFavorite = async () => {
    if (!user) {
      // Видалили style, щоб підхопився червоний фон з App.tsx
      toast.error("Please log in to add teachers to your favorites!", {
        duration: 4000,
        icon: "🔒",
      });
      return;
    }

    const previousFav = isFav;
    setIsFav(!previousFav);

    try {
      if (previousFav) {
        await removeFromFavorites(user.uid, teacher.id);
        toast.success("Removed from favorites", { icon: "🗑️" });
      } else {
        await addToFavorites(user.uid, teacher.id);
        // Видалили style, щоб підхопився зелений фон з App.tsx
        toast.success(`${teacher.name} added to favorites!`, {
          icon: "❤️",
        });
      }
    } catch (error) {
      setIsFav(previousFav);
      toast.error("Failed to update favorites. Try again later.");
      console.error("Failed to update favorites:", error);
    }
  };

  return (
    <article className={styles.teacherContainer}>
      <div className={styles.avatarBox}>
        <img
          src={teacher.avatar_url}
          alt={fullName}
          className={styles.avatar}
          loading="lazy"
        />
        <span className={styles.onlineDot} aria-hidden="true" />
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <p className={styles.smallLabel}>Languages</p>

          <div className={styles.metaRow}>
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <span className={styles.bookIcons} aria-hidden="true">
                  <svg className={styles.iconBook} width="16" height="16">
                    <use href="/icons/sprite.svg#icon-book-open" />
                  </svg>
                </span>
                <p className={styles.metaText}>Lessons online</p>
              </div>

              <svg
                className={styles.divider}
                width="1"
                height="16"
                aria-hidden="true"
              >
                <use href="/icons/sprite.svg#icon-divider-vertical" />
              </svg>

              <p className={styles.metaText}>
                Lessons done: {teacher.lessons_done}
              </p>

              <svg
                className={styles.divider}
                width="1"
                height="16"
                aria-hidden="true"
              >
                <use href="/icons/sprite.svg#icon-divider-vertical" />
              </svg>

              <div className={styles.metaItem}>
                <svg
                  className={styles.iconStar}
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use href="/icons/sprite.svg#icon-star" />
                </svg>
                <p className={styles.metaText}>Rating: {teacher.rating}</p>
              </div>

              <svg
                className={styles.divider}
                width="1"
                height="16"
                aria-hidden="true"
              >
                <use href="/icons/sprite.svg#icon-divider-vertical" />
              </svg>

              <p className={styles.metaText}>
                Price / 1 hour:&nbsp;
                <span className={styles.price}>{teacher.price_per_hour}$</span>
              </p>
            </div>

            <button
              type="button"
              className={styles.favBtn}
              onClick={toggleFavorite}
              aria-label="Toggle favorite"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                style={{ transition: "all 0.3s ease" }}
              >
                <path
                  d="M22.5766 4.99419C22.0233 4.44061 21.3663 4.00147 20.6433 3.70187C19.9202 3.40226 19.1452 3.24805 18.3625 3.24805C17.5798 3.24805 16.8047 3.40226 16.0817 3.70187C15.3586 4.00147 14.7016 4.44061 14.1483 4.99419L13 6.14252L11.8516 4.99419C10.734 3.87652 9.21809 3.24863 7.63747 3.24863C6.05685 3.24863 4.54097 3.87652 3.4233 4.99419C2.30563 6.11186 1.67773 7.62774 1.67773 9.20836C1.67773 10.789 2.30563 12.3049 3.4233 13.4225L4.57163 14.5709L13 22.9992L21.4283 14.5709L22.5766 13.4225C23.1302 12.8692 23.5693 12.2122 23.869 11.4892C24.1686 10.7661 24.3228 9.99105 24.3228 9.20836C24.3228 8.42566 24.1686 7.65064 23.869 6.92756C23.5693 6.20448 23.1302 5.54751 22.5766 4.99419Z"
                  fill={isFav ? "#F4C550" : "transparent"}
                  stroke={isFav ? "#F4C550" : "#121417"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <h2 className={styles.title}>{fullName}</h2>

        <div className={styles.teacherInfoBox}>
          <p>
            Speaks:&nbsp;<span className={styles.underline}>{speaksText}</span>
          </p>
          <p>
            Lesson info:&nbsp;<span>{teacher.lesson_info}</span>
          </p>
          <p>
            Conditions:&nbsp;<span>{conditionsText}</span>
          </p>
        </div>

        {!expanded && (
          <button
            type="button"
            className={styles.readMoreBtn}
            onClick={() => setExpanded(true)}
          >
            Read more
          </button>
        )}

        {expanded && (
          <div className={styles.more}>
            <p className={styles.experience}>{teacher.experience}</p>

            {teacher.reviews?.length > 0 && (
              <ul className={styles.reviewsList}>
                {teacher.reviews.map((r, idx) => (
                  <li className={styles.review} key={`${teacher.id}-r-${idx}`}>
                    <div className={styles.reviewHead}>
                      <div
                        className={styles.reviewerAvatar}
                        aria-hidden="true"
                      />
                      <div>
                        <p className={styles.reviewerName}>{r.reviewer_name}</p>
                        <div className={styles.reviewRating}>
                          <svg width="16" height="16" aria-hidden="true">
                            <use href="/icons/sprite.svg#icon-star" />
                          </svg>
                          <span>{Number(r.reviewer_rating).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewText}>{r.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <ul className={styles.levelsList}>
          {teacher.levels.map(lvl => {
            const isActive = selectedLevel ? selectedLevel === lvl : false;
            return (
              <li
                key={`${teacher.id}-${lvl}`}
                className={`${styles.levelItem} ${isActive ? styles.activeLevel : ""}`}
              >
                #{lvl}
              </li>
            );
          })}
        </ul>

        {expanded && (
          <div className={styles.btnBox}>
            <button
              type="button"
              className={styles.bookBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Book trial lesson
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <BookLessonModal
          teacher={teacher}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </article>
  );
}
