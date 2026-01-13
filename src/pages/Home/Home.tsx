import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.title}>
            Unlock your potential with the best{" "}
            <span className={styles.underline}>language</span> tutors
          </h1>

          <p className={styles.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <Link to="/teachers" className={styles.cta}>
            Get started
          </Link>
        </div>

        {/* ✅ Правий блок як у Figma */}
        <div className={styles.heroRight}>
          <img
            src="/public/images/home-img.png"
            alt="LearnLingo hero"
            className={styles.heroImg}
          />
        </div>
      </section>

      {/* ✅ Статистика знизу — ПОВЕРНУЛИ, нічого не видаляємо */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>32,000+</span>
          <span className={styles.statLabel}>Experienced tutors</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statNumber}>300,000+</span>
          <span className={styles.statLabel}>5-star tutor reviews</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statNumber}>120+</span>
          <span className={styles.statLabel}>Subjects taught</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statNumber}>200+</span>
          <span className={styles.statLabel}>Tutor nationalities</span>
        </div>
      </section>
    </div>
  );
}
