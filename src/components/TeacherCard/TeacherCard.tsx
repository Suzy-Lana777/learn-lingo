import styles from "./TeacherCard.module.scss";
import type { Teacher } from "../../types/teacher";

type TeacherCardProps = {
  teacher: Teacher;
};

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <article className={styles.card}>
      <img
        className={styles.avatar}
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
        width={96}
        height={96}
        loading="lazy"
      />

      <div className={styles.content}>
        <h3 className={styles.name}>
          {teacher.name} {teacher.surname}
        </h3>

        <p className={styles.meta}>
          <span>Rating: {teacher.rating}</span>
          <span>Price: {teacher.price_per_hour}$/hour</span>
        </p>

        <p className={styles.lang}>Languages: {teacher.languages.join(", ")}</p>
      </div>
    </article>
  );
}
