// import { useMemo, useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import type { User } from "firebase/auth";

// import { auth } from "../../services/firebase";
// import {
//   addToFavorites,
//   removeFromFavorites,
//   getFavorites,
// } from "../../services/favoriteTeachers";

// import styles from "./TeacherCard.module.scss";
// import type { Teacher } from "../../types/teacher";

// type Props = {
//   teacher: Teacher;
//   selectedLevel?: string;
// };

// export default function TeacherCard({ teacher, selectedLevel }: Props) {
//   const [expanded, setExpanded] = useState(false);
//   const [isFav, setIsFav] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   // 1. Стежимо за станом авторизації
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // 2. Перевіряємо, чи вчитель вже у вибраному при завантаженні
//   useEffect(() => {
//     if (!user) {
//       setIsFav(false);
//       return;
//     }

//     const checkFavoriteStatus = async () => {
//       try {
//         const favoriteIds = await getFavorites(user.uid);
//         setIsFav(favoriteIds.includes(teacher.id));
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };

//     checkFavoriteStatus();
//   }, [user, teacher.id]);

//   const fullName = useMemo(
//     () => `${teacher.name} ${teacher.surname}`.trim(),
//     [teacher.name, teacher.surname],
//   );

//   const speaksText = useMemo(
//     () => teacher.languages.join(", "),
//     [teacher.languages],
//   );

//   const conditionsText = useMemo(
//     () => teacher.conditions.join(" "),
//     [teacher.conditions],
//   );

//   // 3. Логіка кліку по сердечку
//   const toggleFavorite = async () => {
//     if (!user) {
//       alert("Please log in to add teachers to your favorites!");
//       return;
//     }

//     try {
//       if (isFav) {
//         await removeFromFavorites(user.uid, teacher.id);
//         setIsFav(false);
//       } else {
//         await addToFavorites(user.uid, teacher.id);
//         setIsFav(true);
//       }
//     } catch (error) {
//       console.error("Failed to update favorites:", error);
//     }
//   };

//   return (
//     <article className={styles.teacherContainer}>
//       <div className={styles.avatarBox}>
//         <img
//           src={teacher.avatar_url}
//           alt={fullName}
//           className={styles.avatar}
//           loading="lazy"
//         />
//         <span className={styles.onlineDot} aria-hidden="true" />
//       </div>

//       <div className={styles.container}>
//         <div className={styles.box}>
//           <p className={styles.smallLabel}>Languages</p>

//           <div className={styles.metaRow}>
//             <div className={styles.metaInfo}>
//               <div className={styles.metaItem}>
//                 <span className={styles.bookIcons} aria-hidden="true">
//                   <svg className={styles.iconBook} width="16" height="16">
//                     <use href="/icons/sprite.svg#icon-book-open" />
//                   </svg>
//                 </span>
//                 <p className={styles.metaText}>Lessons online</p>
//               </div>

//               <svg
//                 className={styles.divider}
//                 width="1"
//                 height="16"
//                 aria-hidden="true"
//               >
//                 <use href="/icons/sprite.svg#icon-divider-vertical" />
//               </svg>

//               <p className={styles.metaText}>
//                 Lessons done: {teacher.lessons_done}
//               </p>

//               <svg
//                 className={styles.divider}
//                 width="1"
//                 height="16"
//                 aria-hidden="true"
//               >
//                 <use href="/icons/sprite.svg#icon-divider-vertical" />
//               </svg>

//               <div className={styles.metaItem}>
//                 <svg
//                   className={styles.iconStar}
//                   width="16"
//                   height="16"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons/sprite.svg#icon-star" />
//                 </svg>
//                 <p className={styles.metaText}>Rating: {teacher.rating}</p>
//               </div>

//               <svg
//                 className={styles.divider}
//                 width="1"
//                 height="16"
//                 aria-hidden="true"
//               >
//                 <use href="/icons/sprite.svg#icon-divider-vertical" />
//               </svg>

//               <p className={styles.metaText}>
//                 Price / 1 hour:&nbsp;
//                 <span className={styles.price}>{teacher.price_per_hour}$</span>
//               </p>
//             </div>

//             <button
//               type="button"
//               className={styles.favBtn}
//               onClick={toggleFavorite}
//               aria-label="Toggle favorite"
//               title="Toggle favorite"
//             >
//               <svg
//                 width="26"
//                 height="26"
//                 className={isFav ? styles.favorite : styles.heart}
//                 aria-hidden="true"
//               >
//                 <use href="/icons/sprite.svg#icon-heart" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <h2 className={styles.title}>{fullName}</h2>

//         <div className={styles.teacherInfoBox}>
//           <p>
//             Speaks:&nbsp;
//             <span className={styles.underline}>{speaksText}</span>
//           </p>
//           <p>
//             Lesson info:&nbsp;
//             <span>{teacher.lesson_info}</span>
//           </p>
//           <p>
//             Conditions:&nbsp;
//             <span>{conditionsText}</span>
//           </p>
//         </div>

//         {!expanded && (
//           <button
//             type="button"
//             className={styles.readMoreBtn}
//             onClick={() => setExpanded(true)}
//           >
//             Read more
//           </button>
//         )}

//         {expanded && (
//           <div className={styles.more}>
//             <p className={styles.experience}>{teacher.experience}</p>

//             {teacher.reviews?.length > 0 && (
//               <ul className={styles.reviewsList}>
//                 {teacher.reviews.map((r, idx) => (
//                   <li className={styles.review} key={`${teacher.id}-r-${idx}`}>
//                     <div className={styles.reviewHead}>
//                       <div
//                         className={styles.reviewerAvatar}
//                         aria-hidden="true"
//                       />
//                       <div>
//                         <p className={styles.reviewerName}>{r.reviewer_name}</p>
//                         <div className={styles.reviewRating}>
//                           <svg width="16" height="16" aria-hidden="true">
//                             <use href="/icons/sprite.svg#icon-star" />
//                           </svg>
//                           <span>{Number(r.reviewer_rating).toFixed(1)}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <p className={styles.reviewText}>{r.comment}</p>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         <ul className={styles.levelsList}>
//           {teacher.levels.map(lvl => {
//             const isActive = selectedLevel ? selectedLevel === lvl : false;
//             return (
//               <li
//                 key={`${teacher.id}-${lvl}`}
//                 className={`${styles.levelItem} ${isActive ? styles.activeLevel : ""}`}
//               >
//                 #{lvl}
//               </li>
//             );
//           })}
//         </ul>

//         {expanded && (
//           <div className={styles.btnBox}>
//             <button type="button" className={styles.bookBtn}>
//               Book trial lesson
//             </button>
//           </div>
//         )}
//       </div>
//     </article>
//   );
// }

import { useMemo, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

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

  // 1. Стежимо за станом авторизації
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Перевіряємо, чи вчитель в улюблених при завантаженні
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

  // 3. Функція перемикання сердечка
  const toggleFavorite = async () => {
    if (!user) {
      alert("Please log in to add teachers to your favorites!");
      return;
    }

    // Оптимістично оновлюємо UI для швидкості
    const previousFav = isFav;
    setIsFav(!previousFav);

    try {
      if (previousFav) {
        await removeFromFavorites(user.uid, teacher.id);
      } else {
        await addToFavorites(user.uid, teacher.id);
      }
    } catch (error) {
      // Якщо помилка — повертаємо старе значення
      setIsFav(previousFav);
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

            {/* ✅ КНОПКА СЕРДЕЧКА */}
            <button
              type="button"
              className={styles.favBtn}
              onClick={toggleFavorite}
              aria-label="Toggle favorite"
            >
              <svg
                width="26"
                height="26"
                /* Класи додаються саме на SVG, щоб працював твій SCSS */
                className={isFav ? styles.favorite : styles.heart}
              >
                <use href="/public/icons/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <h2 className={styles.title}>{fullName}</h2>

        <div className={styles.teacherInfoBox}>
          <p>
            Speaks:&nbsp;
            <span className={styles.underline}>{speaksText}</span>
          </p>
          <p>
            Lesson info:&nbsp;
            <span>{teacher.lesson_info}</span>
          </p>
          <p>
            Conditions:&nbsp;
            <span>{conditionsText}</span>
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
            <button type="button" className={styles.bookBtn}>
              Book trial lesson
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
