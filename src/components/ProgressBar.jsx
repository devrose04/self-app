import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/progressBar.scss";

const ProgressBar = ({ percentage }) => {
  const location = useLocation();
  const [isWellness, setIsWellness] = useState(
    location.pathname.includes("wellness") ? true : false
  );

  useEffect(() => {
    if (location.pathname.includes("wellness")) {
      setIsWellness(true);
    } else {
      setIsWellness(false);
    }
  }, [location]);

  return (
    <div className="progress_bar">
      <div className={"popup-message"}>The Progress Bar increases as you take more assessments. You reach 100% when you've taken at least one assessment in each category below per quarter.</div>
      <div
        style={{ width: `${percentage}%` }}
        className="bar"
      >
      </div>
      <span>{percentage}%</span>
    </div>
  );
};

export default ProgressBar;
