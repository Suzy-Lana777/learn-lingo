import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./HomeHeader.module.scss";
import AuthModal from "../AuthModal/AuthModal";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

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
          </nav>

          <div className={styles.actions}>
            {/* LOGIN */}
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

            {/* REGISTRATION */}
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
