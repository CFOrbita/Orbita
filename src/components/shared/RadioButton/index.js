import React from 'react';
import './radio.css'

export const RadioButton = ({ checked, label, name, value, onChange}) => {
    return (
        <label className="container">
            { label }
            <input type="radio"
                   checked={checked}
                   name={name}
                   value={value}
                   onChange={onChange}/>
                <span className="radio-btn"/>
        </label>
    )
};
