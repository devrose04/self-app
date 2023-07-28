import "./Form.css";
import RadioInput from "./RadioInput";
import { useForm } from "react-hook-form";

// TODO: We need to rename this from form
const Form = ({ questions, setFormState, selectedFormData }) => {
  const formHook = useForm();
  const {
    register,
    handleSubmit,
    formState: {},
  } = formHook;
  const onSubmit = (data) => console.log(data);

  const handleFormChange = () => {
    const values = formHook.getValues();
    setFormState({
      values,
      isValid: !Object.values(values).includes(null),
    });
  };

  const length = selectedFormData.questions.length;
  const { scaleTwoStart = length - 1, scaleTwo } = selectedFormData;
  const doesScaleScaleTwoExist = !!scaleTwo;

  const chooseOptions = (question, index) => {
    // Some assessments have a consistent scale for each question, and others have different possible answers for each question and need to be mapped across in Form.js
    const scale = selectedFormData.scale || question.answers;

    if (!doesScaleScaleTwoExist) return scale;

    const scaletoUse =
      index + 1 < scaleTwoStart
        ? scale
        : selectedFormData.scaleTwo;
    return scaletoUse;
  };

  const scaleTwoPrompt = (index) => {
    if (!doesScaleScaleTwoExist) return "";

    const useAnotherPrompt = index + 1 === scaleTwoStart;
    const prompt = useAnotherPrompt ? selectedFormData.promptTwo : "";
    return prompt;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
        {questions.map((question, index) => {
          return (
            <div key={`question_${question.name}`}>
              <b>
                <strong>{scaleTwoPrompt(index)}</strong>
              </b>
              <RadioInput
                // handleChange={handleChange}
                // Some assessments have a consistent scale for each question, and others have different possible answers for each question
                options={chooseOptions(question, index)}
                register={register}
                name={question.name}
                label={`${index + 1}. ${question.question}`}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Form;
