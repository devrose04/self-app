import React from "react";
import { useState } from 'react';
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label, value, onChange }) => {

  const [checked, setChecked] = useState(value);

  const handleChange = (value)=>{
    setChecked(value);
    onChange(value)
  }
  
  return (
    <div className="contain">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" 
               name={label} id={label}  
               checked={checked}
               onChange={e => handleChange(e.target.checked)}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );

};
  
export default ToggleSwitch;