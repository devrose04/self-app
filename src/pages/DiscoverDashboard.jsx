import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import "../styles/discoverDashboard.scss";
import TestForm from "../components/TestForm";
import {
  MBTI_ASSESSMENT_URL,
  ENNEAGRAM_ASSESSMENT_URL,
  BIG_FIVE_ASSESSMENT_URL,
  IQ_ASSESSMENT_URL,
  EQ_ASSESSMENT_URL,
  MINDSET_ASSESSMENT_URL,
  LOVE_LANGUAGES_URL,
  ATTACHMENT_STYLE_ASSESSMENT_URL,
  FLIRTING_STYLE_ASSESSMENT_URL,
  FTI_ASSESSMENT_URL,
  GRIT_ASSESSMENT_URL,
  DISC_ASSESSMENT_URL,
  VIA_STRENGTHS_ASSESSMENT_URL,
  GALLUP_ASSESSMENT_URL,
} from "../constants/assessments-urls";
import {
  getPercentage,
  personalityCardData,
  relationshipCardData,
  saveHiddenTests,
} from "../utils";
import ProgressBar from "../components/ProgressBar";
import { CopyOutlined } from "@ant-design/icons";
import {
  CheckCircleOutlined,
  InfoCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons/lib/icons";
import Spinner from "../components/Spinner";
import Share from "../images/Share.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal";
import { ASTROLOGY_ASSESSMENT_URL } from "../constants";
import Interrelationships from "../components/Interrelationships";

const DiscoverDashboard = () => {
  const [userData, setUserData] = useState(null);

  const [user, error] = useAuthState(auth);
  const [personalityPercentage, setPersonalityPercentage] = useState(0);
  const [relationshipPercentage, setRelationshipPercentage] = useState(0);
  const [careerPercentage, setCareerPercentage] = useState(0);
  const [personalityFormsCompleted, setPersonalityFormsCompleted] = useState(
    []
  );
  const [relationshipFormsCompleted, setRelationshipFormsCompleted] = useState(
    []
  );
  const [careerFormsCompleted, setCareerFormsCompleted] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [sharedTestsHidden, setSharedTestsHidden] = useState(
    localStorage.getItem("sharedTestsHidden") !== "undefined"
      ? JSON.parse(localStorage.getItem("sharedTestsHidden"))
      : {
          Astrology: false,
          AttachmentStyle: false,
          BigFive: false,
          DISC: false,
          EQ: false,
          Enneagram: false,
          FisherTemperamentInventory: false,
          FlirtingStyle: false,
          GallupStrengthsFinder: false,
          Grit: false,
          IQ: false,
          LoveLanguages: false,
          MBTI: false,
          Mindset: false,
          ViaCareerStrengths: false,
        }
  );
  const [loadingHideTest, setLoadingHideTest] = useState(false);
  const [isEditingSharing, setIsEditingSharing] = useState(false);
  const [showModalPersonality, setShowModalPersonality] = useState(false);
  const [showModalRelationship, setShowModalRelationship] = useState(false);

  const navigate = useNavigate();

  const isTab1 = selectedTab === 1;
  const isTab2 = selectedTab === 2;
  const isTab3 = selectedTab === 3;

  const notify = () => {
    toast.success("Link copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      className: "toast",
    });
  };

  const getUserData = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const addPersonalityCompletedForm = (newCompletedForm) => {
    setPersonalityFormsCompleted((formsCompleted) => [
      ...formsCompleted,
      newCompletedForm,
    ]);
  };

  const addRelationshipCompletedForm = (newCompletedForm) => {
    setRelationshipFormsCompleted((formsCompleted) => [
      ...formsCompleted,
      newCompletedForm,
    ]);
  };

  const addCareerCompletedForm = (newCompletedForm) => {
    setCareerFormsCompleted((formsCompleted) => [
      ...formsCompleted,
      newCompletedForm,
    ]);
  };

  const handleSaveHiddenTests = async (data, userId) => {
    setLoadingHideTest(true);
    await saveHiddenTests(data, userId);
    setLoadingHideTest(false);
    setIsEditingSharing(false);
  };

  const copyShareLInk = () => {
    const url = new URL(`${window.location.origin}/shared-profile/${user.uid}`);
    navigator.clipboard.writeText(url).then(() => {
      notify();
    });
  };

  useEffect(() => {
    const percentage = getPercentage(personalityFormsCompleted, 8);
    setPersonalityPercentage(percentage);
  }, [personalityFormsCompleted]);

  useEffect(() => {
    const percentage = getPercentage(relationshipFormsCompleted, 4);
    setRelationshipPercentage(percentage);
  }, [relationshipFormsCompleted]);

  useEffect(() => {
    const percentage = getPercentage(careerFormsCompleted, 3);
    setCareerPercentage(percentage);
  }, [careerFormsCompleted]);

  useEffect(() => {
    if (user) {
      getUserData(user);
    }
  }, [user]);

  if (!user || error) {
    return navigate("/discover/login");
  }

  if (user) {
    return (
      <div className="profile">
        <div className="titles">
          <h1>Hi {userData?.firstName}</h1>
          <h2>
            Welcome to your profile <br />
            <br />
            Below are the results of any of the tests you’ve completed. Take or
            retake any assessments as you want.
          </h2>
        </div>
        <div className="tabs_container">
          <div className="referral_content">
            <div className="info_buttons">
              <button
                className="info_button"
                onClick={() => {
                  const url = `${window.location.origin}/signup?userId=${user.uid}`;
                  navigator.clipboard.writeText(url).then(() => {
                    notify();
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 4000);
                  });
                }}
              >
                Invite others to Self
                {!isCopied ? (
                  <CopyOutlined />
                ) : (
                  <CheckCircleOutlined color="green" />
                )}
              </button>
              <a
                href="mailto:getselfapp@gmail.com?subject=Feedback"
                className="info_button feedback"
              >
                Share feedback with us
                <InfoCircleFilled />
              </a>
              <a
                href="mailto:getselfapp@gmail.com?subject=Request features"
                className="info_button features"
              >
                Request features
                <QuestionCircleFilled />
              </a>
            </div>
            <div
              className="score_container"
              onMouseOver={() => setShowScoreInfo(true)}
              onMouseOut={() => setShowScoreInfo(false)}
            >
              <div className="score">
                You’ve earned {userData?.score} Points
                <InfoCircleFilled />
              </div>
              {showScoreInfo && (
                <div className="points_info">
                  <h3>Earn Points</h3>
                  <div className="row">
                    <span>Invite someone to Self</span>
                    <span className="point">+10 pts</span>
                  </div>
                  <div className="row">
                    <span>Share Profile</span>
                    <span className="point">+2 pts</span>
                  </div>
                  <div className="row">
                    <span>Take an Assessment</span>
                    <span className="point">+2 pts</span>
                  </div>

                  <h3 className="second_title">Use Points</h3>
                  <div className="row">
                    <span>TBD (early access)</span>
                    <span className="point yellow">+40 pts</span>
                  </div>
                  <div className="row">
                    <span>TBD (free stuff)</span>
                    <span className="point yellow">TBD pts</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="tabs">
            <div className="main-tabs">
              <button
                className={`tab ${selectedTab === 1 ? "active" : ""}`}
                onClick={() => setSelectedTab(1)}
              >
                Results
              </button>
              <button
                className={`tab ${selectedTab === 2 ? "active" : ""}`}
                onClick={() => setSelectedTab(2)}
              >
                Interrelationships
              </button>
              <button
                className={`tab ${selectedTab === 3 ? "active" : ""}`}
                onClick={() => setSelectedTab(3)}
              >
                Shareable Profile
              </button>
            </div>
            <button className="share_button" onClick={() => copyShareLInk()}>
              <span>Share Page</span>
              <img src={Share} alt="" />
            </button>
          </div>
          <ToastContainer />
        </div>
        {(isTab1 || isTab3) && (
          <>
            <div className="personality">
              <div className="heading">
                {showModalPersonality && (
                  <Modal
                    userId={user.uid}
                    data={personalityCardData()}
                    setShowModal={setShowModalPersonality}
                    title="Personality"
                  />
                )}
                <h2>Personality</h2>
                {isTab3 ? (
                  <>
                    <button
                      className="share_button"
                      onClick={() => setShowModalPersonality(true)}
                    >
                      <span>Share Personality Card</span>
                      <img src={Share} alt="" />
                    </button>
                    <div className="edit_save">
                      {isEditingSharing && (
                        <span>You have unsaved changes.</span>
                      )}
                      <button
                        className="save_button"
                        onClick={() =>
                          handleSaveHiddenTests(sharedTestsHidden, user.uid)
                        }
                      >
                        <span>save shared tests</span>
                        {loadingHideTest && <Spinner width="25" height="25" />}
                      </button>
                    </div>
                  </>
                ) : (
                  <ProgressBar percentage={personalityPercentage} />
                )}
              </div>
              <div className="tests">
                <div className="col">
                  <TestForm
                    collectionName="MBTI"
                    title="Myer Briggs (MBTI)"
                    assessment_url={MBTI_ASSESSMENT_URL}
                    addPersonalityCompletedForm={addPersonalityCompletedForm}
                    personalityFormsCompleted={personalityFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                  <TestForm
                    collectionName="Enneagram"
                    title="Enneagram"
                    assessment_url={ENNEAGRAM_ASSESSMENT_URL}
                    addPersonalityCompletedForm={addPersonalityCompletedForm}
                    personalityFormsCompleted={personalityFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                </div>
                <TestForm
                  collectionName="BigFive"
                  title="Big Five Personality"
                  assessment_url={BIG_FIVE_ASSESSMENT_URL}
                  addPersonalityCompletedForm={addPersonalityCompletedForm}
                  personalityFormsCompleted={personalityFormsCompleted}
                  shareableView={isTab3}
                  setSharedTestsHidden={setSharedTestsHidden}
                  sharedTestsHidden={sharedTestsHidden}
                  setIsEditingSharing={setIsEditingSharing}
                />
                <div className="col">
                  <TestForm
                    collectionName="IQ"
                    title="IQ"
                    assessment_url={IQ_ASSESSMENT_URL}
                    addPersonalityCompletedForm={addPersonalityCompletedForm}
                    personalityFormsCompleted={personalityFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                  <TestForm
                    collectionName="EQ"
                    title="EQ"
                    assessment_url={EQ_ASSESSMENT_URL}
                    addPersonalityCompletedForm={addPersonalityCompletedForm}
                    personalityFormsCompleted={personalityFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                </div>
                <TestForm
                  collectionName="Astrology"
                  title="Astrology"
                  assessment_url={ASTROLOGY_ASSESSMENT_URL}
                  addPersonalityCompletedForm={addPersonalityCompletedForm}
                  personalityFormsCompleted={personalityFormsCompleted}
                  shareableView={isTab3}
                  setSharedTestsHidden={setSharedTestsHidden}
                  sharedTestsHidden={sharedTestsHidden}
                  setIsEditingSharing={setIsEditingSharing}
                />
                <div className="col">
                  <TestForm
                    collectionName="Mindset"
                    title="Mindset"
                    assessment_url={MINDSET_ASSESSMENT_URL}
                    addPersonalityCompletedForm={addPersonalityCompletedForm}
                    personalityFormsCompleted={personalityFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                  <TestForm
                    collectionName="Grit"
                    title="Grit"
                    assessment_url={GRIT_ASSESSMENT_URL}
                    addPersonalityCompletedForm={addPersonalityCompletedForm}
                    personalityFormsCompleted={personalityFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                </div>
              </div>
            </div>
            <div className="relationship">
              <div className="heading">
                {showModalRelationship && (
                  <Modal
                    userId={user.uid}
                    data={relationshipCardData()}
                    setShowModal={setShowModalRelationship}
                    title="Relationship"
                  />
                )}
                <h2>Relationship</h2>
                {isTab3 ? (
                  <>
                    <button
                      className="share_button"
                      onClick={() => setShowModalRelationship(true)}
                    >
                      <span>Share Relationship Card</span>
                      <img src={Share} alt="" />
                    </button>
                    <div className="edit_save">
                      {isEditingSharing && (
                        <span>You have unsaved changes.</span>
                      )}
                      <button
                        className="save_button"
                        onClick={() =>
                          handleSaveHiddenTests(sharedTestsHidden, user.uid)
                        }
                      >
                        <span>save shared tests</span>
                        {loadingHideTest && <Spinner width="25" height="25" />}
                      </button>
                    </div>
                  </>
                ) : (
                  <ProgressBar percentage={relationshipPercentage} />
                )}
              </div>
              <div className="tests">
                <div className="col">
                  <TestForm
                    collectionName="LoveLanguages"
                    title="Love Languages"
                    assessment_url={LOVE_LANGUAGES_URL}
                    addRelationshipCompletedForm={addRelationshipCompletedForm}
                    relationshipFormsCompleted={relationshipFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                  <TestForm
                    collectionName="AttachmentStyle"
                    title="Attachment Style"
                    assessment_url={ATTACHMENT_STYLE_ASSESSMENT_URL}
                    addRelationshipCompletedForm={addRelationshipCompletedForm}
                    relationshipFormsCompleted={relationshipFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                </div>
                <TestForm
                  collectionName="FlirtingStyle"
                  title="Flirting Style"
                  assessment_url={FLIRTING_STYLE_ASSESSMENT_URL}
                  addRelationshipCompletedForm={addRelationshipCompletedForm}
                  relationshipFormsCompleted={relationshipFormsCompleted}
                  shareableView={isTab3}
                  setSharedTestsHidden={setSharedTestsHidden}
                  sharedTestsHidden={sharedTestsHidden}
                  setIsEditingSharing={setIsEditingSharing}
                />
                <TestForm
                  collectionName="FisherTemperamentInventory"
                  title="Fisher Temperament Inventory (FTI)"
                  assessment_url={FTI_ASSESSMENT_URL}
                  addRelationshipCompletedForm={addRelationshipCompletedForm}
                  relationshipFormsCompleted={relationshipFormsCompleted}
                  shareableView={isTab3}
                  setSharedTestsHidden={setSharedTestsHidden}
                  sharedTestsHidden={sharedTestsHidden}
                  setIsEditingSharing={setIsEditingSharing}
                />
              </div>
            </div>
            <div className="career">
              <div className="heading">
                <h2>Career</h2>
                {isTab3 ? (
                  <>
                    <div className="edit_save">
                      {isEditingSharing && (
                        <span>You have unsaved changes.</span>
                      )}
                      <button
                        className="save_button"
                        onClick={() =>
                          handleSaveHiddenTests(sharedTestsHidden, user.uid)
                        }
                      >
                        <span>save shared tests</span>
                        {loadingHideTest && <Spinner width="25" height="25" />}
                      </button>
                    </div>
                  </>
                ) : (
                  <ProgressBar percentage={careerPercentage} />
                )}
              </div>
              <div className="tests">
                <div className="col">
                  <TestForm
                    collectionName="GallupStrengthsFinder"
                    title="Gallup StrengthsFinder"
                    assessment_url={GALLUP_ASSESSMENT_URL}
                    addCareerCompletedForm={addCareerCompletedForm}
                    careerFormsCompleted={careerFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                </div>
                <div className="col">
                  <TestForm
                    collectionName="DISC"
                    title="DISC"
                    assessment_url={DISC_ASSESSMENT_URL}
                    addCareerCompletedForm={addCareerCompletedForm}
                    careerFormsCompleted={careerFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                </div>
                <div className="col">
                  <TestForm
                    collectionName="ViaCareerStrengths"
                    title="ViaStrengths"
                    assessment_url={VIA_STRENGTHS_ASSESSMENT_URL}
                    addCareerCompletedForm={addCareerCompletedForm}
                    careerFormsCompleted={careerFormsCompleted}
                    shareableView={isTab3}
                    setSharedTestsHidden={setSharedTestsHidden}
                    sharedTestsHidden={sharedTestsHidden}
                    setIsEditingSharing={setIsEditingSharing}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {isTab2 && <Interrelationships />}
      </div>
    );
  }
};

export default DiscoverDashboard;
