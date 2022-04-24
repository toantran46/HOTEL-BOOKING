import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/style.scss";
import AdminLayout from "features/Admin/pages/Layout";
import UserPage from "features/Admin/pages/Users";
import HotelPage from "features/Admin/pages/Hotel";

const HoTel = React.lazy(() => import("./features/Hotel/index.jsx"));
const Auth = React.lazy(() => import("./features/Auth/index.jsx"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route index path="/*" element={<HoTel />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<div>dashboard</div>} />
              <Route path="users" element={<UserPage />} />
              <Route path="hotels" element={<HotelPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div >
  );
}

export default App;
