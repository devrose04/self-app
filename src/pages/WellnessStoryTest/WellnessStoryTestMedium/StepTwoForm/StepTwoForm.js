import './StepTwoForm.css';
import {useForm} from "react-hook-form";
import TextArea from "../../../../components/Form/TextArea";
import Button from "../../../../components/Button";
import {useState} from "react";

const StepTwoForm = ({onFormSubmit}) => {
  const formHook = useForm();
  const {register, getValues} = formHook;
  const className = 'WellnessStoryTestMediumStepTwo';
  const [submitDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setButtonDisabled(true);
    onFormSubmit(getValues());
  }

  return (
    <div>
      <div className={`${className}__title`}>Optional Introspection</div>
      <div className={`${className}__contentContainer`}>
        <form onSubmit={handleSubmit}>
          <div className={`${className}__subTitle`}>We hope that was a meaningful experience</div>
          <div className={`${className}--marginBottom`}>
            While this is not a journaling app, feel free to thing more about the exercise.
          </div>
          <div className={`${className}--marginBottom`}>
            Reflect on your family experiences over the years. Which moment stand out the most to you, and why? What
            makes these moments memorable? How have these experiences influenced your relationship with your family?
            Write down each memory and the emotions attached to it.
          </div>
          <div>
            <div className={`${className}__fieldContainer`}>
              <TextArea register={register} name={`extraDetails`}
                        placeholder={"If you'd like to share more detail, feel free to write more. You can always return to this later if you want to answer other experiences."}/>
            </div>
          </div>

          <div className={`${className}__buttonContainer`}>
            <Button type={"primary"} disabled={submitDisabled} buttonType={"submit"}>Continue</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StepTwoForm;