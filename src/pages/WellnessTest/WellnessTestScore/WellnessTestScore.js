import React from "react";
import "./WellnessTestScore.css";
import Button from "../../../components/Button";
import {useLocation, Link } from "react-router-dom";

const WellnessTestScore = ({ result, selectedFormData }) => {
  const className = "WellnessTestScore";
  const targets = {
    Dashboard: "/wellness/dashboard",
    Checkin: "/wellness/check-in",
  };
  const { state: { from } } = useLocation();
  const target = targets[from] ?? "/wellness/dashboard";


  return (
    <div className={className}>
      <div className={`${className}-scoreContainer`}>
        <div>
          <div className={`${className}-scoreResultContainer`}>
            <div className={`${className}-scoreResultProgressBackground`} />
            <div className={`${className}-scoreResultProgressValue`}>
              {result.score}
            </div>
          </div>
        </div>
        {selectedFormData.labels && (
          <div>
            <ul className={`${className}-scoreLabelsList`}>
              {selectedFormData.labels.map((label) => (
                <li
                  key={`label-${label.range}`}
                  className={`${className}-scoreLabelsListItem`}
                >
                  <div className={`${className}-scoreLabelTitle`}>
                    {label.range}
                  </div>
                  <div>{label.description}</div>
                </li>
              ))}
              <div>
                Notes about score: <br /> {selectedFormData.scoreNotes}
              </div>
            </ul>
          </div>
        )}
      </div>
      <div className={`${className}-buttonContainer`}>
        <Link to = { target }>
          <Button buttonType="primary">
        { (targets[from] === "/wellness/dashboard") ?  "Go to Dashboard" : "Return to Check-in"}
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default WellnessTestScore;
