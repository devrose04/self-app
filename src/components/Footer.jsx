import React, { useEffect, useState } from "react";
import Logo from "../images/Logo.svg";
import Twitter from "../images/Twitter.png";
import Instagram from "../images/Ig.png";
import "../styles/footer.scss";
import SelfLogo from "../images/SelfWellness.png";
import InstaWellness from "../images/instagram.svg";
import TwitterWellness from "../images/twitter.svg";
import LinkedinWellness from "../images/linkedin.svg";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
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
    <div className={`footer ${isWellness ? "wellness" : ""}`}>
      <img src={isWellness ? SelfLogo : Logo} alt="logo self" />
      <div className="links">
        <Link to={"/about"}>ABOUT US</Link>
        {isWellness ? (
          <div>
            <Link>
              <img src={LinkedinWellness} alt="" />
            </Link>
            <Link>
              <img src={InstaWellness} alt="" />
            </Link>
            <Link>
              <img src={TwitterWellness} alt="" />
            </Link>
          </div>
        ) : (
          <div>
            <Link to="https://twitter.com/self_app">
              <img src={Twitter} alt="twitter" />
            </Link>
            <Link to="https://www.instagram.com/the_self_app/">
              <img src={Instagram} alt="instagram" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
