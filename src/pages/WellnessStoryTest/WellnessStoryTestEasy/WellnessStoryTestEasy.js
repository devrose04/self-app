import './WellnessStoryTestEasy.css';
import StepOneForm from "./StepOneForm";
import {useState} from 'react';
import StepTwoForm from "./StepTwoForm";
import {saveStoryForm} from "../service";
import { useNavigate } from 'react-router-dom';

const WellnessStoryTestEasy = ({ saveStory }) => {
  const [experiences, setExperiences] = useState({});
  const navigate = useNavigate();

  const handleFormOneSubmit = (submittedFormValues) => {
    console.log("submittedFormValues", submittedFormValues)
    setExperiences(submittedFormValues);
  }

  const handleFormTwoSubmit = (submittedFormValues) => {
    console.log("submittedFormValues step 2", submittedFormValues)
    const formData = {
      ...experiences,
      ...submittedFormValues
    };
    console.log("form data: ", formData);
    saveStory("story_easy", formData);
  }

  return (
    <div>
      {!experiences.experience && (<StepOneForm onFormSubmit={handleFormOneSubmit} />)}
      {experiences.experience && (<StepTwoForm onFormSubmit={handleFormTwoSubmit} />)}
    </div>
  )
}

export default WellnessStoryTestEasy;