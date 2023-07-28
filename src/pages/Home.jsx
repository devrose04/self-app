import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import homedesignr from "../images/homedesignr.svg";
import homedesignl from "../images/homedesignl.svg";

const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="home">
      <div className="container">
        <h1>Welcome to Self</h1>
      </div>
      <div className="container_row margin80">
        <div className="container">
          <h2>
            For Self Wellness <br /> & Mental Health
          </h2>
          <Link to="/wellness" className="wellness">
            Wellness
          </Link>
        </div>
        <div className="container">
          <h2>
            For Self <br />
            Discovery
          </h2>
          <Link to="/discover" className="discover">
            Discover
          </Link>
        </div>
      </div>
      <div className="container_row bottom_image_container">
        {/*<img src={homedesignl} className="zIndex:2" alt="" />*/}
        {/*<img src={homedesignr} alt="" />*/}
      </div>
    </div>
  );
};

export default Home;
