// import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import type { User } from "firebase/auth";

// import { auth } from "../../services/firebase";

// import styles from "./HomeHeader.module.scss";
// import AuthModal from "../AuthModal/AuthModal";

// const linkClass = ({ isActive }: { isActive: boolean }) =>
//   isActive ? `${styles.link} ${styles.active}` : styles.link;

// export default function Header() {
//   const [isAuthOpen, setIsAuthOpen] = useState(false);
//   const [authMode, setAuthMode] = useState<"login" | "register">("login");

//   // 🔹 Поточний користувач
//   const [user, setUser] = useState<User | null>(null);

//   // 🔹 Слідкуємо за станом авторизації
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   // 🔹 Logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.container}>
//           {/* LOGO */}
//           <NavLink to="/" className={styles.logo}>
//             <svg width="28" height="28" className={styles.logoIcon}>
//               <use href="/icons/sprite.svg#flag-ua" />
//             </svg>
//             <span className={styles.logoText}>LearnLingo</span>
//           </NavLink>

//           <nav className={styles.nav}>
//             <NavLink to="/" className={linkClass} end>
//               Home
//             </NavLink>

//             <NavLink to="/teachers" className={linkClass}>
//               Teachers
//             </NavLink>

//             {/* Favorites тільки для залогіненого */}
//             {user && (
//               <NavLink to="/favorites" className={linkClass}>
//                 Favorites
//               </NavLink>
//             )}
//           </nav>

//           <div className={styles.actions}>
//             {user ? (
//               /* 🔹 Якщо користувач увійшов */
//               <>
//                 <span className={styles.userName}>
//                   {user.displayName || user.email?.split("@")[0]}
//                 </span>

//                 <button
//                   type="button"
//                   className={styles.loginBtn}
//                   onClick={handleLogout}
//                 >
//                   <span className={styles.loginIconWrap}>
//                     <svg width="12" height="11">
//                       <use href="/icons/sprite.svg#icon-login-arrow" />
//                     </svg>
//                     <svg width="7" height="17">
//                       <use href="/icons/sprite.svg#icon-login-door" />
//                     </svg>
//                   </span>
//                   <span>Log out</span>
//                 </button>
//               </>
//             ) : (
//               /* 🔹 Якщо гість */
//               <>
//                 <button
//                   type="button"
//                   className={styles.loginBtn}
//                   onClick={() => {
//                     setAuthMode("login");
//                     setIsAuthOpen(true);
//                   }}
//                 >
//                   <span className={styles.loginIconWrap}>
//                     <svg width="12" height="11">
//                       <use href="/icons/sprite.svg#icon-login-arrow" />
//                     </svg>
//                     <svg width="7" height="17">
//                       <use href="/icons/sprite.svg#icon-login-door" />
//                     </svg>
//                   </span>
//                   <span>Log in</span>
//                 </button>

//                 <button
//                   type="button"
//                   className={styles.registerBtn}
//                   onClick={() => {
//                     setAuthMode("register");
//                     setIsAuthOpen(true);
//                   }}
//                 >
//                   Registration
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* МОДАЛКА */}
//       {isAuthOpen && (
//         <AuthModal
//           onClose={() => setIsAuthOpen(false)}
//           initialMode={authMode}
//         />
//       )}
//     </>
//   );
// }

import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "../../services/firebase";

import styles from "./HomeHeader.module.scss";
import AuthModal from "../AuthModal/AuthModal";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // 🔹 Поточний користувач
  const [user, setUser] = useState<User | null>(null);

  // 🔹 Слідкуємо за станом авторизації
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        // Якщо displayName ще не підтягнувся (після реєстрації), робимо reload
        if (!currentUser.displayName) {
          await currentUser.reload();
        }
        // ВАЖЛИВО: Передаємо копію об'єкта {...auth.currentUser},
        // щоб React "побачив" зміни і оновив ім'я на екрані
        setUser({ ...auth.currentUser } as User);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* LOGO */}
          <NavLink to="/" className={styles.logo}>
            <svg width="28" height="28" className={styles.logoIcon}>
              <use href="/icons/sprite.svg#flag-ua" />
            </svg>
            <span className={styles.logoText}>LearnLingo</span>
          </NavLink>

          <nav className={styles.nav}>
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>

            <NavLink to="/teachers" className={linkClass}>
              Teachers
            </NavLink>

            {/* Favorites тільки для залогіненого */}
            {user && (
              <NavLink to="/favorites" className={linkClass}>
                Favorites
              </NavLink>
            )}
          </nav>

          <div className={styles.actions}>
            {user ? (
              /* 🔹 Якщо користувач увійшов */
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  {/* Пріоритет на displayName */}
                  {user.displayName || user.email?.split("@")[0]}
                </span>

                <button
                  type="button"
                  className={styles.loginBtn}
                  onClick={handleLogout}
                >
                  <span className={styles.loginIconWrap}>
                    <svg width="12" height="11">
                      <use href="/icons/sprite.svg#icon-login-arrow" />
                    </svg>
                    <svg width="7" height="17">
                      <use href="/icons/sprite.svg#icon-login-door" />
                    </svg>
                  </span>
                  <span>Log out</span>
                </button>
              </div>
            ) : (
              /* 🔹 Якщо гість */
              <>
                <button
                  type="button"
                  className={styles.loginBtn}
                  onClick={() => {
                    setAuthMode("login");
                    setIsAuthOpen(true);
                  }}
                >
                  <span className={styles.loginIconWrap}>
                    <svg width="12" height="11">
                      <use href="/icons/sprite.svg#icon-login-arrow" />
                    </svg>
                    <svg width="7" height="17">
                      <use href="/icons/sprite.svg#icon-login-door" />
                    </svg>
                  </span>
                  <span>Log in</span>
                </button>

                <button
                  type="button"
                  className={styles.registerBtn}
                  onClick={() => {
                    setAuthMode("register");
                    setIsAuthOpen(true);
                  }}
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* МОДАЛКА */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          initialMode={authMode}
        />
      )}
    </>
  );
}
