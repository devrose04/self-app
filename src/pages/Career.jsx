import React from "react";
import "../styles/career.scss";
import Arrow from "../images/arrow.svg";
import Clifton from "../images/clifton.png";
import TestInfo from "../components/TestInfo";
import GallupContent from "../content/GallupContent";
import {
  DISC_ASSESSMENT_URL,
  DISC_LEARN_MORE,
  GALLUP_ASSESSMENT_URL,
  GALLUP_LEARN_MORE,
  VIA_STRENGTHS_ASSESSMENT_URL,
  VIA_STRENGTHS_LEARN_MORE,
} from "../constants";
import VA from "../images/VA.png";
import DISC from "../images/disc.png";

import ViaCareerContent from "../content/ViaCareerContent";
import DISCContent from "../content/DISCContent";

const Career = () => {
  return (
    <div className="career">
      <div className="hero_career">
        <h1>
          Hoping to level up your career?
          <br />
          <br />
          We’re hoping to level up on this page too
        </h1>
        <h2>scroll below to see what we have</h2>
        <img src={Arrow} alt="" />
      </div>
      <TestInfo backgroundColor="#72A9B0" img={Clifton}>
        <GallupContent
          learnMore={GALLUP_LEARN_MORE}
          url={GALLUP_ASSESSMENT_URL}
          linkBackground="#B6DFE4"
        />
      </TestInfo>
      <TestInfo backgroundColor="#FFC1A2" img={VA}>
        <ViaCareerContent
          learnMore={VIA_STRENGTHS_LEARN_MORE}
          url={VIA_STRENGTHS_ASSESSMENT_URL}
          linkBackground="#DC8458"
        />
      </TestInfo>
      <TestInfo backgroundColor="#FFEAE0" img={DISC}>
        <DISCContent
          learnMore={DISC_LEARN_MORE}
          url={DISC_ASSESSMENT_URL}
          linkBackground="#E8BDAB"
        />
      </TestInfo>
    </div>
  );
};

export default Career;
