import "./WellnessTestForm.css";
import Form from "../../../components/Form";
import Button from "../../../components/Button";

const WellnessTestForm = ({
  selectedFormData,
  setFormState,
  formState,
  handleSubmit,
}) => {
  const className = "WellnessTestForm";

  return (
    <>
      <div className={`${className}-content`}>
        <div className={`${className}-marginTopBottom`}>
          {selectedFormData.description}
        </div>

        <div className={`${className}-marginTopBottom ${className}-formHeader`}>
          <div className={`${className}-prompt`}>{selectedFormData.prompt ||
            "Over the past two weeks, how often have you been bothered by any of the following problems?"}</div>
        </div>

        <div className={`${className}-marginTopBottom ${className}-formHeader`}>
          <Form
            selectedFormData={selectedFormData}
            questions={selectedFormData.questions}
            setFormState={setFormState}
          />
        </div>
      </div>

      <div className={`${className}-buttonContainer`}>
        <Button type={"secondary"} onClick={() => window.history.back()}>
          Go back
        </Button>
        <Button
          type={"primary"}
          disabled={!formState.isValid}
          onClick={handleSubmit}
        >
          Done
        </Button>
      </div>
    </>
  );
};

export default WellnessTestForm;
