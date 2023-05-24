import React, {useState} from "react";
import axios from 'axios';

import Header from "./Header";
import Field from "./common/Field";
import Button from "./common/Button";
import { api_url } from "../App";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    
    const setAuthToken = (token) => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
          delete axios.defaults.headers.common["Authorization"];
    }
    
    const handleInputChange = (e, id) => {
        
        const {value} = e.target;
        
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    function handleClick() {

        var jsonData = 
            {
                "email": email,
                "password": password
            }
        console.log(jsonData)
        
        axios.post(api_url + 'auth/sign-in', jsonData)
        .then(response => {
        //get token from response
        const token  =  response.data.token;

        //set JWT token to local
        localStorage.setItem("token", token);


        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = '/'
        })
        .catch(res => {
           console.log(res);
            setError(true);
        })

  }

  return (<div>
    <Header></Header>
    <div className="forms">
      <h2>Prijava korisnika</h2>
      <div id="email" value={email} onChange = {(e) => handleInputChange(e, "email")}>
        <Field text="E-mail" type="email"></Field>
      </div>
      <div id="password" value={password} onChange = {(e) => handleInputChange(e, "password")}>
        <Field text="Lozinka" type="password"></Field>
      </div>
      <div onClick={()=>handleClick()}>
        <Button color="rgb(28, 186, 28)" text="Submit"></Button>
      </div>
      {error && (
        <div>
            <p style={{color: "red", fontSize: "15px", margin: "3px"}}>Pogrešan e-mail ili lozinka</p> 
       </div> 
      )}
    </div>
  </div>);
};

export default LoginForm;
