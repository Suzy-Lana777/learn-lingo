import { Route, Routes } from "react-router-dom";

import HomeLayout from "./components/Layout/HomeLayout";
import AppLayout from "./components/Layout/AppLayout";

import Home from "./pages/Home/Home";
import Teachers from "./pages/Teachers/Teachers";
import Favorites from "./pages/Favorites/Favorites";

export default function App() {
  return (
    <Routes>
      {/* HOME (hero header) */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* APP pages (compact header) */}
      <Route element={<AppLayout />}>
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}
