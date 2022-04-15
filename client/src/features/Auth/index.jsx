import React from "react";
import PropTypes from "prop-types";

import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import About from "./pages/About";
import ScrollTop from "components/ScrollTop";

Auth.propTypes = {};

function Auth(props) {
  return (
    <div className="auth">
      <ScrollTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default Auth;
