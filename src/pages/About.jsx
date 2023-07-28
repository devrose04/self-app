import React from "react";
import Micah from "../images/micah.png";
import K2 from "../images/K2.svg";
import Reachout from "../images/reachout.svg";
import "../styles/about.scss";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about">
      <div className="about_hero">
        <div className="hero_text">
          <div className="text_container">
            <h2>Hi you!</h2>
            <h3>
              We’re so happy you are exploring your Self! and we love that you
              want to learn about us.
            </h3>
          </div>
        </div>
        <div className="gradient"></div>
      </div>
      <div className="team">
        <h3>Team</h3>
        <div className="team_images">
          <div className="person">
            <img src={Micah} alt="" />
            <span>Micah Friedland</span>
          </div>
          {/* <div className='person'>
                    <img src={Micah} alt="" />
                    <span>Micah Friedland</span>
                </div> */}
        </div>
      </div>
      <div className="why">
        <div className="text">
          <h3>Why we are building this?</h3>
          <p>
            We needed this. To help us understand ourselves, to help us in our
            personal and romantic relationships, and to push us in our career.{" "}
            <br />
            <br />
            So we assumed you might need this too. As you’d expect, we’re
            buildiing this for YOU.
            <br />
            <br />
            We are at the earliest stage of this, but we have high goals. We
            believe Self can be your go-to spot for your learning about
            yourself. Soon we will hope to use AI to understand your data better
            and be able to guide you through your highs and lows, provide
            suggestions
          </p>
        </div>
        <div className="shape"></div>
      </div>
      <div className="monochrome-color">
        <div className="content">
          <img src={K2} alt="" />
          <div className="text">
            <h3>Monochrome vs. Color</h3>
            <p>
              We know you are complex and no single assessment or description
              will encapsulate all of you. That’s why Self compiles a variety of
              quantitative and qualitative data about you for your self
              exploration. We put it all thee kaleidoscopic pieces together so
              that you have a clearer picture. And that’s also why we picked a
              colorful palette to express how rich and diverse you are..
              <br />
              <br />
              Our page is monochrome because we are here to focus on one thing:
              YOU.
            </p>
          </div>
        </div>
      </div>
      <div className="reach_out_us">
        <div className="text">
          <h3>Want to reach out to us? We also want you too.</h3>
          <p>
            We’d love to hear your thoughts, suggestions, and comments. Reach
            out to us on Twitter or Instagram, and if you need, via email as
            well.
          </p>
          <Link className="learn_more">Learn More</Link>
        </div>
        <img src={Reachout} alt="" />
      </div>
    </div>
  );
};

export default About;
