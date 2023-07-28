import "./../../../styles/WellnessDashboardTests.scss";
import formCategories from "./formCategories";
import formData from "../../WellnessTest/formData";
import { Link } from "react-router-dom/dist";
import { useState, useEffect } from "react";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const WellnessDashboardTests = ({ userTestsData }) => {
  const className = "WellnessDashboardTests";
  const [popMessage, setPopMessage] = useState(false);
  const [testStatus, setTestStatus] = useState({});


  const getStatus = (formData, userTest) => {
    if (!formData || !formData.labels || !userTest || !userTest.score)
      return "-";
    return formData.labels.reduce((acc, label) => {
      const { range, description } = label;
      const [min, max] = range.split("-");
      if (min <= userTest.score && userTest.score <= max) return description;
      return acc;
    }, "");
  };

  useEffect(() => {
    formCategories.forEach((category) => {
      category.tests.forEach((test) => {
        if (userTestsData[test.key]) {
          const createdDate = new Date(userTestsData[test.key].created);
          const time = Date.now() - createdDate.getTime();
          const days = Math.floor(time / (1000 * 60 * 60 * 24));
          if (days > 30) {
            setPopMessage(true);
          }
          if (days < 7) {
            setTestStatus((prevState)=>({...prevState, [test.key]:false}))
          } else {            
            setTestStatus((prevState)=>({...prevState, [test.key]:true}))
          }
        }
        else return;
      });
    });
  }, [userTestsData, formCategories]);

  return (
    <div className={className}>
      <div className={`${className}-container`}>
        <div
          className={`${className}-categoryTest`}
          style={{
            fontWeight: "bold",
            borderBottom: "thin solid #ccc",
            padding: "16px 8px",
          }}
        >
          <div />
          <div>Status</div>
          <div>Score</div>
          <div>Date</div>
          <div />
        </div>
        {formCategories.map((category) => (
          <div
            className={`${className}-categoryContainer`}
            key={`${category.title.replace(/\s/gi, "_")}`}
          >
            <div className={`${className}-categoryTitle`}>{category.title}</div>
            <div className={`${className}-categoryTestsContainer`}>
              {category.tests.map((test, index) => (
                <div
                  key={`${category.title.replace(/\s/gi, "_")}-${index}`}
                  className={`${className}-categoryTest`}
                >
                  <div>{test.title || category.title}</div>
                  <div>
                    {getStatus(formData[test.key], userTestsData[test.key])}
                  </div>
                  <div>
                    {userTestsData[test.key]
                      ? userTestsData[test.key].score
                      : "-"}
                    {userTestsData[test.key] &&
                      userTestsData[test.key].score && (
                        <div>
                          <a
                            className={`${className}-testLink`}
                            href={`/wellness/test-details/${test.key}`}
                          >
                            {"Details"}
                          </a>
                        </div>
                      )}
                  </div>
                  <div>
                    {userTestsData[test.key]
                      ? new Date(
                          userTestsData[test.key].created
                        ).toLocaleDateString()
                      : "-"}
                  </div>
                  <div>
                    {testStatus[test.key] ? (
                      <Link
                      className={`${className}-testLink`}
                      to={test.url}
                      state={{ from: "Dashboard" }}
                    >
                      {userTestsData[test.key] ? "Retake test" : "Take test"}
                    </Link>
                    ):(
                    userTestsData[test.key] ? (
                      <Link className={`${className}-testLink-disabled`}>
                        Retake test
                        <div className="pop-up">
                          Tests can be completed only once per week.
                        </div>
                      </Link>
                    ) : (
                      <Link
                        className={`${className}-testLink`}
                        to={test.url}
                        state={{ from: "Dashboard" }}
                      >
                        Take test
                      </Link>
                    )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessDashboardTests;
