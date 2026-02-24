import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./components/Layout/HomeLayout";
import AppLayout from "./components/Layout/AppLayout";

import Home from "./pages/Home/Home";
import Teachers from "./pages/Teachers/Teachers";
import Favorites from "./pages/Favorites/Favorites";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            color: "#fff",
          },
          success: {
            style: {
              background: "#388e3c",
            },
          },
          error: {
            style: {
              background: "#d32f2f",
            },
          },
        }}
      />

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
    </>
  );
}
