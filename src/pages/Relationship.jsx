import React from "react";
import "../styles/relationship.scss";
import Arrow from "../images/arrow.svg";
import TestInfo from "../components/TestInfo";
import LoveLanguagesContent from "../content/LoveLanguagesContent";
import {
  ATTACHMENT_STYLE_ASSESSMENT_URL,
  ATTACHMENT_STYLE_LEARN_MORE,
  FLIRTING_STYLE_ASSESSMENT_URL,
  FLIRTING_STYLE_LEARN_MORE,
  FTI_ASSESSMENT_URL,
  FTI_LEARN_MORE,
  LOVE_LANGUAGES_LEARN_MORE,
  LOVE_LANGUAGES_URL,
} from "../constants";
import Love from "../images/love.png";
import Attachment from "../images/attachment.png";
import FTI from "../images/fti.png";
import FlirtingStyle from "../images/flirtingstyles.png";
import AttachmentStylesContent from "../content/AttachmentStylesContent";
import FTIContent from "../content/FTIContent";
import Testimonials from "../components/Testimonials";
import FlirtingStyleContent from "../content/FlirtingStyleContent";

const Relationship = () => {
  return (
    <div className="relationship">
      <div className="hero_relationship">
        <h1>
          Just like aLL relationships are WORKS IN PROGRESS
          <br />
          <br />
          <br />
          <br />
          so it this page.
        </h1>
        <h2>scroll below to see what we have</h2>
        <img src={Arrow} alt="" />
      </div>
      <TestInfo backgroundColor="#FFEAE0" img={Love}>
        <LoveLanguagesContent
          learnMore={LOVE_LANGUAGES_LEARN_MORE}
          url={LOVE_LANGUAGES_URL}
          linkBackground="#E8BDAB"
        />
      </TestInfo>
      <TestInfo backgroundColor="#FFC1A2" img={Attachment}>
        <AttachmentStylesContent
          learnMore={ATTACHMENT_STYLE_LEARN_MORE}
          url={ATTACHMENT_STYLE_ASSESSMENT_URL}
          linkBackground="#C5967E"
        />
      </TestInfo>
      <TestInfo backgroundColor="#F9D290" img={FlirtingStyle}>
        <FlirtingStyleContent
          learnMore={FLIRTING_STYLE_LEARN_MORE}
          url={FLIRTING_STYLE_ASSESSMENT_URL}
          linkBackground="#D09B41"
          color="#000000"
        />
      </TestInfo>
      <TestInfo backgroundColor="#053B47" img={FTI}>
        <FTIContent
          learnMore={FTI_LEARN_MORE}
          url={FTI_ASSESSMENT_URL}
          linkBackground="#72A9B0"
          color="#ffffff"
        />
      </TestInfo>
      <Testimonials />
    </div>
  );
};

export default Relationship;
