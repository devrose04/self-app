import TestsList from "../../components/TestsList";
import {useState, useEffect} from 'react';
import './WellnessDayOne.css';
import {getStoryTests} from "./service";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase.config";

const WellnessDayOne = () => {
  const className = 'WellnessDayOne';
  const [tests, setTests] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      getStoryTests(user).then(
        storyTests => setTests(storyTests)
      )
    }
  }, [user])

  if(!tests) return null;

  const hasAnyStory = tests.reduce((acc, test) => acc || test.isDone, false);

  return (
    <div className={className}>
      <div className={`${className}__title`}>Todays's work</div>

      <div className={`${className}__content`}>
        <div>We’ll go through 3 prompts, each of increasing difficulty.</div>

        <div className={`${className}__tableContainer`}>
          <TestsList tests={tests} />
        </div>
        {hasAnyStory && (
          <div className={`${className}__timelineLinkContainer`}>
            <a className={`${className}__timelineLink`} href={"/wellness/story-timeline"}>View your timeline</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default WellnessDayOne;