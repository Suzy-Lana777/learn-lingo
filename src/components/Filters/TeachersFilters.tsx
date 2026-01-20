import styles from "./TeachersFilters.module.scss";

type Filters = {
  language: string;
  level: string;
  price: string;
};

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
};

const LANGUAGES = [
  "English",
  "German",
  "Spanish",
  "Italian",
  "French",
  "Korean",
  "Mandarin Chinese",
  "Vietnamese",
];

const LEVELS = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];

const PRICES = ["", "10", "20", "30", "40"];

export default function TeachersFilters({ filters, onChange }: Props) {
  return (
    <div className={styles.filtersBox}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="languages">
          Languages
        </label>

        <div className={styles.selectWrap}>
          <select
            id="languages"
            className={`${styles.select} ${styles.selectLanguages}`}
            value={filters.language}
            onChange={e => onChange({ ...filters, language: e.target.value })}
          >
            <option value="">All</option>
            {LANGUAGES.map(l => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <svg
            className={styles.chevron}
            width="12"
            height="7"
            aria-hidden="true"
          >
            <use href="/icons/sprite.svg#icon-chevron-down" />
          </svg>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="level">
          Level of knowledge
        </label>

        <div className={styles.selectWrap}>
          <select
            id="level"
            className={`${styles.select} ${styles.selectLevel}`}
            value={filters.level}
            onChange={e => onChange({ ...filters, level: e.target.value })}
          >
            {LEVELS.map(lvl => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <svg
            className={styles.chevron}
            width="12"
            height="7"
            aria-hidden="true"
          >
            <use href="/icons/sprite.svg#icon-chevron-down" />
          </svg>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="price">
          Price
        </label>

        <div className={styles.selectWrap}>
          <select
            id="price"
            className={`${styles.select} ${styles.selectPrice}`}
            value={filters.price}
            onChange={e => onChange({ ...filters, price: e.target.value })}
          >
            <option value="">All</option>
            {PRICES.filter(Boolean).map(p => (
              <option key={p} value={p}>
                {p} $
              </option>
            ))}
          </select>

          <svg
            className={styles.chevron}
            width="12"
            height="7"
            aria-hidden="true"
          >
            <use href="/icons/sprite.svg#icon-chevron-down" />
          </svg>
        </div>
      </div>
    </div>
  );
}
