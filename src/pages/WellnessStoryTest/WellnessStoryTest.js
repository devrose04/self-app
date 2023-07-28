import './WellnessStoryTest.css';
import {useNavigate, useParams} from "react-router-dom";
import WellnessStoryTestEasy from "./WellnessStoryTestEasy";
import WellnessStoryTestMedium from "./WellnessStoryTestMedium";
import WellnessStoryTestHard from "./WellnessStoryTestHard";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase.config";
import { addDoc, collection } from "firebase/firestore";

const WellnessStoryTest = () => {
  const {testId} = useParams();
  const className = 'WellnessStoryTest';
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const saveStory = (formType, formData) => {
    const dbRequests = formData.experience.map(experience => {
      const dbObject = {
        user: user.uid,
        experience,
        extraDetails: formData.extraDetails,
        formType,
        created: new Date().getTime(),
      };
      return addDoc(collection(db, "WellnessUserStory"), dbObject)
    })
    Promise.all(dbRequests).then(() => {
      navigate("/wellness/story-day-one")
    })

  }
  return (
    <div className={className}>
      {testId.toLowerCase() === 'easy' && (<WellnessStoryTestEasy saveStory={saveStory} />)}
      {testId.toLowerCase() === 'medium' && (<WellnessStoryTestMedium saveStory={saveStory} />)}
      {testId.toLowerCase() === 'hard' && (<WellnessStoryTestHard saveStory={saveStory} />)}
    </div>
  )
}

export default WellnessStoryTest;