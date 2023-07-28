import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/Logo.svg";
import SelfLogo from "../images/Self.svg";
import "../styles/mobileNavbar.scss";
import { logout } from "../utils";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const MobileNavbar = () => {
  const [authUser, setAuthUser] = useState(null);
  const [open, setOpen] = useState(false);

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
    <div className={`mobile_navbar ${isWellness ? "wellness" : ""}`}>
      <div className={`navbar_header ${isWellness ? "wellness" : ""}`}>
        <Link to={isWellness ? "/wellness" : "/discover"}>
          <img src={isWellness ? SelfLogo : Logo} alt="logo self" />
          {isWellness && (
            <span style={{ marginLeft: 20 }}>
              Your Digital Mental Health Record
            </span>
          )}
        </Link>

        {!open && (
          <div className="hamburger" onClick={() => setOpen(!open)}>
            <div className={`line ${isWellness ? "wellness-line" : ""}`}></div>
            <div className={`line ${isWellness ? "wellness-line" : ""}`}></div>
            <div className={`line ${isWellness ? "wellness-line" : ""}`}></div>
          </div>
        )}
        {open && (
          <div
            className={`close ${isWellness ? "wellness-close" : ""}`}
            onClick={() => setOpen(!open)}
          >
            X
          </div>
        )}
      </div>
      {open && (
        <nav>
          <ul>
            {!isWellness && (
              <div>
                <li>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setOpen(false);
                    }}
                    to={"/discover/comingsoon"}
                  >
                    Coming Soon
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setOpen(false);
                    }}
                    to={"/discover/personal"}
                  >
                    Personal
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setOpen(false);
                    }}
                    to={"/discover/relationship"}
                  >
                    Relationship
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setOpen(false);
                    }}
                    to={"/discover/career"}
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setOpen(false);
                    }}
                    to={"/discover/about"}
                  >
                    About
                  </Link>
                </li>
              </div>
            )}

            {isWellness && (
              <li>
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setOpen(false);
                  }}
                  to={"/wellness/about"}
                >
                  About
                </Link>
              </li>
            )}
            {authUser && (
              <li>
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setOpen(false);
                  }}
                  to={
                    isWellness ? "/wellness/dashboard" : "/discover/dashboard"
                  }
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!authUser && (
              <li>
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setOpen(false);
                  }}
                  className="signUp"
                  to={isWellness ? "/wellness/signup" : "/discover/dashboard"}
                >
                  Sign Up
                </Link>
              </li>
            )}
            {!authUser && (
              <li>
                <Link
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setOpen(false);
                  }}
                  className="login"
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
                    window.scrollTo(0, 0);
                    setOpen(false);
                  }}
                  className="logout"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MobileNavbar;
