import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";

const RegisterForm = () => {
  const navigate = useNavigate();

  const button1 = () => {
    navigate("/register/user");
  };

  const button2 = () => {
    navigate("/register/business");
  };

  return (
    <div>
      <h2>Kako se želite registrirati?</h2>
      <div className="reg-form">
        <div className="reg-btn" onClick={button1}>
          <Button text={"Osnovni korisnik"} color="rgb(28, 186, 28)" />
        </div>
        <div className="reg-btn" onClick={button2}>
          <Button text={"Vlasnik obrta"} color="rgb(28, 186, 28)" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
