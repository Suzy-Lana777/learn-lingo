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
      {/* Toaster буде "слухати" виклики toast.success/error з будь-якого компонента */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#121417",
            color: "#fff",
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
