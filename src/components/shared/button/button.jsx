import React from 'react';

const Button = (props) => {
  const {text, classAddition} = props;
  const className = classAddition ? `button draw meet ${classAddition.join(' ')}` : 'button draw meet';

  return (
    <button className={className} {...props}>
      {text}
    </button>
  )
};

export default Button;
