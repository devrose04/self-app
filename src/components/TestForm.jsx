import React, { useState, useEffect } from "react";
import "../styles/testForm.scss";
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
  MBTI,
  ENNEAGRAM_TYPE,
  ENNEAGRAM_WING,
  ENNEAGRAM_TRITYPE,
  BIG_FIVE_VALUES,
  IQ,
  EQ,
  ZODIAC,
  ELEMENTS,
  LOVE_LANGUAGES,
  ATTACHMENT_STYLE,
  FLIRTING_STYLE,
  FTI,
  GALLUPSTRENGTHSFINDER,
  DISC,
  MINDSET,
  VIA_CARRER_STRENGTHS,
} from "../constants/assessment-scores";
import { getCollectionById, getIdFromUrl, verifyUrl } from "../utils";
import { useAuthState } from "react-firebase-hooks/auth";
import GlassDetailImg from "../images/Magnifyingglass.svg";
import Spinner from "./Spinner";
import { Link, useLocation } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons/lib/icons";
import { store } from "../store";

const TestForm = ({
  title,
  assessment_url,
  collectionName,
  addPersonalityCompletedForm,
  personalityFormsCompleted,
  addRelationshipCompletedForm,
  relationshipFormsCompleted,
  addCareerCompletedForm,
  careerFormsCompleted,
  shareableView,
  setSharedTestsHidden,
  sharedTestsHidden,
  setIsEditingSharing,
  isSharedProfile,
}) => {
  const [value, setValue] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useAuthState(auth);
  const [showBigFiveLabels, setShowBigFiveLabels] = useState(false);
  const [showEnneagramLabels, setShowEnneagramLabels] = useState(false);
  const [showEQLabels, setShowEQLabels] = useState(false);
  const [showAstrologyLabels, setShowAstrologyLabels] = useState(false);
  const [showLoveLanguagesLabels, setShowLoveLanguagesLabels] = useState(false);
  const [showFlirtingStyleLabels, setShowFlirtingStyleLabels] = useState(false);
  const [showFTILabels, setShowFTILabels] = useState(false);
  const [showGallupLabels, setShowGallupLabels] = useState(false);
  const [showDISCLabels, setShowDISCLabels] = useState(false);
  const location = useLocation();
  const userId = getIdFromUrl(location.pathname);
  const updateTestStore = store((state) => state.updateTests);

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
              updateTestStore({ [collectionName]: { ...value } });
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
        case "MBTI":
          if (!personalityFormsCompleted.includes("MBTI")) {
            addPersonalityCompletedForm("MBTI");
          }
          localStorage.setItem("MBTI", JSON.stringify({ ...value }));
          updateTestStore({ MBTI: { ...value } });
          break;
        case "Enneagram":
          if (!personalityFormsCompleted.includes("Enneagram")) {
            addPersonalityCompletedForm("Enneagram");
          }
          updateTestStore({ Enneagram: { ...value } });
          localStorage.setItem("Enneagram", JSON.stringify({ ...value }));
          setShowEnneagramLabels(true);
          break;
        case "BigFive":
          if (!personalityFormsCompleted.includes("BigFive")) {
            addPersonalityCompletedForm("BigFive");
          }
          localStorage.setItem("BigFive", JSON.stringify({ ...value }));
          updateTestStore({ BigFive: { ...value } });
          setShowBigFiveLabels(true);
          break;
        case "IQ":
          if (!personalityFormsCompleted.includes("IQ")) {
            addPersonalityCompletedForm("IQ");
          }
          localStorage.setItem("IQ", JSON.stringify({ ...value }));
          updateTestStore({ IQ: { ...value } });
          break;
        case "EQ":
          if (!personalityFormsCompleted.includes("EQ")) {
            addPersonalityCompletedForm("EQ");
          }
          localStorage.setItem("EQ", JSON.stringify({ ...value }));
          setShowEQLabels(true);
          updateTestStore({ EQ: { ...value } });
          break;
        case "Astrology":
          if (!personalityFormsCompleted.includes("Astrology")) {
            addPersonalityCompletedForm("Astrology");
          }
          localStorage.setItem("Astrology", JSON.stringify({ ...value }));
          updateTestStore({ Astrology: { ...value } });
          setShowAstrologyLabels(true);
          break;
        case "Mindset":
          if (!personalityFormsCompleted.includes("Mindset")) {
            addPersonalityCompletedForm("Mindset");
          }
          localStorage.setItem("Mindset", JSON.stringify({ ...value }));
          updateTestStore({ Mindset: { ...value } });
          break;
        case "Grit":
          if (!personalityFormsCompleted.includes("Grit")) {
            addPersonalityCompletedForm("Grit");
          }
          localStorage.setItem("Grit", JSON.stringify({ ...value }));
          updateTestStore({ Grit: { ...value } });
          break;
        case "LoveLanguages":
          if (!relationshipFormsCompleted.includes("LoveLanguages")) {
            addRelationshipCompletedForm("LoveLanguages");
          }
          localStorage.setItem("LoveLanguages", JSON.stringify({ ...value }));
          updateTestStore({ LoveLanguages: { ...value } });
          setShowLoveLanguagesLabels(true);
          break;
        case "AttachmentStyle":
          if (!relationshipFormsCompleted.includes("AttachmentStyle")) {
            addRelationshipCompletedForm("AttachmentStyle");
          }
          localStorage.setItem("AttachmentStyle", JSON.stringify({ ...value }));
          updateTestStore({ AttachmentStyle: { ...value } });
          break;
        case "FlirtingStyle":
          if (!relationshipFormsCompleted.includes("FlirtingStyle")) {
            addRelationshipCompletedForm("FlirtingStyle");
          }
          localStorage.setItem("FlirtingStyle", JSON.stringify({ ...value }));
          updateTestStore({ FlirtingStyle: { ...value } });
          setShowFlirtingStyleLabels(true);
          break;
        case "FisherTemperamentInventory":
          if (
            !relationshipFormsCompleted.includes("FisherTemperamentInventory")
          ) {
            addRelationshipCompletedForm("FisherTemperamentInventory");
          }
          localStorage.setItem(
            "FisherTemperamentInventory",
            JSON.stringify({ ...value })
          );
          updateTestStore({ FisherTemperamentInventory: { ...value } });
          setShowFTILabels(true);
          break;
        case "GallupStrengthsFinder":
          if (!careerFormsCompleted.includes("GallupStrengthsFinder")) {
            addCareerCompletedForm("GallupStrengthsFinder");
          }
          localStorage.setItem(
            "GallupStrengthsFinder",
            JSON.stringify({ ...value })
          );
          updateTestStore({ GallupStrengthsFinder: { ...value } });
          setShowGallupLabels(true);
          break;
        case "DISC":
          if (!careerFormsCompleted.includes("DISC")) {
            addCareerCompletedForm("DISC");
          }
          localStorage.setItem("DISC", JSON.stringify({ ...value }));
          updateTestStore({ DISC: { ...value } });
          setShowDISCLabels(true);
          break;
        case "ViaCareerStrengths":
          if (!careerFormsCompleted.includes("ViaCareerStrengths")) {
            addCareerCompletedForm("ViaCareerStrengths");
          }
          localStorage.setItem(
            "ViaCareerStrengths",
            JSON.stringify({ ...value })
          );
          updateTestStore({ ViaCareerStrengths: { ...value } });
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

  const isTestHidden = (test) => {
    if (
      sharedTestsHidden?.hasOwnProperty(test) &&
      sharedTestsHidden[test] === true
    ) {
      return true;
    } else if (
      !sharedTestsHidden?.hasOwnProperty(test) ||
      sharedTestsHidden[test] === false
    ) {
      return false;
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "sharedTestsHidden",
      JSON.stringify(sharedTestsHidden)
    );
  }, [sharedTestsHidden]);

  const MBTIDropwdowns = () => {
    const [type, setType] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("MBTI", userType)
        .then((data) => {
          setType(data.type);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ MBTI: { ...data } });
          if (!personalityFormsCompleted.includes("MBTI")) {
            addPersonalityCompletedForm("MBTI");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("MBTI", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="MBTI_dropdown">
        {isEditing && !isLoading ? (
          <>
            <select
              name="type"
              disabled={!isEditing}
              onChange={(e) => handleOnChange(e)}
              value={value.type ? value.type : type}
            >
              <option selected disabled>
                Choose an option
              </option>
              {MBTI.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
            {!isSharedProfile && (
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
            )}
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <span>{value.type ? value.type : type}</span>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}

                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" />
                        Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading &&
          !shareableView &&
          !isSharedProfile &&
          !isSharedProfile && (
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

  const EnneagramDropdowns = () => {
    const [type, setType] = useState(null);
    const [wing, setWing] = useState(null);
    const [tritype, setTritype] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("Enneagram", userType)
        .then((data) => {
          setType(data.type);
          setWing(data.wing);
          setTritype(data.tritype);
          setDetail(data.detail);
          setShowEnneagramLabels(true);
          setHasData(true);
          updateTestStore({ Enneagram: { ...data } });
          if (!personalityFormsCompleted.includes("Enneagram")) {
            addPersonalityCompletedForm("Enneagram");
          }
          setShowEnneagramLabels(true);
          setIsLoading(false);
          const { detail, userId, ...values } = data;
          localStorage.setItem("Enneagram", JSON.stringify({ ...values }));
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="enneagram_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Type</label>
              <select
                name="type"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.type ? value.type : type}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {ENNEAGRAM_TYPE.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Wing</label>
              <select
                name="wing"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.wing ? value.wing : wing}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {ENNEAGRAM_WING.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Tritype</label>
              <select
                name="tritype"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.tritype ? value.tritype : tritype}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {ENNEAGRAM_TRITYPE.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          {showEnneagramLabels && <label>Type</label>}
                          <span>{value.type ? value.type : type}</span>
                        </div>
                        <div className="row">
                          {showEnneagramLabels && <label>Wing</label>}
                          <span>{value.wing ? value.wing : wing}</span>
                        </div>
                        <div className="row">
                          {showEnneagramLabels && <label>Tritype</label>}
                          <span>{value.tritype ? value.tritype : tritype}</span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const BigFiveDropdowns = () => {
    const [openness, setOpenness] = useState(null);
    const [agreeableness, setAgreeableness] = useState(null);
    const [conscientiousness, setConscientiousness] = useState(null);
    const [extraversion, setExtraversion] = useState(null);
    const [neuroticism, setNeuroticism] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("BigFive", userType)
        .then((data) => {
          setOpenness(data.openness);
          setAgreeableness(data.agreeableness);
          setConscientiousness(data.conscientiousness);
          setExtraversion(data.extraversion);
          setNeuroticism(data.neuroticism);
          setShowBigFiveLabels(true);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ BigFive: { ...data } });
          if (!personalityFormsCompleted.includes("BigFive")) {
            addPersonalityCompletedForm("BigFive");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("BigFive", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="big_five_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Openness</label>
              <select
                name="openness"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.openness ? value.openness : openness}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {BIG_FIVE_VALUES.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Agreeableness</label>
              <select
                name="agreeableness"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.agreeableness ? value.agreeableness : agreeableness
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {BIG_FIVE_VALUES.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Conscientiousness</label>
              <select
                name="conscientiousness"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.conscientiousness
                    ? value.conscientiousness
                    : conscientiousness
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {BIG_FIVE_VALUES.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Extraversion</label>
              <select
                name="extraversion"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.extraversion ? value.extraversion : extraversion}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {BIG_FIVE_VALUES.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Neuroticism</label>
              <select
                name="neuroticism"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.neuroticism ? value.neuroticism : neuroticism}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {BIG_FIVE_VALUES.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {" "}
                    {hasData ? (
                      <>
                        <div className="row">
                          {showBigFiveLabels && <label>Openness</label>}
                          <span>
                            {value.openness ? value.openness : openness}
                          </span>
                        </div>
                        <div className="row">
                          {showBigFiveLabels && <label>Agreeableness</label>}
                          <span>
                            {value.agreeableness
                              ? value.agreeableness
                              : agreeableness}
                          </span>
                        </div>
                        <div className="row">
                          {showBigFiveLabels && (
                            <label>Conscientiousness</label>
                          )}
                          <span>
                            {value.conscientiousness
                              ? value.conscientiousness
                              : conscientiousness}
                          </span>
                        </div>
                        <div className="row">
                          {showBigFiveLabels && <label>Extraversion</label>}
                          <span>
                            {value.extraversion
                              ? value.extraversion
                              : extraversion}
                          </span>
                        </div>
                        <div className="row">
                          {showBigFiveLabels && <label>Neuroticism</label>}
                          <span>
                            {value.neuroticism
                              ? value.neuroticism
                              : neuroticism}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  // TODO: create a common function for IQ AND EQ.
  const IQDropdown = () => {
    const [iq, setIQ] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("IQ", userType)
        .then((data) => {
          setIQ(data.iq);
          setDetail(data.detail);
          setHasData(true);
          if (!personalityFormsCompleted.includes("IQ")) {
            addPersonalityCompletedForm("IQ");
          }
          updateTestStore({ IQ: { ...data } });
          const { detail, userId, ...values } = data;
          localStorage.setItem("IQ", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="iq_dropdown">
        {isEditing && !isLoading ? (
          <>
            <select
              name="iq"
              disabled={!isEditing}
              onChange={(e) => handleOnChange(e)}
              value={value.iq ? value.iq : iq}
            >
              <option selected disabled>
                Choose an option
              </option>
              {IQ.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <span>{value.iq ? value.iq : iq}</span>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const EQDropdowns = () => {
    const [selfAwareness, setSelfAwareness] = useState(null);
    const [positiveOutlook, setPositiveOutlook] = useState(null);
    const [selfControl, setSelfControl] = useState(null);
    const [adaptability, setAdaptability] = useState(null);
    const [empathy, setEmpathy] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("EQ", userType)
        .then((data) => {
          setSelfAwareness(data.selfAwareness);
          setPositiveOutlook(data.positiveOutlook);
          setSelfControl(data.selfControl);
          setAdaptability(data.adaptability);
          setEmpathy(data.empathy);
          setShowEQLabels(true);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ EQ: { ...data } });
          if (!personalityFormsCompleted.includes("EQ")) {
            addPersonalityCompletedForm("EQ");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("EQ", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="eq_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Self awareness</label>
              <select
                name="selfAwareness"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.selfAwareness ? value.selfAwareness : selfAwareness
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EQ.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Positive outlook</label>
              <select
                name="positiveOutlook"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.positiveOutlook
                    ? value.positiveOutlook
                    : positiveOutlook
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EQ.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Self control</label>
              <select
                name="selfControl"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.selfControl ? value.selfControl : selfControl}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EQ.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Adaptability</label>
              <select
                name="adaptability"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.adaptability ? value.adaptability : adaptability}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EQ.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Empathy</label>
              <select
                name="empathy"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.empathy ? value.empathy : empathy}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {EQ.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          {showEQLabels && <label>Self Awareness</label>}
                          <span>
                            {value.selfAwareness
                              ? value.selfAwareness
                              : selfAwareness}
                          </span>
                        </div>

                        <div className="row">
                          {showEQLabels && <label>Positive Outlook</label>}
                          <span>
                            {value.positiveOutlook
                              ? value.positiveOutlook
                              : positiveOutlook}
                          </span>
                        </div>

                        <div className="row">
                          {showEQLabels && <label>Self Control</label>}
                          <span>
                            {value.selfControl
                              ? value.selfControl
                              : selfControl}
                          </span>
                        </div>

                        <div className="row">
                          {showEQLabels && <label>Adaptability</label>}
                          <span>
                            {value.adaptability
                              ? value.adaptability
                              : adaptability}
                          </span>
                        </div>

                        <div className="row">
                          {showEQLabels && <label>Empathy</label>}
                          <span>{value.empathy ? value.empathy : empathy}</span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const AstrologyDropdowns = () => {
    const [sun, setSun] = useState(null);
    const [moon, setMoon] = useState(null);
    const [ascendent, setAscendent] = useState(null);
    const [element, setElement] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("Astrology", userType)
        .then((data) => {
          setSun(data.sun);
          setMoon(data.moon);
          setAscendent(data.ascendent);
          setElement(data.element);
          setShowAstrologyLabels(true);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ Astrology: { ...data } });
          if (!personalityFormsCompleted.includes("Astrology")) {
            addPersonalityCompletedForm("Astrology");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("Astrology", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="astrology_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Sun</label>
              <select
                name="sun"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.sun ? value.sun : sun}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {ZODIAC.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Moon</label>
              <select
                name="moon"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.moon ? value.moon : moon}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {ZODIAC.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Ascendent</label>
              <select
                name="ascendent"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.ascendent ? value.ascendent : ascendent}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {ZODIAC.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Element</label>
              <select
                name="element"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.element ? value.element : element}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {ELEMENTS.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          {showAstrologyLabels && <label>Sun</label>}
                          <span>{value.sun ? value.sun : sun}</span>
                        </div>

                        <div className="row">
                          {showAstrologyLabels && <label>Moon</label>}
                          <span>{value.moon ? value.moon : moon}</span>
                        </div>

                        <div className="row">
                          {showAstrologyLabels && <label>Ascendent</label>}
                          <span>
                            {value.ascendent ? value.ascendent : ascendent}
                          </span>
                        </div>

                        <div className="row">
                          {showAstrologyLabels && <label>Element</label>}
                          <span>{value.element ? value.element : element}</span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const Mindset = () => {
    const [mindset, setMindset] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("Mindset", userType)
        .then((data) => {
          setMindset(data.mindset);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ Mindset: { ...data } });
          if (!personalityFormsCompleted.includes("Mindset")) {
            addPersonalityCompletedForm("Mindset");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("Mindset", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="mindset_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <select
                name="mindset"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.mindset ? value.mindset : mindset}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {MINDSET.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <div className="row">
                        <span>{value.mindset ? value.mindset : mindset}</span>
                      </div>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const Grit = () => {
    const [grit, setGrit] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("Grit", userType)
        .then((data) => {
          setGrit(data.grit);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ Grit: { ...data } });
          if (!personalityFormsCompleted.includes("Grit")) {
            addPersonalityCompletedForm("Grit");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("Grit", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="grit_input">
        {isEditing && !isLoading ? (
          <>
            <input
              type="number"
              id="score"
              name="grit"
              onChange={(e) => handleOnChange(e)}
              min="0"
              max="5"
              step="0.1"
              value={value.grit ? value.grit : grit}
              disabled={!isEditing}
            />
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <span>{value.grit ? value.grit : grit}</span>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const LoveLanguages = () => {
    const [wordsAffirmation, setWordsAffirmation] = useState(null);
    const [qualityTime, setQualityTime] = useState(null);
    const [physicalTouch, setPhysicalTouch] = useState(null);
    const [actsService, setActsService] = useState(null);
    const [receivingGifts, setReceivingGifts] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("LoveLanguages", userType)
        .then((data) => {
          setWordsAffirmation(data.wordsAffirmation);
          setQualityTime(data.qualityTime);
          setPhysicalTouch(data.physicalTouch);
          setActsService(data.actsService);
          setReceivingGifts(data.receivingGifts);
          setShowLoveLanguagesLabels(true);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ LoveLanguages: { ...data } });
          if (!relationshipFormsCompleted.includes("LoveLanguages")) {
            addRelationshipCompletedForm("LoveLanguages");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("LoveLanguages", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch((error) => setIsLoading(false));
    }, []);

    return (
      <div className="love_languages_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Words of Affirmation</label>
              <select
                name="wordsAffirmation"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.wordsAffirmation
                    ? value.wordsAffirmation
                    : wordsAffirmation
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {LOVE_LANGUAGES.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Quality Time</label>
              <select
                name="qualityTime"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.qualityTime ? value.qualityTime : qualityTime}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {LOVE_LANGUAGES.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Physical Touch</label>
              <select
                name="physicalTouch"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.physicalTouch ? value.physicalTouch : physicalTouch
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {LOVE_LANGUAGES.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Acts of Service</label>
              <select
                name="actsService"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.actsService ? value.actsService : actsService}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {LOVE_LANGUAGES.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Receiving Gifts</label>
              <select
                name="receivingGifts"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.receivingGifts ? value.receivingGifts : receivingGifts
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {LOVE_LANGUAGES.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          {showLoveLanguagesLabels && (
                            <label>Words of Affirmation</label>
                          )}
                          <span>
                            {value.wordsAffirmation
                              ? value.wordsAffirmation + "%"
                              : wordsAffirmation && wordsAffirmation + "%"}
                          </span>
                        </div>

                        <div className="row">
                          {showLoveLanguagesLabels && (
                            <label>Quality Time</label>
                          )}
                          <span>
                            {value.qualityTime
                              ? value.qualityTime + "%"
                              : qualityTime && qualityTime + "%"}
                          </span>
                        </div>

                        <div className="row">
                          {showLoveLanguagesLabels && (
                            <label>Physical Touch</label>
                          )}
                          <span>
                            {value.physicalTouch
                              ? value.physicalTouch + "%"
                              : physicalTouch && physicalTouch + "%"}
                          </span>
                        </div>

                        <div className="row">
                          {showLoveLanguagesLabels && (
                            <label>Acts of Service</label>
                          )}
                          <span>
                            {value.actsService
                              ? value.actsService + "%"
                              : actsService && actsService + "%"}
                          </span>
                        </div>

                        <div className="row">
                          {showLoveLanguagesLabels && (
                            <label>Receiving Gifts</label>
                          )}
                          <span>
                            {value.receivingGifts
                              ? value.receivingGifts + "%"
                              : receivingGifts && receivingGifts + "%"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const AttachmentStyle = () => {
    const [style, setStyle] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      getCollectionById("AttachmentStyle", userType)
        .then((data) => {
          setStyle(data.style);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ AttachmentStyle: { ...data } });
          if (!relationshipFormsCompleted.includes("AttachmentStyle")) {
            addRelationshipCompletedForm("AttachmentStyle");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem(
            "AttachmentStyle",
            JSON.stringify({ ...values })
          );
          setIsLoading(false);
        })
        .catch((error) => setIsLoading(false));
    }, []);

    return (
      <div className="attachment_style_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <select
                name="style"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.style ? value.style : style}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {ATTACHMENT_STYLE.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <div className="row">
                        <span>{value.style ? value.style : style}</span>
                      </div>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const FlirtingStyle = () => {
    const [physical, setPhysical] = useState(null);
    const [traditional, setTraditional] = useState(null);
    const [polite, setPolite] = useState(null);
    const [sincere, setSincere] = useState(null);
    const [playful, setPlayful] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      getCollectionById("FlirtingStyle", userType)
        .then((data) => {
          setPhysical(data.physical);
          setTraditional(data.traditional);
          setPolite(data.polite);
          setSincere(data.sincere);
          setPlayful(data.playful);
          setShowFlirtingStyleLabels(true);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ FlirtingStyle: { ...data } });
          if (!relationshipFormsCompleted.includes("FlirtingStyle")) {
            addRelationshipCompletedForm("FlirtingStyle");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("FlirtingStyle", JSON.stringify({ ...values }));
          setIsLoading(false);
        })
        .catch((error) => setIsLoading(false));
    }, []);

    return (
      <div className="attachment_style_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Physical</label>
              <select
                name="physical"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.physical ? value.physical : physical}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FLIRTING_STYLE.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Traditional</label>
              <select
                name="traditional"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.traditional ? value.traditional : traditional}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FLIRTING_STYLE.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Polite</label>
              <select
                name="polite"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.polite ? value.polite : polite}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FLIRTING_STYLE.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Sincere</label>
              <select
                name="sincere"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.sincere ? value.sincere : sincere}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FLIRTING_STYLE.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Playful</label>
              <select
                name="playful"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.playful ? value.playful : playful}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FLIRTING_STYLE.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          {showFlirtingStyleLabels && <label>Physical</label>}
                          <span>
                            {value.physical ? value.physical : physical}
                          </span>
                        </div>

                        <div className="row">
                          {showFlirtingStyleLabels && (
                            <label>Traditional</label>
                          )}
                          <span>
                            {value.traditional
                              ? value.traditional
                              : traditional}
                          </span>
                        </div>

                        <div className="row">
                          {showFlirtingStyleLabels && <label>Polite</label>}
                          <span>{value.polite ? value.polite : polite}</span>
                        </div>

                        <div className="row">
                          {showFlirtingStyleLabels && <label>Sincere</label>}
                          <span>{value.sincere ? value.sincere : sincere}</span>
                        </div>

                        <div className="row">
                          {showFlirtingStyleLabels && <label>Playful</label>}
                          <span>{value.playful ? value.playful : playful}</span>
                        </div>
                      </>
                    ) : (
                      <span> Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const FTIDropdowns = () => {
    const [explorer, setExplorer] = useState(null);
    const [builder, setBuilder] = useState(null);
    const [director, setDirector] = useState(null);
    const [negotiator, setNegotiator] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      getCollectionById("FisherTemperamentInventory", userType)
        .then((data) => {
          setExplorer(data.explorer);
          setBuilder(data.builder);
          setDirector(data.director);
          setNegotiator(data.negotiator);
          setShowFTILabels(true);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ FisherTemperamentInventory: { ...data } });
          if (
            !relationshipFormsCompleted.includes("FisherTemperamentInventory")
          ) {
            addRelationshipCompletedForm("FisherTemperamentInventory");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem(
            "FisherTemperamentInventory",
            JSON.stringify({ ...values })
          );
          setIsLoading(false);
        })
        .catch((error) => setIsLoading(false));
    }, []);

    return (
      <div className="attachment_style_dropdowns">
        {isEditing ? (
          <>
            <div className="row">
              <label>Explorer</label>
              <select
                name="explorer"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.explorer ? value.explorer : explorer}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FTI.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Builder</label>
              <select
                name="builder"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.builder ? value.builder : builder}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FTI.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Director</label>
              <select
                name="director"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.director ? value.director : director}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FTI.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Negotiator</label>
              <select
                name="negotiator"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.negotiator ? value.negotiator : negotiator}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {FTI.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          {showFTILabels && <label>Explorer</label>}
                          <span>
                            {value.explorer ? value.explorer : explorer}
                          </span>
                        </div>

                        <div className="row">
                          {showFTILabels && <label>Builder</label>}
                          <span>{value.builder ? value.builder : builder}</span>
                        </div>

                        <div className="row">
                          {showFTILabels && <label>Director</label>}
                          <span>
                            {value.director ? value.director : director}
                          </span>
                        </div>

                        <div className="row">
                          {showFTILabels && <label>Negotiator</label>}
                          <span>
                            {value.negotiator ? value.negotiator : negotiator}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const GallupStrengthsFinderDropdowns = () => {
    const [one, setOne] = useState(null);
    const [two, setTwo] = useState(null);
    const [three, setThree] = useState(null);
    const [four, setFour] = useState(null);
    const [five, setFive] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      getCollectionById("GallupStrengthsFinder", userType)
        .then((data) => {
          setOne(data.one);
          setTwo(data.two);
          setThree(data.three);
          setFour(data.four);
          setFive(data.five);
          setDetail(data.detail);
          setShowGallupLabels(true);
          setHasData(true);
          updateTestStore({ GallupStrengthsFinder: { ...data } });
          if (!careerFormsCompleted.includes("GallupStrengthsFinder")) {
            addCareerCompletedForm("GallupStrengthsFinder");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem(
            "GallupStrengthsFinder",
            JSON.stringify({ ...values })
          );
          setIsLoading(false);
        })
        .catch((error) => setIsLoading(false));
    }, []);

    return (
      <div className="gallup_strengths_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>1.</label>
              <select
                name="one"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.one ? value.one : one}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {GALLUPSTRENGTHSFINDER.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>2.</label>
              <select
                name="two"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.two ? value.two : two}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {GALLUPSTRENGTHSFINDER.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>3.</label>
              <select
                name="three"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.three ? value.three : three}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {GALLUPSTRENGTHSFINDER.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>4.</label>
              <select
                name="four"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.four ? value.four : four}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {GALLUPSTRENGTHSFINDER.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>5.</label>
              <select
                name="five"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.five ? value.five : five}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {GALLUPSTRENGTHSFINDER.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          {showGallupLabels && <label>1.</label>}
                          <span>{value.one ? value.one : one}</span>
                        </div>
                        <div className="row">
                          {showGallupLabels && <label>2.</label>}
                          <span>{value.two ? value.two : two}</span>
                        </div>
                        <div className="row">
                          {showGallupLabels && <label>3.</label>}
                          <span>{value.three ? value.three : three}</span>
                        </div>
                        <div className="row">
                          {showGallupLabels && <label>4.</label>}
                          <span>{value.four ? value.four : four}</span>
                        </div>
                        <div className="row">
                          {showGallupLabels && <label>5.</label>}
                          <span>{value.five ? value.five : five}</span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const DISCDropdowns = () => {
    const [dominance, setDominance] = useState(null);
    const [influence, setInfluence] = useState(null);
    const [conscientiousness, setConscientiousness] = useState(null);
    const [steadiness, setSteadiness] = useState(null);
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      getCollectionById("DISC", userType)
        .then((data) => {
          setDominance(data.dominance);
          setInfluence(data.influence);
          setConscientiousness(data.conscientiousness);
          setSteadiness(data.steadiness);
          setShowDISCLabels(true);
          setIsLoading(false);
          setDetail(data.detail);
          setHasData(true);
          updateTestStore({ DISC: { ...data } });
          if (!careerFormsCompleted.includes("DISC")) {
            addCareerCompletedForm("DISC");
          }
          const { detail, userId, ...values } = data;
          localStorage.setItem("DISC", JSON.stringify({ ...values }));
        })
        .catch((error) => setIsLoading(false));
    }, []);

    return (
      <div className="disc_dropdowns">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <label>Dominance</label>
              <select
                name="dominance"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.dominance ? value.dominance : dominance}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {DISC.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Influence</label>
              <select
                name="influence"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.influence ? value.influence : influence}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {DISC.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Conscientiousness</label>
              <select
                name="conscientiousness"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.conscientiousness
                    ? value.conscientiousness
                    : conscientiousness
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {DISC.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Steadiness</label>
              <select
                name="steadiness"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.steadiness ? value.steadiness : steadiness}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {DISC.map((value) => (
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          {showDISCLabels && <label>Dominance</label>}
                          <span>
                            {value.dominance ? value.dominance : dominance}
                          </span>
                        </div>
                        <div className="row">
                          {showDISCLabels && <label>Influence</label>}
                          <span>
                            {value.influence ? value.influence : influence}
                          </span>
                        </div>

                        <div className="row">
                          {showDISCLabels && <label>Conscientiousness</label>}
                          <span>
                            {value.conscientiousness
                              ? value.conscientiousness
                              : conscientiousness}
                          </span>
                        </div>

                        <div className="row">
                          {showDISCLabels && <label>Steadiness</label>}
                          <span>
                            {value.steadiness ? value.steadiness : steadiness}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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

  const ViaCareerStrengths = () => {
    const [one, setOne] = useState({});
    const [two, setTwo] = useState({});
    const [three, setThree] = useState({});
    const [four, setFour] = useState({});
    const [five, setFive] = useState({});
    const [six, setSix] = useState({});
    const [detail, setDetail] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCollectionById("ViaCareerStrengths", userType)
        .then((data) => {
          setOne({
            ...one,
            strength: data.one_strength,
            score: data.one_score,
          });
          setTwo({
            ...two,
            strength: data.two_strength,
            score: data.two_score,
          });
          setThree({
            ...three,
            strength: data.three_strength,
            score: data.three_score,
          });
          setFour({
            ...four,
            strength: data.four_strength,
            score: data.four_score,
          });
          setFive({
            ...five,
            strength: data.five_strength,
            score: data.five_score,
          });
          setSix({
            ...six,
            strength: data.six_strength,
            score: data.six_score,
          });
          setDetail(data.detail);
          updateTestStore({ ViaCareerStrengths: { ...data } });
          if (!careerFormsCompleted.includes("ViaCareerStrengths")) {
            addCareerCompletedForm("ViaCareerStrengths");
          }
          setHasData(true);
          const { detail, userId, ...values } = data;
          localStorage.setItem(
            "ViaCareerStrengths",
            JSON.stringify({ ...values })
          );
          setIsLoading(false);
        })
        .catch((error) => setIsLoading(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="via_career_strengths">
        {isEditing && !isLoading ? (
          <>
            <div className="row">
              <select
                name="one_strength"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.one_strength ? value.one_strength : one.strength}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {VIA_CARRER_STRENGTHS.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="score"
                name="one_score"
                onChange={(e) => handleOnChange(e)}
                min="0"
                max="5"
                step="0.1"
                value={value.one_score ? value.one_score : one.score}
                disabled={!isEditing}
              />
            </div>
            <div className="row">
              <select
                name="two_strength"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.two_strength ? value.two_strength : two.strength}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {VIA_CARRER_STRENGTHS.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="score"
                name="two_score"
                onChange={(e) => handleOnChange(e)}
                min="0"
                max="5"
                step="0.1"
                value={value.two_score ? value.two_score : two.score}
                disabled={!isEditing}
              />
            </div>
            <div className="row">
              <select
                name="three_strength"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.three_strength ? value.three_strength : three.strength
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {VIA_CARRER_STRENGTHS.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="score"
                name="three_score"
                onChange={(e) => handleOnChange(e)}
                min="0"
                max="5"
                step="0.1"
                value={value.three_score ? value.three_score : three.score}
                disabled={!isEditing}
              />
            </div>
            <div className="row">
              <select
                name="four_strength"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.four_strength ? value.four_strength : four.strength
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {VIA_CARRER_STRENGTHS.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="score"
                name="four_score"
                onChange={(e) => handleOnChange(e)}
                min="0"
                max="5"
                step="0.1"
                value={value.four_score ? value.four_score : four.score}
                disabled={!isEditing}
              />
            </div>
            <div className="row">
              <select
                name="five_strength"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={
                  value.five_strength ? value.five_strength : five.strength
                }
              >
                <option selected disabled>
                  Choose an option
                </option>
                {VIA_CARRER_STRENGTHS.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="score"
                name="five_score"
                onChange={(e) => handleOnChange(e)}
                min="0"
                max="5"
                step="0.1"
                value={value.five_score ? value.five_score : five.score}
                disabled={!isEditing}
              />
            </div>
            <div className="row">
              <select
                name="six_strength"
                disabled={!isEditing}
                onChange={(e) => handleOnChange(e)}
                value={value.six_strength ? value.six_strength : six.strength}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {VIA_CARRER_STRENGTHS.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="score"
                name="six_score"
                onChange={(e) => handleOnChange(e)}
                min="0"
                max="5"
                step="0.1"
                value={value.six_score ? value.six_score : six.score}
                disabled={!isEditing}
              />
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
                {shareableView && isTestHidden(collectionName) ? (
                  <div className="hidden_view">
                    <EyeInvisibleFilled />
                  </div>
                ) : (
                  <>
                    {hasData ? (
                      <>
                        <div className="row">
                          <span>
                            {value.one_strength
                              ? value.one_strength
                              : one.strength}
                          </span>
                          <span>
                            {value.one_score ? value.one_score : one.score}
                          </span>
                        </div>
                        <div className="row">
                          <span>
                            {value.two_strength
                              ? value.two_strength
                              : two.strength}
                          </span>
                          <span>
                            {value.two_score ? value.two_score : two.score}
                          </span>
                        </div>
                        <div className="row">
                          <span>
                            {value.three_strength
                              ? value.three_strength
                              : three.strength}
                          </span>
                          <span>
                            {value.three_score
                              ? value.three_score
                              : three.score}
                          </span>
                        </div>
                        <div className="row">
                          <span>
                            {value.four_strength
                              ? value.four_strength
                              : four.strength}
                          </span>
                          <span>
                            {value.four_score ? value.four_score : four.score}
                          </span>
                        </div>
                        <div className="row">
                          <span>
                            {value.five_strength
                              ? value.five_strength
                              : five.strength}
                          </span>
                          <span>
                            {value.five_score ? value.five_score : five.score}
                          </span>
                        </div>
                        <div className="row">
                          <span>
                            {value.six_strength
                              ? value.six_strength
                              : six.strength}
                          </span>
                          <span>
                            {value.six_score ? value.six_score : six.score}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span>Test not completed yet.</span>
                    )}
                    {!isSharedProfile && detail && (
                      <Link
                        target={detail ? "_blank" : "_self"}
                        to={
                          detail ? verifyUrl(detail) : verifyUrl(value.detail)
                        }
                        className="detail_button"
                      >
                        {" "}
                        <img src={GlassDetailImg} alt="detail" /> Detail
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !shareableView && !isSharedProfile && (
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
    <div className="test_form_container">
      <div className="header">
        <h2>{title}</h2>
        {shareableView && (
          <>
            {!isTestHidden(collectionName) ? (
              <EyeInvisibleFilled
                onClick={() => {
                  setIsEditingSharing(true);
                  setSharedTestsHidden({
                    ...sharedTestsHidden,
                    [collectionName]: true,
                  });
                }}
              />
            ) : (
              <EyeFilled
                onClick={() => {
                  setIsEditingSharing(true);
                  setSharedTestsHidden({
                    ...sharedTestsHidden,
                    [collectionName]: false,
                  });
                }}
              />
            )}
          </>
        )}
        {!isEditing && !shareableView && !isSharedProfile && (
          <img onClick={() => setIsEditing(true)} src={EditButton} alt="edit" />
        )}
        {isEditing && (
          <button className="close_button" onClick={() => setIsEditing(false)}>
            X
          </button>
        )}
      </div>
      <form>
        {collectionName === "MBTI" && MBTIDropwdowns()}
        {collectionName === "Enneagram" && EnneagramDropdowns()}
        {collectionName === "BigFive" && BigFiveDropdowns()}
        {collectionName === "IQ" && IQDropdown()}
        {collectionName === "EQ" && EQDropdowns()}
        {collectionName === "Astrology" && AstrologyDropdowns()}
        {collectionName === "Mindset" && Mindset()}
        {collectionName === "Grit" && Grit()}
        {collectionName === "LoveLanguages" && LoveLanguages()}
        {collectionName === "AttachmentStyle" && AttachmentStyle()}
        {collectionName === "FlirtingStyle" && FlirtingStyle()}
        {collectionName === "FisherTemperamentInventory" && FTIDropdowns()}
        {collectionName === "GallupStrengthsFinder" &&
          GallupStrengthsFinderDropdowns()}
        {collectionName === "DISC" && DISCDropdowns()}
        {collectionName === "ViaCareerStrengths" && ViaCareerStrengths()}
      </form>
    </div>
  );
};

export default TestForm;
