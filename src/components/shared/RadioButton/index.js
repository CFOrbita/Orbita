import React from 'react';
import './radio.css'

export const RadioButton = ({ checked, label, name, disabled, value, onChange }) => {
    return (
        <label className="container">
            { label }
            <input type="radio"
                   checked={checked}
                   name={name}
                   disabled={disabled}
                   value={value}
                   onChange={onChange}/>
                <span className="radio-btn"/>
        </label>
    )
};
