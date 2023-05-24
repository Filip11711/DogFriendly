import React from "react";

const Field = ({ text , type}) => {
  return (
    <div className="form">
      <label>{text}:</label>
      <br />
      <input type={type}/>
    </div>
  );
};

export default Field;
