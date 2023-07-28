import './StoryExperience.css';
import ExperienceForm from "../../WellnessStoryTest/ExperienceForm";
import {useFieldArray, useForm} from "react-hook-form";
import Button from "../../../components/Button";
import {useState, useEffect} from 'react';
import {db, auth} from "../../../firebase.config";
import {addDoc, collection, updateDoc, doc} from "firebase/firestore";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";

const StoryExperience = ({initialData, storyId}) => {
  const className = 'StoryExperience';
console.log(initialData)
  const formHook = useForm({
    defaultValues: initialData ? {
      experience: [initialData.experience]
    } : undefined
  });

  const [isValidForm, setIsValidForm] = useState(false);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);
  const {control, register, getValues, setValue, watch} = formHook
  const {} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "experience", // unique name for your Field Array
  });
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const saveNewStory = () => {
    const formData = getValues();
    const dbRequests = formData.experience.map(experience => {
      const dbObject = {
        user: user.uid,
        experience,
        created: new Date().getTime(),
      };
      return addDoc(collection(db, "WellnessUserStory"), dbObject)
    })
    Promise.all(dbRequests).then(() => {
      navigate("/wellness/story-timeline")
    })
  }

  const updateExistingStory = async () => {
    const formData = getValues();
    const docRef = doc(db, "WellnessUserStory", storyId);
    await updateDoc(docRef, {
      ...initialData,
      experience: formData.experience[0]
    });
    navigate("/wellness/story-timeline")
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setIsDisabledSubmit(true);
    if(initialData && storyId) updateExistingStory();
    else saveNewStory();
  };

  const handleFormChange = () => {
    console.log(getValues())
  };

  useEffect(() => {
    const subscription = watch((value) => {
      const notValidForm = value.experience.map(e => {
        const {headline, age, whoWith, feeling} = e;
        return [headline, age, whoWith, feeling].reduce((acc, field) => acc && field !== "" && field !== undefined, true)
      }).includes(false);

      setIsValidForm(!notValidForm);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} onChange={handleFormChange}>
        <ExperienceForm watch={watch} register={register} index={0} getValues={getValues}
                        setValue={setValue}/>

        <div className={`${className}__buttonContainer`}>
          <Button onClick={() => {
            navigate("/wellness/story-timeline")
          }}>Cancel</Button>
          <Button type={"primary"} disabled={!isValidForm || isDisabledSubmit} buttonType={"submit"}>Done</Button>
        </div>
      </form>
    </div>
  )
};

export default StoryExperience;