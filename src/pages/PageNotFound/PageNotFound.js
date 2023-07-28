import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  const className = "PageNotFound";
  return (
    <div className={className}>
      <div className={`${className}__title`}>
        We sometimes get lost in our own self discovery. <br /> That's why we're
        here together.
      </div>
      <div className={`${className}__desc1`}>
        Here are some paths back - choose any direction you'd like.
      </div>
      <div className={`${className}__linksContainer`}>
        <Link to="/" className={`${className}__link`}>
          Home
        </Link>
        <Link to="/wellness" className={`${className}__link`}>
          Wellness
        </Link>
        <Link to="/discover" className={`${className}__link`}>
          Discover
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
