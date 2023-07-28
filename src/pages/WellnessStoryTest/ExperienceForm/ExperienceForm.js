import TextInput from "../../../components/Form/TextInput";
import TextArea from "../../../components/Form/TextArea";
import './ExperienceForm.css';
import Dropdown from "../../../components/Form/Dropdown";
import feelingsOption from "./feelingsOption";
import Button from "../../../components/Button";
import {useState} from "react";
import MultiSelectDropdown from "../../../components/Form/MultiSelectDropdown";

const ExperienceForm = ({index, register, getValues, setValue, watch}) => {
  const [showFeelingsImage, setShowFeelingsImage] = useState(false)
  const className = 'ExperienceForm';

  const whoOptions = [
    "Self",
    "Family",
    "Caretakers or Those in Your Care",
    "Friends",
    "Partners",
    "Mentors/Teachers/Coaches",
    "Classmates/Colleagues/Team Members",
    "Pets/Animals",
    "Community Groups",
    "Online Communities",
    "Professionals",
    "Celebrities/Influencers",
    "Spiritual Leaders or Community",
    "Strangers"
  ]

  const categoryOptions = [
    "Relationships (Romantic)",
    "Social / Relationships (Platonic)",
    "Education",
    "Career",
    "Family",
    "Health",
    "Spirituality",
    "Travel/Culture",
    "Personal Development",
    "Giving (community service, volunteering)",
    "Other Life Event (eg buy a house, marriage, etc.)",
  ]

  const whenOptions = [];
  for (let i = 1; i <= 80; i++) {
    whenOptions.push(i);
  }

  return (
    <div className={className}>
      <div>Experience {index + 1}</div>
      <div className={`${className}__fieldContainer`}>
        <TextInput placeholder={"5 word headline"} name={`experience.${index}.headline`} register={register}/>
      </div>
      <div className={`${className}__fieldContainer`}>
        <TextArea register={register} name={`experience.${index}.description`}
                  placeholder={"If you'd like to share more detail, feel free to write more. You can always return to this later if you want to answer other experiences."}/>
      </div>
      <div className={`${className}__fieldContainer`}>
        <Dropdown label={"What was your age when you experience this?"}
                  options={whenOptions}
                  register={register}
                  name={`experience.${index}.age`}
                  onChange={(value) => {
                    setValue(`experience.${index}.age`, value, {shouldValidate: true})
                  }}
                  value={watch(`experience.${index}.age`)}/>
      </div>
      <div className={`${className}__fieldContainer`}>
        <MultiSelectDropdown label={"Who did you experience this with?"}
                             options={whoOptions}
                             register={register}
                             name={`experience.${index}.whoWith`}
                             onChange={(value) => {
                               setValue(`experience.${index}.whoWith`, value, {shouldValidate: true})
                             }}
                             value={watch(`experience.${index}.whoWith`)}/>
      </div>
      <div className={`${className}__fieldContainer`}>
        <Dropdown label={"Category"}
                  options={categoryOptions}
                  register={register}
                  name={`experience.${index}.category`}
                  onChange={(value) => {
                    setValue(`experience.${index}.category`, value, {shouldValidate: true})
                  }}
                  value={watch(`experience.${index}.category`)}/>
      </div>
      <div className={`${className}__feelingContainer`}>
        <div>
          <div className={`${className}__fieldContainer`}>
            <Dropdown label={"What feeling did this experience evoke?"}
                      options={feelingsOption}
                      register={register}
                      name={`experience.${index}.feeling`}
                      onChange={(value) => {
                        setValue(`experience.${index}.feeling`, value, {shouldValidate: true})
                      }}
                      value={watch(`experience.${index}.feeling`)}/>
          </div>
        </div>
        <div className={`${className}__feelingsButtonContainer`}>
          <div>Need help? Explore the Feeling Wheel</div>
          <div>
            <Button onClick={() => setShowFeelingsImage(true)} type={"primary"}>Feeling Wheel</Button>
          </div>
        </div>
      </div>
      {showFeelingsImage && (
        <div className={`${className}__feelingsImageContainer`} onClick={() => setShowFeelingsImage(false)}>
          <img alt={"feelings image"} src={"/feeling_wheel.png"}/>
        </div>
      )}
    </div>
  );
}

export default ExperienceForm;