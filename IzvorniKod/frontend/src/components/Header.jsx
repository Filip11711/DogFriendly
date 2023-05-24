import React from 'react'
import {useNavigate} from 'react-router-dom';

import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Header = () => {

  var token = localStorage.getItem("token");

  const navigate = useNavigate();

  const button1 = () => {
    if(token) {
      localStorage.removeItem("token");
      navigate('/')
      window.location.reload(false)
    }
    else 
      navigate('/login')
  };

  const button2 = () => {
    if(token)
      navigate('/profile')
    else 
      navigate('/register')
  };

  const button3 = () => {
    navigate('/')
  };

  return (
    <div className="header">
      <div className="container-left">
        <div onClick={button3}>
          <Button color="rgb(28, 186, 28)" text="DOG FRIENDLY"></Button>
        </div>
        <Input />
      </div>
      <div className="container-right">
        <div onClick={button1}>
          <Button color="rgb(28, 186, 28)" text={token ? "LOG OUT" : "LOG IN"} deco="underline" />
        </div>
        <div onClick={button2}>
          <Button color="white" text={token ? "PROFILE" : "CREATE ACCOUNT"} />
        </div>
      </div>
    </div>
  );
};

export default Header;
