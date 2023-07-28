import "./WellnessGettingStartedEncouraged.css";
import Button from "../../components/Button";
import TestLink from "../../components/TestLink";

const WellnessGettingStartedEncouraged = () => {
  const className = "WellnessGettingStartedEncouraged";

  // TODO: we should export/import these
  const encouragedTests = [
    // {
    //   name: "Mental Health Quotient",
    //   duration: "10 min",
    //   isDone: false,
    //   testLink: "/wellness/test/mental-health-quotient",
    // },
    // {
    //   name: "Eating",
    //   duration: "5 min",
    //   isDone: false,
    //   testLink: "/wellness/test/eating",
    // },
    {
      name: "Alcohol Use Disorders Identification Test",
      duration: "2 min",
      isDone: false,
      testLink: "/wellness/test/audit-alcohol",
    },
  ];

  const recommendedTests = [
    {
      name: "Depression (Beck)",
      duration: "1 min",
      isDone: false,
      testLink: "/wellness/test/beck-depression",
    },
    {
      name: "Hopelessness (Beck)",
      duration: "3 min",
      isDone: false,
      testLink: "/wellness/test/beck-hopelessness",
    },
    {
      name: "MDI Depression",
      duration: "1 min",
      isDone: false,
      testLink: "/wellness/test/mdi-depression",
    },
    // {name: "Depression (QIDS)", duration: "<2 min", isDone: false, testLink: "/wellness/test/depression-qids"},
    {
      name: "Edinburgh Postnatal Depression",
      duration: "<4 min",
      isDone: false,
      testLink: "/wellness/test/edinburgh-postnatal-depression",
    },
  ];

  return (
    <div className={className}>
      <h1 className={`${className}-title`}>Getting Started (Encouraged)</h1>
      <div className={`${className}-content`}>
        <div className={`${className}-spaceBottom`}>
          Congrats on finishing your first mental health check-in!
        </div>
        <div className={`${className}-spaceBottom`}>
          We encourage you to dive a bit deeper with the following but feel free
          to go to your Dashboard now and review your results.
        </div>

        <div className={`${className}-testListContainer`}>
          <div
            className={`${className}-boldUnderline ${className}-spaceBottom`}
          >
            Encouraged
          </div>
          <ul className={`${className}-testList`}>
            {encouragedTests.map((test) => {
              return (
                <li
                  key={`test-row-${test.testLink}`}
                  className={`${className}-testListItem`}
                >
                  <div>{test.name}</div>
                  <div>{test.duration}</div>
                  <div>
                    <TestLink isDone={test.isDone} link={test.testLink} />
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

        <div className={`${className}-testListContainer`}>
          <div
            className={`${className}-boldUnderline ${className}-spaceBottom`}
          >
            Recommended for you
          </div>
          <div className={`${className}-spaceBottom`}>
            Based on your initial responses, we encourage you to also take the
            following 2 assessments. They will always be available to you if you
            would like to take them another time.
          </div>
          <ul className={`${className}-testList`}>
            {recommendedTests.map((test) => {
              return (
                <li
                  key={`test-row-${test.testLink}`}
                  className={`${className}-testListItem`}
                >
                  <div>{test.name}</div>
                  <div>{test.duration}</div>
                  <div>
                    <TestLink isDone={test.isDone} link={test.testLink} />
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
      </div>
      <div className={`${className}-buttonContainer`}>
        <a href={"/wellness/dashboard"}>
          <Button type={"default"}>Take me to Dashboard</Button>
        </a>
      </div>
    </div>
  );
};

export default WellnessGettingStartedEncouraged;
