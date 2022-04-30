import React from "react";
import PropTypes from "prop-types";

import { Navigate, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import About from "./pages/About";
import ScrollTop from "components/ScrollTop";
import { useSelector } from "react-redux";
import RegisterUser from "./pages/RegisterUser";

Auth.propTypes = {};

function Auth(props) {
  const { loggedIn, user } = useSelector(state => state.auth);
  return (
    <div className="auth">
      <ScrollTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/about" element={(loggedIn && user?.Quyen === "MANAGER") ? <About /> : <Navigate to={'/'} />} />
      </Routes>
    </div>
  );
}

export default Auth;
