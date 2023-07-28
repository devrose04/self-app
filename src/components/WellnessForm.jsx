import React, { useState, useEffect } from "react";
import "../styles/wellnessForm.scss";
import EditButton from "../images/EditButton.svg";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebase.config";
import {
  EATING_DISORDER_EXAMINATION,
  EAT_26,
  LONELINESS,
  MDI,
  MENTAL_HEALTH_QUOTIENT,
  PHQ_9,
  QIDS_SR_16,
  SELF_ESTEEM_APPEARANCE,
  SELF_ESTEEM_OVERALL,
  SELF_ESTEEM_PERFORMANCE,
  SELF_ESTEEM_ROSENBERG,
  SELF_ESTEEM_SOCIAL,
  STRESS,
  WHO_5,
} from "../constants/assessment-scores";
import {
  getCollectionById,
  getGAD7Result,
  getHamiltonResults,
  getIdFromUrl,
  getMHQResult,
  getPHQ9Result,
  getQIDSSR16Result,
  verifyUrl,
} from "../utils";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "./Spinner";
import { Link, useLocation } from "react-router-dom";

const WelnessForm = ({
  title,
  assessment_url,
  second_assessment_url,
  third_assessment_url,
  collectionName,
  addWellnessCompletedForm,
  wellnessFormsCompleted,
}) => {
  const [value, setValue] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useAuthState(auth);
  const location = useLocation();
  const userId = getIdFromUrl(location.pathname);

  const userType = user ? user.uid : userId;

  const updateDocument = async (updatedData) => {
    const q = query(
      collection(db, collectionName),
      where("userId", "==", user.uid)
    );
    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
          const docRef = doc(db, collectionName, querySnapshot.docs[0].id);

          updateDoc(docRef, updatedData)
            .then(() => {
              console.log("updated");
            })
            .catch((error) => {
              console.log("error1", error);
            });
        }
      })
      .catch((error) => {
        console.log("error2", error);
      });
  };

  const handleSaveScore = async () => {
    const existingDocument = await getCollectionById(collectionName, user.uid);

    if (existingDocument) {
      await updateDocument({ ...value });
      return;
    }

    await addDoc(collection(db, collectionName), {
      ...value,
      userId: user.uid,
    }).then(() => {
      switch (collectionName) {
        case "Mental Health Quotient":
          if (!wellnessFormsCompleted.includes("Mental Health Quotient")) {
            addWellnessCompletedForm("Mental Health Quotient");
          }
          break;
        case "Depression":
          if (!wellnessFormsCompleted.includes("Depression")) {
            addWellnessCompletedForm("Depression");
          }
          break;
        case "Anxiety":
          if (!wellnessFormsCompleted.includes("Anxiety")) {
            addWellnessCompletedForm("Anxiety");
          }
          break;
        case "Self-Esteem":
          if (!wellnessFormsCompleted.includes("Self-Esteem")) {
            addWellnessCompletedForm("Self-Esteem");
          }
          break;

        default:
          break;
      }
    });
  };

  const handleClick = async (e, setLoading) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
    }

    if (isEditing) {
      setLoading(true);
      await handleSaveScore();
      setIsEditing(false);
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const MHQ_Dropdowns = () => {
    const [overall, setOverall] = useState(null);
    const [moodOutlook, setMoodOutlook] = useState(null);
    const [socialSelf, setSocialSelf] = useState(null);
    const [driveMotivation, setDriveMotivation] = useState("");
    const [cognition, setCognition] = useState("");
    const [adaptabilityResilience, setAdaptabilityResilience] = useState("");
    const [mindBodyConnection, setMindBodyConnection] = useState("");

    const [hasData, setHasData] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("Mental Health Quotient", userType)
        .then((data) => {
          setOverall(data.overall);
          setMoodOutlook(data.moodOutlook);
          setSocialSelf(data.socialSelf);
          setDriveMotivation(data.driveMotivation);
          setCognition(data.cognition);
          setAdaptabilityResilience(data.adaptabilityResilience);
          setMindBodyConnection(data.mindBodyConnection);
          setHasData(true);
          if (!wellnessFormsCompleted.includes("Mental Health Quotient")) {
            addWellnessCompletedForm("Mental Health Quotient");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="dropdown">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Overall</label>
              <select
                name="overall"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.overall ? value.overall : overall}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MENTAL_HEALTH_QUOTIENT.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Mood Outlook</label>
              <select
                name="moodOutlook"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.moodOutlook ? value.moodOutlook : moodOutlook}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MENTAL_HEALTH_QUOTIENT.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Social Self</label>
              <select
                name="socialSelf"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.socialSelf ? value.socialSelf : socialSelf}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MENTAL_HEALTH_QUOTIENT.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Drive & Motivation</label>
              <select
                name="driveMotivation"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.driveMotivation
                    ? value.driveMotivation
                    : driveMotivation
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MENTAL_HEALTH_QUOTIENT.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Cognition</label>
              <select
                name="cognition"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.cognition ? value.cognition : cognition}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MENTAL_HEALTH_QUOTIENT.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Adaptability & Resilience</label>
              <select
                name="adaptabilityResilience"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.adaptabilityResilience
                    ? value.adaptabilityResilience
                    : adaptabilityResilience
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MENTAL_HEALTH_QUOTIENT.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Mind-Body Connection</label>
              <select
                name="mindBodyConnection"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.mindBodyConnection
                    ? value.mindBodyConnection
                    : mindBodyConnection
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MENTAL_HEALTH_QUOTIENT.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {hasData ? (
                  <>
                    <div className="row">
                      <label>Overall</label>

                      <span>{value.overall ? value.overall : overall}</span>
                      <span>
                        {getMHQResult(value.overall ? value.overall : overall)}
                      </span>
                    </div>
                    <div className="row">
                      <label>Mood & Outlook</label>
                      <span>
                        {value.moodOutlook ? value.moodOutlook : moodOutlook}
                      </span>
                      <span>
                        {getMHQResult(
                          value.moodOutlook ? value.moodOutlook : moodOutlook
                        )}
                      </span>
                    </div>
                    <div className="row">
                      <label>Social Self</label>
                      <span>
                        {value.socialSelf ? value.socialSelf : socialSelf}
                      </span>
                      <span>
                        {getMHQResult(
                          value.socialSelf ? value.socialSelf : socialSelf
                        )}
                      </span>
                    </div>
                    <div className="row">
                      <label>Drive & Motivation</label>
                      <span>
                        {value.driveMotivation
                          ? value.driveMotivation
                          : driveMotivation}
                      </span>
                      <span>
                        {getMHQResult(
                          value.driveMotivation
                            ? value.driveMotivation
                            : driveMotivation
                        )}
                      </span>
                    </div>
                    <div className="row">
                      <label>Cognition</label>

                      <span>
                        {value.cognition ? value.cognition : cognition}
                      </span>
                      <span>
                        {getMHQResult(
                          value.cognition ? value.cognition : cognition
                        )}
                      </span>
                    </div>
                    <div className="row">
                      <label>Adaptability & Resilience</label>
                      <span>
                        {value.adaptabilityResilience
                          ? value.adaptabilityResilience
                          : adaptabilityResilience}
                      </span>
                      <span>
                        {getMHQResult(
                          value.adaptabilityResilience
                            ? value.adaptabilityResilience
                            : adaptabilityResilience
                        )}
                      </span>
                    </div>
                    <div className="row">
                      <label>Mind-Body Connection</label>
                      <span>
                        {value.mindBodyConnection
                          ? value.mindBodyConnection
                          : mindBodyConnection}
                      </span>
                      <span>
                        {getMHQResult(
                          value.mindBodyConnection
                            ? value.mindBodyConnection
                            : mindBodyConnection
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <span>Test not completed yet.</span>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && (
          <>
            <button
              className="edit_score"
              onClick={(e) => {
                setIsEditing(false);
                handleClick(e, setIsLoading);
                if (isEditing) {
                  setHasData(true);
                }
              }}
            >
              {isEditing ? "Save" : "I know my score"}
            </button>
            {!isEditing && (
              <a
                target="_blank"
                className="take_test"
                href={assessment_url}
                rel="noreferrer"
              >
                Take assessment
              </a>
            )}
          </>
        )}
      </div>
    );
  };

  const UniqueDropdown = () => {
    const [result, setResult] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [time, setTime] = useState(0);
    const [options, setOptions] = useState([]);

    const getOptions = () => {
      console.log(collectionName);
      if (collectionName === "Who-5") {
        setOptions(WHO_5);
        setTime(1);
      } else if (collectionName === "Stress") {
        setTime(2);
        setOptions(STRESS);
      }
    };

    useEffect(() => {
      getOptions(collectionName);
      getCollectionById(collectionName, userType)
        .then((data) => {
          setResult(data.result);
          setHasData(true);
          if (!wellnessFormsCompleted.includes(collectionName)) {
            addWellnessCompletedForm(collectionName);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="unique_dropdown">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <select
                name="result"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.result ? value.result : result}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {options &&
                  options.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {hasData ? (
                  <div className="row unique">
                    <span>{value.result ? value.result : result}</span>
                    <div className="info-buttons">
                      <a
                        target="_blank"
                        className="take_test"
                        href={assessment_url}
                        rel="noreferrer"
                      >
                        Take in just {time} min.
                      </a>
                      <button
                        className="edit_score"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEditing(true);
                        }}
                      >
                        I know my results
                      </button>
                    </div>
                  </div>
                ) : (
                  <span>Test not completed yet.</span>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !hasData && (
          <>
            <button
              className="edit_score"
              onClick={(e) => {
                setIsEditing(false);
                handleClick(e, setIsLoading);
                if (isEditing) {
                  setHasData(true);
                }
              }}
            >
              {isEditing ? "Save" : "I know my score"}
            </button>
            {!isEditing && (
              <a
                target="_blank"
                className="take_test"
                href={assessment_url}
                rel="noreferrer"
              >
                Take assessment
              </a>
            )}
          </>
        )}
      </div>
    );
  };

  const SelfEsteem = () => {
    const [rosenberg, setRosenberg] = useState(null);
    const [overall, setOverall] = useState(null);
    const [performance, setPerformance] = useState(null);
    const [social, setSocial] = useState(null);
    const [appearance, setAppearance] = useState(null);

    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById(collectionName, userType)
        .then((data) => {
          setRosenberg(data.rosenberg);
          setOverall(data.overall);
          setPerformance(data.performance);
          setSocial(data.setSocial);
          setAppearance(data.appearance);
          setHasData(true);
          if (!wellnessFormsCompleted.includes(collectionName)) {
            addWellnessCompletedForm(collectionName);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="dropdown">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <span className="title">The Rosenberg Self Esteem Scale</span>
            </div>
            <div className="row">
              <label>Rosenberg</label>
              <select
                name="rosenberg"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.rosenberg ? value.rosenberg : rosenberg}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {SELF_ESTEEM_ROSENBERG.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <span className="title">State Self Esteem Scale (SSES)</span>
            </div>
            <div className="row">
              <label>Overall</label>
              <select
                name="overall"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.overall ? value.overall : overall}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {SELF_ESTEEM_OVERALL.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Performance</label>
              <select
                name="performance"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.performance ? value.performance : performance}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {SELF_ESTEEM_PERFORMANCE.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Social</label>
              <select
                name="social"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.social ? value.social : social}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {SELF_ESTEEM_SOCIAL.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Appearance</label>
              <select
                name="appearance"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.appearance ? value.appearance : appearance}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {SELF_ESTEEM_APPEARANCE.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {hasData ? (
                  <>
                    <div className="row">
                      <span>The Rosenberg Self Esteem Scale</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <label>Rosenberg</label>

                      <span>
                        {value.rosenberg ? value.rosenberg : rosenberg}
                      </span>
                    </div>
                    <div className="row">
                      <span>State Self Esteem Scale (SSES)</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <label>Overall</label>

                      <span>{value.overall ? value.overall : overall}</span>
                    </div>
                    <div className="row">
                      <label>Performance</label>

                      <span>
                        {value.performance ? value.performance : performance}
                      </span>
                    </div>
                    <div className="row">
                      <label>Social</label>

                      <span>{value.social ? value.social : social}</span>
                    </div>
                    <div className="row">
                      <label>Appearance</label>

                      <span>
                        {value.appearance ? value.appearance : appearance}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <span>The Rosenberg Self Esteem Scale</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <span>State Self Esteem Scale (SSES)</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && isEditing && (
          <>
            <button
              className="edit_score"
              onClick={(e) => {
                setIsEditing(false);
                handleClick(e, setIsLoading);
                if (isEditing) {
                  setHasData(true);
                }
              }}
            >
              {isEditing ? "Save" : "I know my score"}
            </button>
          </>
        )}
      </div>
    );
  };

  const DepressionDropdown = () => {
    const [phq9, setPhq9] = useState(null);
    const [qidssr16, setQidssr16] = useState(null);
    const [mdi, setMdi] = useState(null);

    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById(collectionName, userType)
        .then((data) => {
          setPhq9(data.phq9);
          setQidssr16(data.qidssr16);
          setMdi(data.mdi);
          setHasData(true);
          if (!wellnessFormsCompleted.includes(collectionName)) {
            addWellnessCompletedForm(collectionName);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="dropdown">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>PHQ-9</label>
              <select
                name="phq9"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.phq9 ? value.phq9 : phq9}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {PHQ_9.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>QIDS-SR-16</label>
              <select
                name="qidssr16"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.qidssr16 ? value.qidssr16 : qidssr16}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {QIDS_SR_16.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>MDI</label>
              <select
                name="mdi"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.mdi ? value.mdi : mdi}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MDI.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {hasData ? (
                  <>
                    <div className="row">
                      <label>PHQ-9</label>

                      <span>{value.phq9 ? value.phq9 : phq9}</span>
                      <span>
                        {getPHQ9Result(value.phq9 ? value.phq9 : phq9)}
                      </span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <label>QIDS-SR-16</label>

                      <span>{value.qidssr16 ? value.qidssr16 : qidssr16}</span>
                      <span>
                        {getQIDSSR16Result(
                          value.qidssr16 ? value.qidssr16 : qidssr16
                        )}
                      </span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 3 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <label>MDI</label>

                      <span>{value.mdi ? value.mdi : mdi}</span>
                      {/* Need to add calculation */}
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={third_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 5 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <span>PHQ-9</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <span>QIDS-SR-16</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <span>Major Depression Index (MDI)</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={third_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && isEditing && (
          <>
            <button
              className="edit_score"
              onClick={(e) => {
                setIsEditing(false);
                handleClick(e, setIsLoading);
                if (isEditing) {
                  setHasData(true);
                }
              }}
            >
              {isEditing ? "Save" : "I know my score"}
            </button>
            {!isEditing && (
              <a
                target="_blank"
                className="take_test"
                href={assessment_url}
                rel="noreferrer"
              >
                Take assessment
              </a>
            )}
          </>
        )}
      </div>
    );
  };

  const AnxietyDropdown = () => {
    const [gad7, setGad7] = useState(null);
    const [hamiltonAnxietyScale, setHamiltonAnxietyScale] = useState(null);

    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById(collectionName, userType)
        .then((data) => {
          setGad7(data.gad7);
          setHamiltonAnxietyScale(data.hamiltonAnxietyScale);
          setDetail(data.detail);
          setHasData(true);
          if (!wellnessFormsCompleted.includes(collectionName)) {
            addWellnessCompletedForm(collectionName);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="dropdown">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <span className="title">GAD 7</span>
            </div>
            <div className="row">
              <label>GAD_7</label>
              <select
                name="gad7"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.gad7 ? value.gad7 : gad7}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {PHQ_9.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <span className="title">Hamilton Anxiety Scale</span>
            </div>
            <div className="row">
              <label>Hamilton Scale</label>
              <select
                name="hamiltonAnxietyScale"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.hamiltonAnxietyScale
                    ? value.hamiltonAnxietyScale
                    : hamiltonAnxietyScale
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {QIDS_SR_16.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="detail_input_container">
              <label>Detail (include link to results)</label>
              <input
                name="detail"
                onChange={(e) => {
                  handleOnChange(e);
                  setDetail(e.target.value);
                }}
                type="text"
                value={value.detail ? value.detail : detail}
              />
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {hasData ? (
                  <>
                    <div className="row">
                      <span>GAD_7</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <label>GAD_7</label>
                      <span>{value.gad7 ? value.gad7 : gad7}</span>
                      <span>
                        {getGAD7Result(value.gad7 ? value.gad7 : gad7)}
                      </span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 1 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <span>Hamilton Anxiety Scale</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={third_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <label>Hamilton Scale</label>
                      <span>
                        {value.hamiltonAnxietyScale
                          ? value.hamiltonAnxietyScale
                          : hamiltonAnxietyScale}
                      </span>
                      <span>
                        {getHamiltonResults(
                          value.hamiltonAnxietyScale
                            ? value.hamiltonAnxietyScale
                            : hamiltonAnxietyScale
                        )}
                      </span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 3 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <span>GAD_7</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <span>Hamilton Anxiety Scale</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && isEditing && (
          <>
            <button
              className="edit_score"
              onClick={(e) => {
                setIsEditing(false);
                handleClick(e, setIsLoading);
                if (isEditing) {
                  setHasData(true);
                }
              }}
            >
              {isEditing ? "Save" : "I know my score"}
            </button>
            {!isEditing && (
              <a
                target="_blank"
                className="take_test"
                href={assessment_url}
                rel="noreferrer"
              >
                Take assessment
              </a>
            )}
          </>
        )}
      </div>
    );
  };

  const Loneliness = () => {
    const [result, setResult] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById(collectionName, userType)
        .then((data) => {
          setResult(data.result);
          setHasData(true);
          if (!wellnessFormsCompleted.includes(collectionName)) {
            addWellnessCompletedForm(collectionName);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="unique_dropdown">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <select
                name="result"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.result ? value.result : result}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {LONELINESS.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {hasData ? (
                  <div className="row">
                    <span>{value.result ? value.result : result}</span>
                    <div className="info-buttons">
                      <a
                        target="_blank"
                        className="take_test"
                        href={assessment_url}
                        rel="noreferrer"
                      >
                        Take in just 5 min.
                      </a>
                      <button
                        className="edit_score"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEditing(true);
                        }}
                      >
                        I know my results
                      </button>
                    </div>
                  </div>
                ) : (
                  <span>Test not completed yet.</span>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !hasData && (
          <>
            <button
              className="edit_score"
              onClick={(e) => {
                setIsEditing(false);
                handleClick(e, setIsLoading);
                if (isEditing) {
                  setHasData(true);
                }
              }}
            >
              {isEditing ? "Save" : "I know my score"}
            </button>
            {!isEditing && (
              <a
                target="_blank"
                className="take_test"
                href={assessment_url}
                rel="noreferrer"
              >
                Take assessment
              </a>
            )}
          </>
        )}
      </div>
    );
  };

  const EatingDropdown = () => {
    const [eat26, setEat26] = useState(null);
    const [eatingDisorderExamination, setEatingDisorderExamination] =
      useState(null);

    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById(collectionName, userType)
        .then((data) => {
          setEat26(data.eat26);
          setEatingDisorderExamination(data.eatingDisorderExamination);
          setHasData(true);
          if (!wellnessFormsCompleted.includes(collectionName)) {
            addWellnessCompletedForm(collectionName);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="dropdown">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Eat-26</label>
              <select
                name="eat26"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.eat26 ? value.eat26 : eat26}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EAT_26.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Eating Disoder</label>
              <select
                name="eatingDisorderExamination"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.eatingDisorderExamination
                    ? value.eatingDisorderExamination
                    : eatingDisorderExamination
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EATING_DISORDER_EXAMINATION.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {hasData ? (
                  <>
                    <div className="row">
                      <label>EAT-26</label>
                      <span>{value.eat26 ? value.eat26 : eat26}</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 5 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <label>Eating Disoder</label>
                      <span>
                        {value.eatingDisorderExamination
                          ? value.eatingDisorderExamination
                          : eatingDisorderExamination}
                      </span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 5 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <span>EAT-26</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <span>Eating Disoder</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && isEditing && (
          <>
            <button
              className="edit_score"
              onClick={(e) => {
                setIsEditing(false);
                handleClick(e, setIsLoading);
                if (isEditing) {
                  setHasData(true);
                }
              }}
            >
              {isEditing ? "Save" : "I know my score"}
            </button>
            {!isEditing && (
              <a
                target="_blank"
                className="take_test"
                href={assessment_url}
                rel="noreferrer"
              >
                Take assessment
              </a>
            )}
          </>
        )}
      </div>
    );
  };

  const AddictionsDropdown = () => {
    const [drug, setDrug] = useState(null);
    const [alcohol, setAlcohol] = useState(null);
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById(collectionName, userType)
        .then((data) => {
          setDrug(data.drug);
          setAlcohol(data.alcohol);
          setHasData(true);
          if (!wellnessFormsCompleted.includes(collectionName)) {
            addWellnessCompletedForm(collectionName);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="dropdown">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Drug Abuse Screening Test</label>
              <select
                name="drug"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.drug ? value.drug : drug}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EAT_26.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Alcohol Use Disorders Identification Test</label>
              <select
                name="alcohol"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.alcohol ? value.alcohol : alcohol}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EATING_DISORDER_EXAMINATION.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {hasData ? (
                  <>
                    <div className="row">
                      <label>Drug Abuse Screening Test</label>
                      <span>{value.drug ? value.drug : drug}</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <label>Alcohol Use Disorders Identification Test</label>
                      <span>{value.alcohol ? value.alcohol : alcohol}</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <span>Drug Abuse Screening Test</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <span>Alcohol Use Disorders Identification Test</span>
                      <div className="info-buttons">
                        <a
                          target="_blank"
                          className="take_test"
                          href={second_assessment_url}
                          rel="noreferrer"
                        >
                          Take in just 2 min.
                        </a>
                        <button
                          className="edit_score"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                          }}
                        >
                          I know my results
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && isEditing && (
          <>
            <button
              className="edit_score"
              onClick={(e) => {
                setIsEditing(false);
                handleClick(e, setIsLoading);
                if (isEditing) {
                  setHasData(true);
                }
              }}
            >
              {isEditing ? "Save" : "I know my score"}
            </button>
            {!isEditing && (
              <a
                target="_blank"
                className="take_test"
                href={assessment_url}
                rel="noreferrer"
              >
                Take assessment
              </a>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="wellness_form_container">
      <div className="header">
        <h2>{title}</h2>
        {!isEditing && (
          <img onClick={() => setIsEditing(true)} src={EditButton} alt="edit" />
        )}
        {isEditing && (
          <button className="close_button" onClick={() => setIsEditing(false)}>
            X
          </button>
        )}
      </div>
      <form>
        {collectionName === "Mental Health Quotient" && MHQ_Dropdowns()}
        {(collectionName === "Who-5" || collectionName === "Stress") &&
          UniqueDropdown()}
        {collectionName === "Self-Esteem" && SelfEsteem()}
        {collectionName === "Depression" && DepressionDropdown()}
        {collectionName === "Anxiety" && AnxietyDropdown()}
        {collectionName === "Loneliness" && Loneliness()}
        {collectionName === "Eating" && EatingDropdown()}
        {collectionName === "Addictions" && AddictionsDropdown()}
      </form>
    </div>
  );
};

export default WelnessForm;
