// import { Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import HomeLayout from "./components/Layout/HomeLayout";
// import AppLayout from "./components/Layout/AppLayout";

// import Home from "./pages/Home/Home";
// import Teachers from "./pages/Teachers/Teachers";
// import Favorites from "./pages/Favorites/Favorites";

// export default function App() {
//   return (
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             borderRadius: "12px",
//             color: "#fff",
//           },
//           success: {
//             style: {
//               background: "#388e3c",
//             },
//           },
//           error: {
//             style: {
//               background: "#d32f2f",
//             },
//           },
//         }}
//       />

//       <Routes>
//         {/* HOME (hero header) */}
//         <Route element={<HomeLayout />}>
//           <Route path="/" element={<Home />} />
//         </Route>

//         {/* APP pages (compact header) */}
//         <Route element={<AppLayout />}>
//           <Route path="/teachers" element={<Teachers />} />
//           <Route path="/favorites" element={<Favorites />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Використовуємо один лейаут для всього додатка
import MainLayout from "./components/Layout/HomeLayout";

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
        {/* Огортаємо ВСІ маршрути одним лейаутом з хедером */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>

        {/* Редирект, якщо користувач ввів неіснуючу адресу */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
