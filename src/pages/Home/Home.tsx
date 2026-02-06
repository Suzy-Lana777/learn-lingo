// import { Link } from "react-router-dom";
// import styles from "./Home.module.scss";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <div className={styles.container}>
//         {/* HERO */}
//         <section className={styles.hero}>
//           <div className={styles.heroLeft}>
//             <h1 className={styles.title}>
//               Unlock your potential with the best{" "}
//               <span className={styles.language}>language</span> tutors
//             </h1>

//             <p className={styles.text}>
//               Embark on an exciting language journey with expert language
//               tutors. Elevate your language proficiency to new heights by
//               connecting with highly qualified and experienced tutors.
//             </p>

//             <Link to="/teachers" className={styles.cta}>
//               Get started
//             </Link>
//           </div>

//           <div className={styles.heroRight}>
//             <img
//               src="/images/home-img.png"
//               alt="LearnLingo hero"
//               className={styles.heroImg}
//             />
//           </div>
//         </section>

//         {/* STATS */}
//         <section className={styles.stats}>
//           <div className={styles.statItem}>
//             <span className={styles.statNumber}>32,000+</span>
//             <span className={styles.statLabel}>Experienced tutors</span>
//           </div>

//           <div className={styles.statItem}>
//             <span className={styles.statNumber}>300,000+</span>
//             <span className={styles.statLabel}>5-star tutor reviews</span>
//           </div>

//           <div className={styles.statItem}>
//             <span className={styles.statNumber}>120+</span>
//             <span className={styles.statLabel}>Subjects taught</span>
//           </div>

//           <div className={styles.statItem}>
//             <span className={styles.statNumber}>200+</span>
//             <span className={styles.statLabel}>Tutor nationalities</span>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <h1 className={styles.title}>
              Unlock your potential with the best{" "}
              <span className={styles.language}>language</span> tutors
            </h1>

            <p className={styles.text}>
              Embark on an exciting language journey with expert language
              tutors. Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            <Link to="/teachers" className={styles.cta}>
              Get started
            </Link>
          </div>

          <div className={styles.heroRight}>
            {/* Картинка з дівчиною (емодзі) */}
            <img
              src="/images/home-img.png"
              alt="Language tutor emoji"
              className={styles.heroImg}
            />
            {/* Твоя нова іконка Apple (Mac) під нею */}
            <svg className={styles.appleIcon} width="391" height="304">
              <use href="/public/icons/sprite.svg#icon-logo-apple"></use>
            </svg>
          </div>
        </section>

        {/* STATS */}
        <section className={styles.stats}>
          {/* SVG пунктирна рамка */}
          <svg
            className={styles.statsBorder}
            viewBox="0 0 1312 116"
            preserveAspectRatio="none"
          >
            <rect x="1" y="1" width="1310" height="114" rx="30" ry="30" />
          </svg>

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
    </div>
  );
}
