import { Outlet } from "react-router-dom";
import HomeHeader from "../Header/HomeHeader";

export default function HomeLayout() {
  return (
    <>
      <HomeHeader />
      <Outlet />
    </>
  );
}
