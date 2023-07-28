import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.svg";
import SelfLogo from "../images/SelfWellness.png";
import "../styles/navbar.scss";
import { logout } from "../utils";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const location = useLocation();
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const [isWellness, setIsWellness] = useState(
    location.pathname.includes("wellness") ? true : false
  );

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT
      },
      'google_translate_element'
    );
  };

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    return () => {
      document.body.removeChild(addScript);
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes("wellness")) {
      setIsWellness(true);
    } else {
      setIsWellness(false);
    }
  }, [location]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      }
      if (!user) {
        setAuthUser(null);
      }
    });
  }, []);

  return (
    <nav className={`navbar ${isWellness ? "wellness" : ""}`}>
      <ul>
        <Link to={isWellness ? "/wellness" : "/discover"}>
          <img src={isWellness ? SelfLogo : Logo} alt="logo self" />
          {isWellness && (
            <span style={{ marginLeft: 20 }}>
              Your Digital Mental Health Record
            </span>
          )}
        </Link>
        {!isWellness && (
          <div className="pages-links">
            <li>
              <Link to={"/discover/personal"}>Personal</Link>
            </li>
            <li>
              <Link to={"/discover/relationship"}>Relationship</Link>
            </li>
            <li>
              <Link to={"/discover/career"}>Career</Link>
            </li>
            <li>
              <Link to={"/discover/about"}>About</Link>
            </li>
            <li>
              <Link to={"/discover/comingsoon"}>Coming Soon</Link>
            </li>
            <li>
              <Link to={"/wellness"}>Mental Health</Link>
            </li>
          </div>
        )}
        <div
          className={`auth-links ${isWellness ? "wellness-auth-links" : ""}`}
          style={{
            justifyContent: authUser ? "space-around" : "space-between", gap: "16px"
          }}
        >
          <li>
            <div id="google_translate_element"></div>
          </li>
          {isWellness && (
            <li>
              <Link to="/wellness">About</Link>
            </li>
          )}
          {authUser && (
            <li>
              <Link
                className="yourHome"
                to={isWellness ? "wellness/dashboard" : "/discover/dashboard"}
              >
                Dashboard
              </Link>
            </li>
          )}
          {!authUser && (
            <li>
              <Link
                className={`signUp ${isWellness ? "wellness_button" : ""}`}
                to={isWellness ? "/wellness/signup" : "discover/signup"}
              >
                Sign Up
              </Link>
            </li>
          )}
          {!authUser && (
            <li>
              <Link
                className={`login ${isWellness ? "wellness_button" : ""}`}
                to={isWellness ? "/wellness/login" : "/discover/login"}
              >
                Login
              </Link>
            </li>
          )}
          {authUser && (
            <li>
              <button
                onClick={() => {
                  logout();
                  return navigate(isWellness ? "/wellness/login" : "/discover/login");
                }}
                className="logout"
              >
                Logout
              </button>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
