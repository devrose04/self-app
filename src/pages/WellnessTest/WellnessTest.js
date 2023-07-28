import React, { useEffect, useMemo, useRef } from "react";
import "../../styles/conversationForm.scss";
import "../../styles/wellnessTest.scss";
import formData from "./formData";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase.config";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import WellnessTestForm from "./WellnessTestForm";
import WellnessTestScore from "./WellnessTestScore";
import ToggleSwitch from "../../components/toggleswitch/ToggleSwitch";
import {
  ConversationalForm,
  FlowEvents,
  EventDispatcher,
} from "conversational-form";
import { Link } from "react-router-dom";

const WellnessTest = () => {
  const pathElements = window.location.pathname.split("/");
  const id = pathElements[pathElements.length - 1];

  const selectedFormData = formData[id];
  const [userData, setUserData] = useState();
  const [user] = useAuthState(auth);

  const getUserData = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    }
  };

  useEffect(() => {
    if (user) {
      getUserData(user);
    }
  }, [user]);

  const chatFormFields = useMemo(() => {
    if (selectedFormData?.questions) {
      const userName = userData?.firstName ? userData?.firstName : "";
      let formFields = [
        {
          tag: "input",
          type: "text",
          "cf-questions":
            "Hi " + userName + ", how are you feeling?",
        },
        {
          tag: "input",
          type: "radio",
          name: "allowQuestions",
          "cf-questions":
            "Great. I have a list of questions to ask you. It’ll take like" +
            selectedFormData.time +
            "? Does that work?",
          "cf-label": "Yes",
          value: "yes",
        },
        {
          tag: "input",
          type: "radio",
          name: "allowQuestions",
          "cf-label": "No",
          value: "no",
        },
        {
          tag: "cf-robot-message",
          name: "ending",
          "cf-conditional-allowQuestions": "no",
          "cf-questions": "Ok, I understood",
        },
      ];

      // Conversational Form data was received the  from formdata.

      selectedFormData.questions.forEach((question, index) => {
        // For forms where the scale changes, we need logic to pick which scale to use
        const length = selectedFormData.questions.length;
        const { scaleTwoStart = length - 1 } = selectedFormData;

        // Some assessments have a consistent scale for each question, and others have different possible answers for each question and need to be mapped across in Form.js
        const scale = selectedFormData.scale || question.answers;

        const scaletoUse =
          index < scaleTwoStart + 1 ? scale : selectedFormData.scaleTwo;

        scaletoUse.forEach((item, index) => {
          if (index === 0) {
            formFields.push({
              tag: "input",
              type: "radio",
              name: question.name,
              "cf-questions":
                question.conversationQuestion || question.question,
              "cf-label": item,
              value: item,
            });
          } else {
            formFields.push({
              tag: "input",
              type: "radio",
              name: question.name,
              "cf-label": item,
              value: item,
            });
          }
        });
      });
      return formFields;
    }
    return [];
  }, [selectedFormData, userData]);

  const { description, prompt } = selectedFormData;

  const className = "WellnessTest";

  const [formState, setFormState] = useState({ values: {}, isValid: false });
  const [isChatForm, setIsChatForm] = useState(false);
  const [result, setResult] = useState();

  let cf = user;
  const ref = useRef(user);

  useEffect(() => {
    if (ref.current && isChatForm) {
      const dispatcher = new EventDispatcher();
      dispatcher.addEventListener(
        FlowEvents.FLOW_UPDATE,
        function (event) {
          if (event.detail.tag.name === "ending") {
            cf.flowManager.stop();
          }
        },
        false
      );

      cf = ConversationalForm.startTheConversation({
        options: {
          theme: "blue",
          submitCallback: submitCallback,
          preventAutoFocus: true,
          eventDispatcher: dispatcher,
        },
        tags: chatFormFields,
      });

      ref.current.appendChild(cf.el);
      return () => {
        cf.remove();
      };
    }
  }, [cf, ref, chatFormFields, isChatForm]);

  const onChangeToggleState = (state) => {
    setIsChatForm(state);
  };

  const submitCallback = () => {
    var formDataSerialized = cf.getFormData(true);
    cf.addRobotChatResponse("You are done.");

    const formValues = {};
    const keys = Object.keys(formDataSerialized);
    const values = Object.values(formDataSerialized);
    for (let i = 0; i < keys.length; i += 1) {
      formValues[keys[i]] = values[i][0];
    }

    const result = selectedFormData.getScore(selectedFormData, formValues);
    const dbObject = {
      user: user.uid,
      score: result.score,
      formType: id,
      ...(result.originalValues || {}),
      created: new Date().getTime(),
    };

    addDoc(collection(db, "WellnessTestResults"), dbObject).then((resp) => {
      setResult(result);
    });
  };

  const handleSubmit = () => {
    if (selectedFormData.getScore && formState.isValid) {
      const result = selectedFormData.getScore(
        selectedFormData,
        formState.values
      );

      const dbObject = {
        user: user.uid,
        score: result.score,
        formType: id,
        ...(result.originalValues || {}),
        created: new Date().getTime(),
      };

      addDoc(collection(db, "WellnessTestResults"), dbObject).then((resp) => {
        setResult(result);
      });
    }
  };

  if (!selectedFormData) return <div>Form not found</div>;
  return (
    <>
      <div className={className}>
        {!result && (
          <ToggleSwitch
            label="Conversational Form"
            value={isChatForm}
            onChange={onChangeToggleState}
          />
        )}
        <h1 className={`${className}-header`}>
          <div>{selectedFormData.title}</div>
          <div className={`${className}-testDetails`}>
            {selectedFormData.questions.length} questions -{" "}
            {selectedFormData.time}
          </div>
        </h1>

        {!result &&
          (isChatForm ? (
            <div className={className}>
              <div className="description">
                {description}
                <p>{prompt}</p>
              </div>
              <div ref={ref} />
              <div className={`${className}-buttonContainer`}>
                <Link
                  to="/wellness/dashboard"
                  className="Button Button-primary"
                >
                  Go back
                </Link>
              </div>
            </div>
          ) : (
            <WellnessTestForm
              selectedFormData={selectedFormData}
              setFormState={setFormState}
              formState={formState}
              handleSubmit={handleSubmit}
            />
          ))}
        {result && (
          <WellnessTestScore
            result={result}
            selectedFormData={selectedFormData}
          />
        )}
      </div>
    </>
  );
};

export default WellnessTest;
