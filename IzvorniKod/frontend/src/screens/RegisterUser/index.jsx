import React, {useState} from "react";
import axios from 'axios';

import Button from "../../components/common/Button";
import Header from "../../components/Header";
import Field from "../../components/common/Field";
import { api_url } from "../../App";

const RegisterUser = () => {

  const [error, setError] = useState("")
  const [isClicked, setIsClicked] = useState("")

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleInputChange = (e, id) => {
    
    const {value} = e.target;
    if(id === "firstName"){
        setFirstName(value);
    }
    if(id === "lastName"){
        setLastName(value);
    }
    if(id === "email"){
        setEmail(value);
    }
    if(id === "password"){
        setPassword(value);
    }
    if(id === "username"){
        setUsername(value);
    }
    if(id === "bio"){
        setBio(value);
    }
  }

  function handleClick() {
    //const errors = false;
    setIsClicked(true)
    var jsonData = 
        {
            "email": email,
            "password": password,
            "username": username,
            "firstName": firstName, 
            "lastName": lastName,
            "bio": bio
        }
    console.log(jsonData)
    
    axios.post(api_url + 'auth/sign-up/user', jsonData)
      .then(res => console.log(res.status))
      .catch(res => {
        setError(res.response.data)
      })

  }

  return (
    <div>
      <Header></Header>
      <div className="forms">
      <h2>Registracija osnovnog korisnika</h2>
        <div id="firstname" value={firstName} onChange = {(e) => handleInputChange(e, "firstName")}>
          <Field text="Ime" type="text" ></Field>
          {firstName.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>
        <div id="lastname" value={lastName} onChange = {(e) => handleInputChange(e, "lastName")}>
          <Field text="Prezime" type="text"></Field>
          {lastName.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>
        <div id="username" value={username} onChange = {(e) => handleInputChange(e, "username")}>
          <Field text="Korisničko Ime" type="text" ></Field>
          {username.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>
        <div id="email" value={email} onChange = {(e) => handleInputChange(e, "email")}>
          <Field text="E-mail" type="email"></Field>
          {email.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>
        <div id="password" value={password} onChange = {(e) => handleInputChange(e, "password")}>
        <Field text="Lozinka" type="password"></Field>
        {password.length >= 6 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Lozinka mora imati barem 6 znakova</p>}
        </div>
        <div id="bio" value={bio} onChange = {(e) => handleInputChange(e, "bio")}>
          <label>Bio:<br/>
            <textarea text="Opis"></textarea>
          </label>
        </div>
        <div onClick={()=>handleClick()}>
          <Button color="rgb(28, 186, 28)" text="Submit"></Button>
        </div>

        {(error === "" && isClicked) ? (
            <div>
                <p>Registracija je uspješna! Molimo Vas da potvrdite svoj račun na mailu.</p> 
            </div> 
        ) : (
          <div>
              <p style={{color: "red"}}>{error}</p> 
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterUser;
