import React from "react";
import "../styles/comingsoon.scss";
import ComingSoon1 from "../images/comingsoon1.png";
import ComingSoon2 from "../images/comingsoon2.png";
import ComingSoon3 from "../images/comingsoon3.png";

const ComingSoon = () => {
  return (
    <div className="coming_soon">
      <div className="container">
        <img src={ComingSoon1} alt="holistic view" />
      </div>
      <div className="container">
        <img src={ComingSoon2} alt="holistic view" />
      </div>
      <div className="container">
        <img src={ComingSoon3} alt="holistic view" />
      </div>
    </div>
  );
};

export default ComingSoon;
