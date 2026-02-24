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

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        // Якщо displayName порожній (часто буває відразу після реєстрації),
        // робимо запит до Firebase для синхронізації даних
        if (!currentUser.displayName) {
          try {
            await currentUser.reload();
          } catch (error) {
            console.error("Error reloading user profile:", error);
          }
        }
        // Встановлюємо актуальний об'єкт користувача з auth.currentUser
        setUser(auth.currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
            {user && (
              <NavLink to="/favorites" className={linkClass}>
                Favorites
              </NavLink>
            )}
          </nav>

          <div className={styles.actions}>
            {user ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  {/* ✅ Виводимо ім'я, а якщо воно ще не завантажилось - 'User' */}
                  {user.displayName || "User"}
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

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          initialMode={authMode}
        />
      )}
    </>
  );
}
