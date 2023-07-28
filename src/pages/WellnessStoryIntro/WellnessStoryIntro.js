import {useState} from 'react';
import './WellnessStoryIntro.css'
import Step1 from "./Step1";
import Step2 from "./Step2";

const WellnessStoryIntro = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const className = 'WellnessStoryIntro';

  return (
    <div className={className}>
      {currentStep === 1 && <Step1 onClick={() => { setCurrentStep(2) }} />}
      {currentStep === 2 && <Step2 />}
    </div>
  )
}

export default WellnessStoryIntro;