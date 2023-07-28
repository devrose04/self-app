import ExperienceForm from "../../ExperienceForm";
import Button from "../../../../components/Button";
import {useFieldArray, useForm} from "react-hook-form";
import {useState, useEffect} from "react";
import './StepOneForm.css';

const StepOneForm = ({onFormSubmit}) => {
  const formHook = useForm();
  const [isValidForm, setIsValidForm] = useState(false);
  const [numberOfExperiences, setNumberOfExperiences] = useState([0]);
  const {control, register, getValues, setValue, watch} = formHook
  const {} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "experience", // unique name for your Field Array
  });
  const className = 'WellnessStoryTestEasyStepOne';

  const handleFormChange = () => {
  }
  const handleSubmit = (ev) => {
    ev.preventDefault();
    onFormSubmit(getValues())
  }

  useEffect(() => {
    const subscription = watch((value) => {
      const notValidForm = value.experience.map(e => {
        const {headline, age, whoWith, feeling, category} = e;
        return [headline, age, whoWith, feeling, category].reduce((acc, field) => acc && field !== "" && field !== undefined, true)
      }).includes(false);

      setIsValidForm(!notValidForm);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <div className={`${className}__title`}>Crafting your story</div>
      <div className={`${className}__contentContainer`}>
        <div className={`${className}__description`}>
          What are the 5 memories you hold dearest to your heart? Who were the people you shared these
          cherished/precious moments with?
        </div>
        <div>
          <form onSubmit={handleSubmit} onChange={handleFormChange}>
            {numberOfExperiences.map((experienceIndex) => {
              return (
                <div key={`experience-form-${experienceIndex}`} className={`${className}__formContainer`}>
                  <ExperienceForm watch={watch} register={register} index={experienceIndex} getValues={getValues}
                                  setValue={setValue}/>
                </div>
              )
            })}

            <div className={`${className}__buttonContainer`}>
              <Button onClick={() => {
                setIsValidForm(false);
                setNumberOfExperiences([...numberOfExperiences, numberOfExperiences.length])
              }}>Add another experience</Button>
              <Button type={"primary"} disabled={!isValidForm} buttonType={"submit"}>Done</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StepOneForm;