import StoryExperience from "../StoryExperience";
import {useParams} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {useState, useEffect} from 'react';
import {db, auth} from "../../../firebase.config";
import {getDoc, doc} from "firebase/firestore";

const EditStoryExperience = () => {
  const {storyId} = useParams();
  const [user] = useAuthState(auth);
  const [initialData, setInitialData] = useState();


  useEffect(() => {
    if(user && storyId) {
      (async () => {

        const docRef = doc(db, "WellnessUserStory", storyId);
        const docSnap = await getDoc(docRef);
        const savedData = docSnap.data();
        setInitialData(savedData);
      })()
    }
  }, [user, storyId])

  if(!storyId || !initialData) return null


  return <StoryExperience initialData={initialData} storyId={storyId} />;
}

export default EditStoryExperience;