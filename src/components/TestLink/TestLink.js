import "./TestLink.css";
import { Link } from "react-router-dom";

const TestLink = ({ isDone, link, state }) => {
  const className = "TestLink";

  return (
    <>
      {isDone ? (
          <span className={`${className}-takeTestLink-done`}>Done</span>
      ) : (
        <Link to={link} className={`${className}-takeTestLink`} state={state}>
          Take
        </Link>
      )}
    </>
  );
};

export default TestLink;
