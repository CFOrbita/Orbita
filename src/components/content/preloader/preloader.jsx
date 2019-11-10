import React from 'react';
import Backdrop from "../../header/backdrop/Backdrop";

const Preloader = () => {
  return (
    <div className="preloader">
      <Backdrop/>
      <div className="planet"/>
    </div>
  )
};

export default Preloader;
