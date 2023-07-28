import React from "react";
import "../styles/testsInfo.scss";

const TestInfo = ({ backgroundColor, img, children }) => {
  return (
    <div className="section-wrapper" style={{ backgroundColor }}>
      <div className="text">{children}</div>
      <img src={img} alt="" />
    </div>
  );
};

export default TestInfo;
