import React from 'react'

const Input = (props) => {
  const {placeholder, classAddition} = props;
  const className = classAddition ? `input ${classAddition.join(' ')}` : 'input';
  return (
    <div className="input-container">
      <input className={className}
             type="text"
             placeholder={placeholder}
             {...props}/>
      <span className="focus-border"/>
    </div>
  )
};

export default Input;
