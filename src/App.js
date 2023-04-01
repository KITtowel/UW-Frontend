import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import { StoreMap } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/storeMap" element={<StoreMap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
