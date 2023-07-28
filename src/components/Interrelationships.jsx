import React, { useEffect, useState } from "react";
import "../styles/interrelationships.scss";
import { store } from "../store";
import Chart from "../components/Chart";
import { httpsCallable } from "firebase/functions";
import { cloudFunctions } from "../firebase.config";
import Spinner from "./Spinner";
import { getStats } from "../utils";

const options = (selector, setSelectedTest, selectedTest) => {
  const isTestSelected = (value) => value === selectedTest;

  return (
    <>
      {selector === "Personality" && (
        <>
          <div className="test_buttons">
            <button
              className={isTestSelected("Enneagram") ? "selected_test" : ""}
              onClick={() => setSelectedTest("Enneagram")}
            >
              Enneagram
            </button>
            <button
              className={isTestSelected("MBTI") ? "selected_test" : ""}
              onClick={() => setSelectedTest("MBTI")}
            >
              MBTI
            </button>
            <button
              className={isTestSelected("Astrology") ? "selected_test" : ""}
              onClick={() => setSelectedTest("Astrology")}
            >
              Astrology
            </button>
          </div>
        </>
      )}
      {selector === "Relationships" && (
        <div className="test_buttons">
          <button
            className={isTestSelected("Love Languages") ? "selected_test" : ""}
            onClick={() => setSelectedTest("Love Languages")}
          >
            Love Languages
          </button>
          <button
            className={
              isTestSelected("Attachment Style") ? "selected_test" : ""
            }
            onClick={() => setSelectedTest("Attachment Style")}
          >
            Attachment Style
          </button>
          <button
            className={isTestSelected("Flirting Style") ? "selected_test" : ""}
            onClick={() => setSelectedTest("Flirting Style")}
          >
            Flirting Style
          </button>
          <button
            className={isTestSelected("FTI") ? "selected_test" : ""}
            onClick={() => setSelectedTest("FTI")}
          >
            FTI
          </button>
        </div>
      )}
      {selector === "Career" && (
        <div className="test_buttons">
          <button
            className={
              isTestSelected("Gallup Strengths Finder") ? "selected_test" : ""
            }
            onClick={() => setSelectedTest("Gallup Strengths Finder")}
          >
            Gallup Strengths Finder
          </button>
          <button
            className={isTestSelected("DISC") ? "selected_test" : ""}
            onClick={() => setSelectedTest("DISC")}
          >
            DISC
          </button>
          <button
            className={
              isTestSelected("Via Career Strengths") ? "selected_test" : ""
            }
            onClick={() => setSelectedTest("Via Career Strengths")}
          >
            Via Career Strengths
          </button>
        </div>
      )}
    </>
  );
};

const getLabelResults = (selectedTest, tests) => {
  return (
    <>
      {selectedTest === "Enneagram" && <span>{tests?.Enneagram?.type}</span>}
      {selectedTest === "MBTI" && <span>{tests?.MBTI?.type}</span>}
      {selectedTest === "Astrology" && (
        <span>sun: {tests?.Astrology?.sun}</span>
      )}
      {selectedTest === "Love Languages" && (
        <span>
          Words of Affirmation: {tests?.LoveLanguages?.wordsAffirmation}
        </span>
      )}
      {selectedTest === "Flirting Style" && (
        <span>Physical: {tests?.FlirtingStyle?.physical}</span>
      )}
      {selectedTest === "Attachment Style" && (
        <span>{tests?.AttachmentStyle?.style}</span>
      )}
      {selectedTest === "FTI" && (
        <span>explorer: {tests?.FisherTemperamentInventory?.explorer}</span>
      )}
      {selectedTest === "Gallup Strengths Finder" && (
        <span>{tests?.GallupStrengthsFinder?.one}</span>
      )}
      {selectedTest === "DISC" && (
        <span>Dominance: {tests?.DISC?.dominance}</span>
      )}
      {selectedTest === "Via Career Strengths" && (
        <span>
          {tests?.ViaCareerStrengths?.one_strength}
          {tests?.ViaCareerStrengths?.one_score}
        </span>
      )}
    </>
  );
};

const getResults = (selectedTest, tests) => {
  if (selectedTest === "Enneagram") {
    return tests?.Enneagram?.type;
  }
  if (selectedTest === "MBTI") {
    return tests?.MBTI?.type;
  }
  if (selectedTest === "Astrology") {
    return tests?.Astrology?.sun;
  }
  if (selectedTest === "Love Languages") {
    return tests?.LoveLanguages?.wordsAffirmation;
  }
  if (selectedTest === "Flirting Style") {
    return tests?.FlirtingStyle?.physical;
  }
  if (selectedTest === "Attachment Style") {
    return tests?.AttachmentStyle?.style;
  }
  if (selectedTest === "FTI") {
    return tests?.FisherTemperamentInventory?.explorer;
  }
  if (selectedTest === "Gallup Strengths Finder") {
    return tests?.GallupStrengthsFinder?.one;
  }
  if (selectedTest === "DISC") {
    return tests?.DISC?.dominance;
  }
  if (selectedTest === "Via Career Strengths") {
    return (
      tests?.ViaCareerStrengths?.one_strength +
      tests?.ViaCareerStrengths?.one_score
    );
  }
  return null;
};

const Interrelationships = () => {
  const [selectorOne, setSelectorOne] = useState("Personality");
  const [selectortwo, setSelectorTwo] = useState("Personality");
  const [selectedTestOne, setSelectedTestOne] = useState("MBTI");
  const [selectedTestTwo, setSelectedTestTwo] = useState("Enneagram");
  const [chartData, setChartData] = useState(null);

  const isSelectedOne = (value) => value === selectorOne;
  const isSelectedTwo = (value) => value === selectortwo;

  const tests = store((state) => state.tests);

  useEffect(() => {
    getStats().then(({ data }) => {
      setChartData(data);
      console.log(data);
    });
  }, []);

  // useEffect(() => {
  //     const getcalc = async () => {
  //         try {

  //             const result = await httpsCallable(cloudFunctions, 'getStatistics')();
  //             console.log(result.data)
  //             setChartData(result.data);
  //         } catch (error) {
  //             console.log(error.message)
  //         }
  //     }

  //     getcalc();
  // }, []);

  return (
    <div className="interrelationships">
      {chartData ? (
        <>
          <h2>Correlate</h2>
          <div className="selectorOne">
            <button
              onClick={() => {
                setSelectorOne("Personality");
                setSelectedTestOne("Enneagram");
              }}
              className={`selector ${
                isSelectedOne("Personality") ? "selected" : ""
              }`}
            >
              Personality
            </button>
            <button
              onClick={() => {
                setSelectorOne("Relationships");
                setSelectedTestOne("Love Languages");
              }}
              className={`selector ${
                isSelectedOne("Relationships") ? "selected" : ""
              }`}
            >
              Relationships
            </button>
            <button
              onClick={() => {
                setSelectorOne("Career");
                setSelectedTestOne("Gallup Strengths Finder");
              }}
              className={`selector ${
                isSelectedOne("Career") ? "selected" : ""
              }`}
            >
              Career
            </button>
          </div>
          <div className="options">
            {options(selectorOne, setSelectedTestOne, selectedTestOne)}
            {getLabelResults(selectedTestOne, tests)}
          </div>
          <h2>With</h2>
          <div className="selectorOne">
            <button
              onClick={() => {
                setSelectorTwo("Personality");
                setSelectedTestTwo("Enneagram");
              }}
              className={`selector ${
                isSelectedTwo("Personality") ? "selected" : ""
              }`}
            >
              Personality
            </button>
            <button
              onClick={() => {
                setSelectorTwo("Relationships");
                setSelectedTestTwo("Love Languages");
              }}
              className={`selector ${
                isSelectedTwo("Relationships") ? "selected" : ""
              }`}
            >
              Relationships
            </button>
            <button
              onClick={() => {
                setSelectorTwo("Career");
                setSelectedTestTwo("Gallup Strengths Finder");
              }}
              className={`selector ${
                isSelectedTwo("Career") ? "selected" : ""
              }`}
            >
              Career
            </button>
          </div>
          <div className="options">
            {options(selectortwo, setSelectedTestTwo, selectedTestTwo)}
          </div>
          {chartData && (
            <Chart
              chartdata={chartData}
              testOne={selectedTestOne}
              testTwo={selectedTestTwo}
              resultOne={getResults(selectedTestOne, tests)}
              resultTwo={getResults(selectedTestTwo, tests)}
            />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Interrelationships;
