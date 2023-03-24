import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import NearStore from "./pages/NearStore";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/nearstore" element={<NearStore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
