import React from "react";
import {
  BIG_FIVE_ASSESSMENT_URL,
  BIG_FIVE_LEARN_MORE,
  ENNEAGRAM_ASSESSMENT_URL,
  ENNEAGRAM_LEARN_MORE,
  EQ_LEARN_MORE,
  GRIT_ASSESSMENT_URL,
  GRIT_LEARN_MORE,
  IQ_LEARN_MORE,
  MBTI_ASSESSMENT_URL,
  MBTI_LEARN_MORE,
  MINDSET_ASSESSMENT_URL,
  MINDSET_LEARN_MORE,
  ZODIAC,
  ZODIAC_LEARN_MORE,
} from "../constants";
import Arrow from "../images/arrow.svg";
import Bigfive from "../images/bigfive.png";
import MBTI from "../images/mbti.png";
import Enneagram from "../images/enneagram.png";
import Mindset from "../images/mindset.png";
import Grit from "../images/grit.png";
import Zodiac from "../images/zodiac.png";
import IQ from "../images/iq.png";
import EQ from "../images/eq.png";
import Testimonials from "../components/Testimonials.jsx";
import "../styles/personal.scss";
import TestInfo from "../components/TestInfo.jsx";
import BigfiveContent from "../content/BigfiveContent";
import MBTIContent from "../content/MBTIContent";
import EnneagramContent from "../content/EnneagramContent";
import MindsetContent from "../content/MindsetContent";
import GritContent from "../content/GritContent";
import IQContent from "../content/IQContent";
import EQContent from "../content/EQContent";
import ZodiacContent from "../content/ZodiacContent";
import {
  ASTROLOGY_ASSESSMENT_URL,
  EQ_ASSESSMENT_URL,
  IQ_ASSESSMENT_URL,
} from "../constants/assessments-urls";

const Personal = () => {
  return (
    <div className="personal">
      <div className="hero_personal">
        <h1>
          We know you’re working on yourself
          <br />
          <br />
          and so are we. this page isn’t 100% complete yet
        </h1>
        <h2>scroll below to see what we have</h2>
        <img src={Arrow} alt="" />
        <div className="tests">
          <div className="col">
            <h3>Personality</h3>
            <span>
              Myers-Briggs Type Indicator (MBTI) <br />
              Big Five Assessment <br />
              Enneagram <br />
              Deep Horoscope
            </span>
          </div>
          <div className="col">
            <h3>Intelligence</h3>
            <span>
              IQ <br />
              EQ (Emotional Intelligence) <br />
              SQ (Social Intelligence) <br />
              AQ (Adversity) <br />
              The “Q” stands for “Quotient”
            </span>
          </div>
          <div className="col">
            <h3>Psychological</h3>
            <span>Self-Concept</span>
          </div>
        </div>
      </div>
      <TestInfo backgroundColor="#FFEAE0" img={Bigfive}>
        <BigfiveContent
          learnMore={BIG_FIVE_LEARN_MORE}
          url={BIG_FIVE_ASSESSMENT_URL}
          linkBackground="#E8BDAB"
        />
      </TestInfo>
      <TestInfo backgroundColor="#FFC1A2" img={MBTI}>
        <MBTIContent
          learnMore={MBTI_LEARN_MORE}
          url={MBTI_ASSESSMENT_URL}
          linkBackground="#C5967E"
          background="#000000"
        />
      </TestInfo>
      <TestInfo backgroundColor="#F9D290" img={Enneagram}>
        <EnneagramContent
          learnMore={ENNEAGRAM_LEARN_MORE}
          url={ENNEAGRAM_ASSESSMENT_URL}
          linkBackground="#D09B41"
          background="#000000"
        />
      </TestInfo>
      <TestInfo img={Mindset}>
        <MindsetContent
          learnMore={MINDSET_LEARN_MORE}
          url={MINDSET_ASSESSMENT_URL}
          linkBackground="#CFC1B6"
          background="#000000"
        />
      </TestInfo>
      <TestInfo backgroundColor="#72A9B0" img={Grit}>
        <GritContent
          learnMore={GRIT_LEARN_MORE}
          url={GRIT_ASSESSMENT_URL}
          linkBackground="#B6DFE4"
          background="#000000"
        />
      </TestInfo>
      <TestInfo img={Zodiac} backgroundColor="#ffffff">
        <ZodiacContent
          learnMore={ZODIAC_LEARN_MORE}
          url={ASTROLOGY_ASSESSMENT_URL}
          linkBackground="#053B47"
          background="#000000"
        />
      </TestInfo>
      <TestInfo img={IQ} backgroundColor="#FFEAE0">
        <IQContent
          learnMore={IQ_LEARN_MORE}
          url={IQ_ASSESSMENT_URL}
          linkBackground="#E8BDAB"
          background="#000000"
        />
      </TestInfo>
      <TestInfo img={EQ} backgroundColor="#053B47">
        <EQContent
          learnMore={EQ_LEARN_MORE}
          url={EQ_ASSESSMENT_URL}
          linkBackground="#8FBFCA"
          color="#ffffff"
        />
      </TestInfo>
      <Testimonials />
    </div>
  );
};

export default Personal;
