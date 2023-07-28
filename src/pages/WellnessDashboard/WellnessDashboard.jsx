import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import "../../styles/wellnessDashboard.scss";
import formCategories from "./WellnessDashboardTests/formCategories";
import {
  MHQ_ASSESSMENT_URL,
  SSES_ASSESSMENT_URL,
  HAMILTON_ASSESSMENT_URL,
  QIDS_SR_16_ASSESSMENT_URL,
  EAT_26_ASSESSMENT_URL,
  EATING_DISORDER_ASSESSMENT_URL,
} from "../../constants/assessments-urls";
import { getPercentage } from "../../utils";
import ProgressBar from "../../components/ProgressBar";
import Button from "../../components/Button";
import WellnessDashboardTests from "./WellnessDashboardTests";
import { LockOutlined } from "@ant-design/icons/lib/icons";

const WellnessDashboard = () => {
  const [userData, setUserData] = useState();
  const [userTestsData, setUserTestsData] = useState();
  const [user, error] = useAuthState(auth);
  const [wellnessPercentage, setWellnessPercentage] = useState(0);
  const [wellnessFormsCompleted, setWellnessFormsCompleted] = useState([]);

  const navigate = useNavigate();

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

  const addWellnessCompletedForm = (newCompletedForm) => {
    setWellnessFormsCompleted((formsCompleted) => [
      ...formsCompleted,
      newCompletedForm,
    ]);
  };

  const [popUpMessageLength, setPopUpMessageLength] = useState(0);

  useEffect(() => {
    const percentage = getPercentage(wellnessFormsCompleted, 9);
    setWellnessPercentage(percentage);
  }, [wellnessFormsCompleted]);

  useEffect(() => {
    if (user) {
      getUserData(user);
    }
  }, [user]);

  useEffect(() => {
    let pop_up_message_length = 0;
    // This is the part that gets an category array list from an formCategories array list.
    formCategories.forEach((category) => {
      category.tests.forEach((test) => {
        if (userTestsData && userTestsData[test.key]) {
          const createdDate = new Date(userTestsData[test.key].created);
          const dateOfLastTest = Date.now() - createdDate.getTime();
          const days = Math.floor(dateOfLastTest / (1000 * 60 * 60 * 24));
          if (days > 30) {
            pop_up_message_length += 1;
          }
        } else return;
      });
    });
    setPopUpMessageLength(pop_up_message_length);
  }, [userTestsData, formCategories]);

  useEffect(() => {
    if (user) {
      const testsRef = collection(db, "WellnessTestResults");
      const q = query(testsRef, where("user", "==", user.uid));
      const possibleTestKeys = formCategories.reduce((acc, category) => {
        return [...acc, ...category.tests.map((test) => test.key)];
      }, []);
      getDocs(q).then((res) => {
        const testsAsMap = {};
        res.forEach((doc) => {
          const testData = doc.data();
          if (
            (!testsAsMap[testData.formType] ||
              testsAsMap[testData.formType].created < testData.created) &&
            possibleTestKeys.includes(testData.formType)
          )
            testsAsMap[testData.formType] = {
              score: testData.score,
              created: testData.created,
            };
        });
        setUserTestsData(testsAsMap);
      });
    }
  }, [user]);

  if (!userTestsData) return null;

  const totalNumberOfTests = formCategories.reduce(
    (acc, category) => acc + category.tests.length,
    0
  );
  const totalNumberOfCompletedTests = Object.keys(userTestsData).length;
  const testProgress = Number(
    (totalNumberOfCompletedTests / totalNumberOfTests) * 100
  ).toFixed(2);

  if (user) {
    return (
      <div className="profile">
        <div className="titles">
          <h1>Your Health Record</h1>
          <div className={"title-links-container"}>
            <Button type={"secondary"}>
              {totalNumberOfCompletedTests === 0 && (
                <div className="story">
                  {"Write your story"}
                  <LockOutlined />
                  <div className={"popup-message"}>
                    The Story page unlocks after you complete your first mental
                    health checkin.
                  </div>
                </div>
              )}
              {totalNumberOfCompletedTests !== 0 && (
                <Link to={"/wellness/story-day-one"} className="join_now">
                  {"Write your story"}
                </Link>
              )}
            </Button>
            {totalNumberOfCompletedTests < 5 && (
              <Button type={"primary"}>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to={"/wellness/check-in"}
                  className="join_now"
                >
                  {testProgress ? "Check-in" : "Let's get started!"}
                </Link>
              </Button>
            )}
            {totalNumberOfCompletedTests >= 5 && popUpMessageLength < 5 && (
              <Button disabled>
                <div className="check-in">
                  {testProgress ? "Check-in" : "Let's get started!"}
                  <div className="popup-message">
                    Self recommends checkins at a monthly or quarterly
                    interval.
                  </div>
                </div>
              </Button>
            )}
            {totalNumberOfCompletedTests >= 5 && popUpMessageLength >= 5 && (
              <Button type={"primary"}>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to={"/wellness/getting-started-essentials"}
                  className="join_now"
                >
                  {testProgress ? "Check-in" : "Let's get started!"}
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="tests-section">
          <div className="heading">
            <h2>Mental Health</h2>
            <ProgressBar percentage={testProgress} />
          </div>
          <WellnessDashboardTests userTestsData={userTestsData} />
        </div>
      </div>
    );
  }
};
export default WellnessDashboard;
