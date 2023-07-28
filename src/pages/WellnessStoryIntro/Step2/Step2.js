import Button from "../../../components/Button";
import './Step2.css';

const Step2 = () => {
  const className = 'WellnessStoryIntro_Step2'

  return (
    <div>
      <div className={`${className}__subTitle`}>We’re excited for you to go on this journey and craft your story.</div>
      <div>
        <div className={`${className}__paragraph`}>
          This is a transformative experience. Please allocate a solid, uninterrupted 20 minutes for an exploratory
          dive into your own narrative. We are confident that you'll appreciate the depth of self-understanding you gain
          and the beautiful story you create.
        </div>

        <div className={`${className}__paragraph`}>
          Over the next few days we'll work through a series of thought-provoking prompts. These are crafted to
          stimulate
          your memory and vulnerability and help you reflect upon those pivotal moments that have shaped your journey.
        </div>
      </div>

      <div className={`${className}__buttonContainer`}>
        <a href={'/wellness/story-day-one'}>
          <Button type={"primary"}>Continue</Button>
        </a>
      </div>
    </div>
  )
}

export default Step2;