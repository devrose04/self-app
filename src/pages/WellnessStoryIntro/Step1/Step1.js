import './Step1.css';
import Button from "../../../components/Button";

const Step1 = ({onClick}) => {
  const className = 'WellnessStoryIntro_Step1';

  return (
    <div>
      <div className={`${className}__title`}>Hi Molly</div>

      <div className={`${className}__content`}>
        <div className={`${className}__subTitle`}>Let’s help you write your story</div>

        <div>Your narrative is at the heart of your Self. Together, we'll navigate your experiences and memories, emotions
          and feelings, as well as the friends and figures who have been cast in the play of your life. We'll catalog
          these moments, enabling you to delve deeper and introspect. By understanding your past, you can better envision
          and build your future.
        </div>
      </div>

      <div className={`${className}__buttonContainer`}>
        <Button type={"primary"} onClick={onClick}>Continue</Button>
      </div>
    </div>
  )
}

export default Step1;