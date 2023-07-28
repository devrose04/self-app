import "./WellnessGettingStarted.css";
import Button from "../../components/Button";
import TestLink from "../../components/TestLink";
import { useAuthState } from "react-firebase-hooks/auth";
import { testsData } from "./testsData";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase.config";
import { getDocs, collection, where, getDoc, query } from "firebase/firestore";
import { Link } from "react-router-dom";

const WellnessGettingStarted = () => {
  const className = "WellnessGettingStarted";
  const [tests, setTests] = useState(testsData);
  const [user] = useAuthState(auth);
  const totalNumberOfCompletedTests = tests.filter((test) => !!test.isDone);
  const [isHovering, setIsHovering] = useState(false);
  const handleHover = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (user && user.uid) {
      const testsRef = collection(db, "WellnessTestResults");
      const q = query(testsRef, where("user", "==", user.uid));
      getDocs(q).then((res) => {
        const testsAsMap = {};
        res.forEach((doc) => {
          testsAsMap[doc.data().formType] = true;
        });
        const updatedTests = tests.map((test) => {
          if (testsAsMap[test.key]) {
            return { ...test, isDone: true };
          }
          return test;
        });
        setTests(updatedTests);
      });
    }
  }, [user]);

  return (
    <div className={className}>
      <h1 className={`${className}-title`}>Your Wellness Checkin</h1>
      <div className={`${className}-content`}>
        <div className={`${className}-spaceBottom`}>
          To begin, let’s cover the basic areas of mental health. We encourage
          you to do all the basics now, but you are free to take them if and
          when you want.
          <br />
          In under 15 minutes, you’ll have an overview of how you are doing
          across the following categories:
        </div>
        <ul className={`${className}-testList`}>
          {tests.map((test) => {
            return (
              <li
                key={`test-row-${test.testLink}`}
                className={`${className}-testListItem`}
              >
                <div>{test.name}</div>
                <div>{test.duration}</div>
                <div>
                  <TestLink
                    isDone={test.isDone}
                    link={test.testLink}
                    state={{ from: "Essentials" }}
                  />
                </div>
                <div>
                  {test.isDone ? (
                    <img
                      className={`${className}-statusIcon`}
                      src={"/icons/check_mark.png"}
                      alt={"check mark icon"}
                    />
                  ) : (
                    <img
                      className={`${className}-statusIcon`}
                      src={"/icons/empty_checkbox.png"}
                      alt={"empty checkbox icon"}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${className}-buttonContainer`}>
        <Link to={"/wellness/dashboard"}>
          <div>
            {totalNumberOfCompletedTests.length === 0 && isHovering && (
              <div className="popup-message">
                While we encourage you to begin the checkin, you are free to
                start later and explore.
              </div>
            )}
            {(totalNumberOfCompletedTests.length === 1 ||
              totalNumberOfCompletedTests.length === 2) &&
              isHovering && (
                <div className="popup-message">
                  Great job starting! We encourage you to finish the checkin, but you can come back at any time.
                </div>
              )}
            {(totalNumberOfCompletedTests.length === 3 ||
              totalNumberOfCompletedTests.length === 4) &&
              isHovering && (
                <div className="popup-message">
                You're almost done! Want to finish? If not, you can come back at any time.
                </div>
              )}
            {totalNumberOfCompletedTests.length === 5 && isHovering && (
              <div className="popup-message">
                Great job doing your checkin!
              </div>
            )}
            <Button
              type="primary"
              handleHover={handleHover}
              handleMouseLeave={handleMouseLeave}
            >
              Go to Dashboard
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WellnessGettingStarted;
