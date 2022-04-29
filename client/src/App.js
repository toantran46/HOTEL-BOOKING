import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/style.scss";
import AdminLayout from "features/Admin/pages/Layout";
import UserPage from "features/Admin/pages/Users";
import HotelPage from "features/Admin/pages/Hotel";
import BookingPage from "features/Admin/pages/Booking";
import RoomPage from "features/Admin/pages/Room";
import CityPage from "features/Admin/pages/City";
import ConvenientPage from "features/Admin/pages/Convenient";
import PaymentPage from "features/Admin/pages/Payment";
import { useSelector } from "react-redux";
import Toast from "components/Toast";
import TypesPage from "features/Admin/pages/Types";

const HoTel = React.lazy(() => import("./features/Hotel/index.jsx"));
const Auth = React.lazy(() => import("./features/Auth/index.jsx"));

function App() {
  const { user, loggedIn } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route index path="/*" element={<HoTel />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route
              path="/admin"
              element={
                loggedIn && user?.Quyen !== "USER" ? (
                  <AdminLayout />
                ) : (
                  <Navigate to="/auth/sign-in" />
                )
              }
            >
              <Route index element={<div>dashboard</div>} />
              <Route path="users" element={<UserPage />} />
              <Route path="hotels" element={<HotelPage />} />
              <Route path="bookings" element={<BookingPage />} />
              <Route path="rooms" element={<RoomPage />} />
              <Route path="cities" element={<CityPage />} />
              <Route path="convenients" element={<ConvenientPage />} />
              <Route path="payments" element={<PaymentPage />} />
              <Route path="others" element={<TypesPage />} />
            </Route>
          </Routes>
          <Toast />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
