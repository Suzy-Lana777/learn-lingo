import { Outlet } from "react-router-dom";
import AppHeader from "../Header/AppHeader";
import styles from "./AppLayout.module.scss";

export default function AppLayout() {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
