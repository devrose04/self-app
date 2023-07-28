import './WellnessStoryTimelineLegend.css';
import EducationIcon from "../../../images/EducationIcon.svg";
import FamilyIcon from "../../../images/FamilyIcon.svg";
import HealthIcon from "../../../images/HealthIcon.svg";
import HeartIcon from "../../../images/HeartIcon.svg";
import MoneyIcon from "../../../images/MoneyIcon.svg";
import PassionsIcon from "../../../images/PassionsIcon.svg";
import SocialIcon from "../../../images/SocialIcon.svg";
import SpiritualityIcon from "../../../images/SpiritualityIcon.svg";
import VolunteerIcon from "../../../images/VolunteerIcon.svg";

const WellnessStoryTimelineLegend = ({filter, setFilter}) => {
  const className = 'WellnessStoryTimelineLegend';

  const handleChange = ev => {
    const val = ev.target.value;
    if(filter.includes(val)) {
      setFilter(filter.filter(v => v !== val));
    } else {
      setFilter([...filter, val]);
    }
  }

  return (
    <div className={`${className}__legendContainer`}>
      <div className={`${className}__legendElement`}>
        <span className={`${className}__legendPoint`} style={{backgroundColor: '#6D358E'}}/>
        <span>Sad</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"purple"} checked={filter.includes("purple")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span className={`${className}__legendPoint`} style={{backgroundColor: '#E62325'}}/>
        <span>Mad</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"red"} checked={filter.includes("red")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span className={`${className}__legendPoint`} style={{backgroundColor: '#F19020'}}/>
        <span>Scared</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"orange"} checked={filter.includes("orange")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span className={`${className}__legendPoint`} style={{backgroundColor: '#F0E70D'}}/>
        <span>Joyful</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"yellow"} checked={filter.includes("yellow")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span className={`${className}__legendPoint`} style={{backgroundColor: '#04905A'}}/>
        <span>Powerful</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"green"} checked={filter.includes("green")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span className={`${className}__legendPoint`} style={{backgroundColor: '#1870B3'}}/>
        <span>Peaceful</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"blue"} checked={filter.includes("blue")}/>
        </span>
      </div>

      <div className={`${className}__legendElement`}>
        <span><img alt={"HealthIcon"} src={HealthIcon} /></span>
        <span>Health</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Health"} checked={filter.includes("Health")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span><img alt={"SocialIcon"} src={SocialIcon} /></span>
        <span>Social</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Social / Relationships (Platonic)"} checked={filter.includes("Social / Relationships (Platonic)")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span><img alt={"EducationIcon"} src={EducationIcon} /></span>
        <span>Education</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Education"} checked={filter.includes("Education")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span><img alt={"SpiritualityIcon"} src={SpiritualityIcon} /></span>
        <span>Spirituality</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Spirituality"} checked={filter.includes("Spirituality")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span><img alt={"MoneyIcon"} src={MoneyIcon} /></span>
        <span>Money</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Career"} checked={filter.includes("Career")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span><img alt={"VolunteerIcon"} src={VolunteerIcon} /></span>
        <span>Volunteer</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Giving (community service, volunteering)"} checked={filter.includes("Giving (community service, volunteering)")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span><img alt={"HeartIcon"} src={HeartIcon} /></span>
        <span>Heart</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Relationships (Romantic)"} checked={filter.includes("Relationships (Romantic)")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span><img alt={"PassionsIcon"} src={PassionsIcon} /></span>
        <span>Passions</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Travel/Culture"} checked={filter.includes("Travel/Culture")}/>
        </span>
      </div>
      <div className={`${className}__legendElement`}>
        <span><img alt={"FamilyIcon"} src={FamilyIcon} /></span>
        <span>Family</span>
        <span className={`${className}__checkboxContainer`}>
          <input type={"checkbox"} onChange={handleChange} name={"filter"} value={"Family"} checked={filter.includes("Family")}/>
        </span>
      </div>
    </div>
  )
}

export default WellnessStoryTimelineLegend;