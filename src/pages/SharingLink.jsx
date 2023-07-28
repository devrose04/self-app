import React, { useEffect, useState } from "react";
import "../styles/discoverDashboard.scss";
import { useLocation, Link } from "react-router-dom";
import { getIdFromUrl, getUserById } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import TestForm from "../components/TestForm";

const SharingLink = () => {
  const [userName, setUserName] = useState("");
  const [hiddenTests, setHiddenTests] = useState({});
  const location = useLocation();
  const userId = getIdFromUrl(location.pathname);

  useEffect(() => {
    localStorage.setItem("userId", userId);
    getUserById(userId)
      .then((data) => {
        setUserName(data.firstName);
        setHiddenTests(data.hiddenTests);
      })
      .catch((error) => {
        // setIsLoading(false);
      });
  }, [userId]);

  const isTestHidden = (test) => {
    return hiddenTests[test];
  };

  return (
    <div className="profile">
      <div className="titles">
        <h1>Welcome to {userName}'s Profile </h1>
        <h2>
          <br />
          <br />
          Below are the results of any of the tests you’ve completed. Take or
          retake any assessments as you want.
        </h2>
        <div className="banner">
          <h3>
            Excited about what you see?
            <br />
            Want to learn about yourself?{" "}
          </h3>
          <Link to="/discover/signup" className="banner_link">
            Sign Up Now
          </Link>
        </div>
      </div>
      {!hiddenTests ? (
        <span
          style={{
            display: "inline-block",
            marginBottom: 50,
            marginLeft: 50,
            fontSize: 36,
            textAlign: "center",
          }}
        >
          No info.
        </span>
      ) : (
        <>
          <div className="personality">
            <div className="heading">
              <h2>Personality</h2>
            </div>
            <div className="tests">
              <div className="col">
                {!isTestHidden("MBTI") && (
                  <TestForm
                    collectionName="MBTI"
                    title="Myer Briggs (MBTI)"
                    isSharedProfile={true}
                  />
                )}
                {!isTestHidden("Enneagram") && (
                  <TestForm
                    collectionName="Enneagram"
                    title="Enneagram"
                    isSharedProfile={true}
                  />
                )}
              </div>
              {!isTestHidden("BigFive") && (
                <TestForm
                  collectionName="BigFive"
                  title="Big Five Personality"
                  isSharedProfile={true}
                />
              )}
              <div className="col">
                {!isTestHidden("IQ") && (
                  <TestForm
                    collectionName="IQ"
                    title="IQ"
                    isSharedProfile={true}
                  />
                )}
                {!isTestHidden("EQ") && (
                  <TestForm
                    collectionName="EQ"
                    title="EQ"
                    isSharedProfile={true}
                  />
                )}
              </div>
              {!isTestHidden("Astrology") && (
                <TestForm
                  collectionName="Astrology"
                  title="Astrology"
                  isSharedProfile={true}
                />
              )}
              <div className="col">
                {!isTestHidden("Mindset") && (
                  <TestForm
                    collectionName="Mindset"
                    title="Mindset"
                    isSharedProfile={true}
                  />
                )}
                {!isTestHidden("Grit") && (
                  <TestForm
                    collectionName="Grit"
                    title="Grit"
                    isSharedProfile={true}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="relationship">
            <div className="heading">
              <h2>Relationship</h2>
            </div>
            <div className="tests">
              <div className="col">
                {!isTestHidden("LoveLanguages") && (
                  <TestForm
                    collectionName="LoveLanguages"
                    title="Love Languages"
                    isSharedProfile={true}
                  />
                )}
                {!isTestHidden("AttachmentStyle") && (
                  <TestForm
                    collectionName="AttachmentStyle"
                    title="Attachment Style"
                    isSharedProfile={true}
                  />
                )}
              </div>
              {!isTestHidden("FlirtingStyle") && (
                <TestForm
                  collectionName="FlirtingStyle"
                  title="Flirting Style"
                  isSharedProfile={true}
                />
              )}
              {!isTestHidden("FisherTemperamentInventory") && (
                <TestForm
                  collectionName="FisherTemperamentInventory"
                  title="Fisher Temperament Inventory (FTI)"
                  isSharedProfile={true}
                />
              )}
            </div>
          </div>
          <div className="career">
            <div className="heading">
              <h2>Career</h2>
            </div>
            <div className="tests">
              <div className="col">
                {!isTestHidden("GallupStrengthsFinder") && (
                  <TestForm
                    collectionName="GallupStrengthsFinder"
                    title="Gallup StrengthsFinder"
                    isSharedProfile={true}
                  />
                )}
              </div>
              <div className="col">
                {!isTestHidden("DISC") && (
                  <TestForm
                    collectionName="DISC"
                    title="DISC"
                    isSharedProfile={true}
                  />
                )}
              </div>
              <div className="col">
                {!isTestHidden("ViaCareerStrengths") && (
                  <TestForm
                    collectionName="ViaCareerStrengths"
                    title="ViaStrengths"
                    isSharedProfile={true}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SharingLink;
