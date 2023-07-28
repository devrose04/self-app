import React from "react";
import { Link } from "react-router-dom";
import "../styles/links.scss";

const Links = ({ url, background, learnMore }) => {
  return (
    <div className="links">
      <Link target="_blank" to={learnMore} className="learn_more">
        Learn More
      </Link>
      <Link
        target="_blank"
        style={{ backgroundColor: background }}
        className="take_quiz"
        to={url}
      >
        Take the Quiz
      </Link>
    </div>
  );
};

export default Links;
