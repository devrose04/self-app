import React from "react";
import { Link } from "react-router-dom";
import "../styles/discoverHome.scss";
import ShadowImg from "../images/shadow.png";
import LearnPersonality from "../images/learnpersonality.png";
import LearnRelationship from "../images/learn-relationship.png";
import CareerStrengths from "../images/learn_career_strengths.png";
import Testimonials from "../components/Testimonials.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

const DiscoverHome = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Self</h1>
        <div className="bottom_hero">
          <div className="left">
            <h2>Where you come to know yourself and grow.</h2>
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to={user ? "/discover/dashboard" : "/discover/signup"}
              className="signup"
            >
              {user ? "See your dashboard" : "Sign Up"}
            </Link>
          </div>
          <div className="right">
            <h2>helping you flourish</h2>
          </div>
        </div>
      </div>
      <div className="holistic-view">
        <div className="container">
          <div className="left">
            <h2>A complete, holistic view of yourself</h2>
            <p>
              Take assessments or play games while learning about your
              personality, relationships styles, and career strengths.
              <br />
              <br />
              With everything in one place, we combine psychometric analysis and
              qualitative analysis with AI to help you understand your
              strengths, weaknesses, and everything else.
              <br />
              <br />
              Keep track over time and see where you’ve changed and how your
              skills have developed.
            </p>
          </div>
          <div className="right">
            <img src={ShadowImg} alt="holistic view" />
          </div>
        </div>
        <Link
          onClick={() => window.scrollTo(0, 0)}
          to={user ? "/dashboard" : "/discover/signup"}
          className="join_now"
        >
          {user ? "See your dashboard" : "Sign Up"}
        </Link>
      </div>
      <div className="learn_personality">
        <div className="container">
          <div className="left">
            <h2>Learn Your Personality</h2>
            <p>
              All growth and understanding starts with the Self.
              <br />
              <br />
              We invite you to dive in and learn all about yourself.
              <br />
              <br />
              We provide various assessments to offer a glimpse into your
              personality, your tendencies and intelligences, and your strengths
              and weaknesses.
            </p>
          </div>
        </div>
        <img src={LearnPersonality} alt="holistic view" />
        <Link
          onClick={() => window.scrollTo(0, 0)}
          to="/personal"
          className="learn_more"
        >
          Learn More
        </Link>
      </div>
      <div className="learn_relationship">
        <img src={LearnRelationship} alt="Learn your relationship" />
        <div className="right">
          <h2>Learn Your Relationship Styles</h2>
          <p>
            From flirting and attachment styles, to love languages and prevalent
            hormone, understanding yourself is essential to a healthy
            relationship.
          </p>
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to="/relationship"
            className="learn_more"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="learn_strengths">
        <div className="left">
          <h2>Learn Your Career Strengths</h2>
          <p>
            Want to find the perfect career?
            <br />
            <br />
            Combine your strengths from the Gallup Strength Assessment with your
            passions from the Career Explorer.
          </p>
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to="/career"
            className="learn_more"
          >
            Learn More
          </Link>
        </div>
        <img src={CareerStrengths} alt="Learn your Career Strengths" />
      </div>
      <div className="assessments_offered">
        <p>
          Self offers you a home for all of your learnings, from your Big Five
          personality to your MBTI and Enneagram, learning your love languages
          and attachment styles, and monitoring your wellness with self
          assessments,
        </p>
      </div>
      <Testimonials />
    </div>
  );
};

export default DiscoverHome;
