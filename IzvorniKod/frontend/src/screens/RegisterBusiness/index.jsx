import React, {useState} from "react";
import axios from 'axios';

import Button from "../../components/common/Button";
import Header from "../../components/Header";
import Field from "../../components/common/Field";
import { api_url } from "../../App";

const RegisterBusiness = () => {

  const [error, setError] = useState("")
  const [isClicked, setIsClicked] = useState("")
  const [businessTypes, setBusinessTypes] = useState([])

  const [businessName, setBusinessName] = useState("");
  const [oib, setOib] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [businessTypeId, setBusinessTypeId] = useState("3");
  const [cardNumber, setCardNumber] = useState("");
  const [validTo, setValidTo] = useState("");
  const [cvc, setCvc] = useState("");

  const handleChange = (event) => {
    setBusinessTypeId(event.target.value)
  }

  const handleInputChange = (e, id) => {
    
    const {value} = e.target;
    
    if(id === "businessName"){
      setBusinessName(value);
    }
    if(id === "oib"){
      setOib(value);
    }
    if(id === "email"){
        setEmail(value);
    }
    if(id === "password"){
        setPassword(value);
    }
    if(id === "phoneNumber"){
        setPhoneNumber(value);
    }
    if(id === "bio"){
        setBio(value);
    }
    if(id === "businessTypeId"){
      setBusinessTypeId(value);
    }
    if(id === "cardNumber"){
      setCardNumber(value);
    }
    if(id === "validTo"){
      setValidTo(value);
    }
    if(id === "cvc"){
      setCvc(value);
    }
  }

  function handleClick() {
    //const errors = false;
    setIsClicked(true)
    var jsonData = 
        {
            "businessName": businessName,
            "oib": oib,
            "email": email,
            "password": password, 
            "phoneNumber": phoneNumber,
            "bio": bio,
            "businessTypeId": businessTypeId,
            "cardNumber": cardNumber,
            "validTo": validTo,
            "cvc": cvc
        }
    console.log(jsonData)
    
    axios.post(api_url + 'auth/sign-up/business', jsonData)
      .then(res => console.log(res.status))
      .catch(res => {
        setError(res.response.data)
      })

  }

  if(businessTypes.length === 0) {
    axios.get(api_url + 'business-type')
      .then(res => {
        let businessTypeOptions = []
        for(let bt of res.data) {
          businessTypeOptions.push(<option key={bt['businessTypeId']} value={bt['businessTypeId']}>{bt['businessType']}</option>)
        }
        setBusinessTypes(businessTypeOptions)
      })
      .catch(res => {
        console.log(res)
      })
  }
  

  return (
    <div>
      <Header></Header>
      <div className="forms">
      <h2>Registracija vlasnika obrta</h2>
        <div id="businessName" value={businessName} onChange = {(e) => handleInputChange(e, "businessName")}>
          <Field text="Ime obrta"></Field>
          {businessName.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>
        <div id="oib" value={oib} onChange = {(e) => handleInputChange(e, "oib")}>
          <Field text="OIB"></Field>
          {oib.length === 11 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>OIB mora biti dugačak 11 znakova</p>}
        </div>
        <div id="email" value={email} onChange = {(e) => handleInputChange(e, "email")}>
          <Field text="E-mail" type="email"></Field>
          {email.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>
        <div id="password" value={password} onChange = {(e) => handleInputChange(e, "password")}>
          <Field text="Lozinka" type="password"></Field>
          {password.length >= 6 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Lozinka mora imati barem 6 znakova</p>}
        </div>
        <div id="phoneNumber" value={phoneNumber} onChange = {(e) => handleInputChange(e, "phoneNumber")}>
          <Field text="Broj telefona"></Field>
          {phoneNumber.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>
        <div className="form" id="businessTypeId" value={businessTypeId} onChange = {(e) => handleInputChange(e, "businessTypeId")}>
            <label className="form">Tip obrta:</label>
            <br></br>
            <select value={businessTypeId} onChange={handleChange}>
              {businessTypes}
            </select>
        </div>
        <div id="cardNumber" value={cardNumber} onChange = {(e) => handleInputChange(e, "cardNumber")}>
          <Field text="Broj kartice"></Field>
          {cardNumber.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>
        <div id="cvc" value={cvc} onChange = {(e) => handleInputChange(e, "cvc")}>
          <Field text="CVV"></Field>
          {(cvc.length > 0) ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
        </div>

        <div id="validTo" value={validTo} onChange = {(e) => handleInputChange(e, "validTo")}>
          <Field text="Datum isteka kartice"></Field>
          {validTo.length > 0 ? '' : <p style={{color: "red", fontSize: "12px", margin: "3px"}}>Ovo polje je obavezno.</p>}
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

export default RegisterBusiness;
