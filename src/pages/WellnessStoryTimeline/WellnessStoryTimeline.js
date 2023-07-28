import './WellnessStoryTimeline.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {auth, db} from "../../firebase.config";
import {collection, getDocs, query, where} from "firebase/firestore";
import {getBackgroundColor, getColorForFeeling} from './service'
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import EducationIcon from "../../images/EducationIcon.svg";
import FamilyIcon from "../../images/FamilyIcon.svg";
import HealthIcon from "../../images/HealthIcon.svg";
import HeartIcon from "../../images/HeartIcon.svg";
import MoneyIcon from "../../images/MoneyIcon.svg";
import PassionsIcon from "../../images/PassionsIcon.svg";
import SocialIcon from "../../images/SocialIcon.svg";
import SpiritualityIcon from "../../images/SpiritualityIcon.svg";
import VolunteerIcon from "../../images/VolunteerIcon.svg";
import WellnessStoryTimelineLegend from "./WellnessStoryTimelineLegend";

const WellnessStoryTimeline = () => {
  const className = "WellnessStoryTimeline";
  const [user] = useAuthState(auth);
  const [userStories, setUserStories] = useState();
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState();
  const [filter, setFilter] = useState([]);

  const categoryIcons = {
    "Relationships (Romantic)": HeartIcon,
    "Social / Relationships (Platonic)": SocialIcon,
    "Education": EducationIcon,
    "Career": MoneyIcon,
    "Family": FamilyIcon,
    "Health": HealthIcon,
    "Spirituality": SpiritualityIcon,
    "Travel/Culture": PassionsIcon,
    "Personal Development": SpiritualityIcon,
    "Giving (community service, volunteering)": VolunteerIcon
  }

  useEffect(() => {
    if (user) {
      (async () => {
        const testsRef = collection(db, "WellnessUserStory");
        const q = query(testsRef, where("user", "==", user.uid));
        const storedStories = await getDocs(q)

        const userStories = [];
        storedStories.forEach((doc) => {
          const storyData = doc.data()
          userStories.push({...storyData, id: doc.id})
        });
        const sortedUserStories = userStories.sort((story1, story2) => {
          return story2.experience.age - story1.experience.age;
        })
        setUserStories(sortedUserStories);
      })()
    }
  }, [user])

  if (!userStories) return null;

  const getSelectedStoryClass = (currentStory, selectedStory) => {
    if (selectedStory && currentStory.id === selectedStory.id) {
      return `${className}__selectedStory`;
    }
    return "";
  }

  const getMaskProps = (experience) => {
    if(experience.category && categoryIcons[experience.category])
      return {mask: `url(${categoryIcons[experience.category]}) no-repeat center`, "-webkit-mask": `url(${categoryIcons[experience.category]}) no-repeat center`}

    return {
      borderRadius: "50%"
    };
  }

  const shouldShowStory = (story, filter) => {
    if(filter.length === 0) return true
    if(filter.includes(story.experience.category)) return true
    if(filter.includes(getColorForFeeling(story.experience.feeling))) return true
    return false
  }

  return (
    <div className={className}>
      <div className={`${className}__title`}>Your Story Timeline</div>
      <div className={`${className}__contentContainer`}>
        <div className={`${className}__timelineContainer`}>
          <div className={`${className}__verticalLine`} style={{}}/>
          {userStories.filter(story => shouldShowStory(story, filter)).map((userStory, index) => {
            const {experience} = userStory;
            return (
              <div key={`story-${index}`}
                   className={`${className}__timelineRow ${getSelectedStoryClass(userStory, selectedStory)}`}
                   onClick={() => setSelectedStory(userStory)}>
                <div>{experience.headline}</div>
                <div className={`${className}__pointContainer`}>
                  <div className={`${className}__point`} style={{background: getBackgroundColor(experience.feeling), ...getMaskProps(experience)}}/>
                </div>
                <div>
                  {experience.age}
                </div>
              </div>
            )
          })}
        </div>
        <div className={`${className}__addToStoryContainer`}>
          <Button onClick={() => {
            navigate("/wellness/story-experience-form")
          }}>Add to Story</Button>
          {selectedStory && (
            <Button onClick={() => {
              navigate(`/wellness/story-experience-form/${selectedStory.id}`)
            }}>Edit Story</Button>
          )}
        </div>
      </div>

      <div>
        <WellnessStoryTimelineLegend filter={filter} setFilter={setFilter} />
      </div>
    </div>
  )
};

export default WellnessStoryTimeline;