import { NavLink } from "react-router-dom";
import styles from "./AppHeader.module.scss";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          LearnLingo
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/teachers" className={linkClass}>
            Teachers
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favorites
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.loginBtn}>
            Log in
          </button>
          <button type="button" className={styles.registerBtn}>
            Registration
          </button>
        </div>
      </div>
    </header>
  );
}
