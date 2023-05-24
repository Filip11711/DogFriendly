import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import HomePage from "./screens/HomePage";
import ProfileInfo from './screens/ProfileInfo';
import Register from "./screens/Register";
import Login from "./screens/Login";
import RegisterUser from "./screens/RegisterUser";
import RegisterBusiness from "./screens/RegisterBusiness";
import ConfirmAccount from './screens/ConfirmAccount';

export const api_url = "http://dog-friendly.me/api/";

const App = () => {

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
      delete axios.defaults.headers.common["Authorization"];
  }

  const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}/>
          <Route path="/profile" element={<ProfileInfo/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/business" element={<RegisterBusiness />} />
          <Route path="/confirm" element={<ConfirmAccount />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
