import './MultiSelectDropdown.css';
import {useState, useRef, useEffect} from "react";

const MultiSelectDropdown = ({label, options = [], value, onChange, register, name}) => {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);
  const className = 'MultiSelectDropdown';
  const field = register ? register(name, {required: true}) : null;

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  const valueAsArray = value ? value.split(",") : [];

  const getIsSelectedOption = (valueAsArray, option) => {
    if(valueAsArray.includes(option)) return `${className}__dropdownOptionsSelectedListItem`
    return "";
  }
  return (
    <div className={className}>
      <div>{label}</div>
      <div ref={wrapperRef} className={`${className}__dropdownContainer`}>
        <div className={`${className}__valueDisplay`} onClick={() => setShowOptions(!showOptions)}>{value || 'Select answer'}</div>

        {showOptions && (
          <ul className={`${className}__dropdownOptionsList`}>
            {options.map(option => {
              return (
                <li key={`dropdown_option_${(option + "").toLowerCase().replace(/\s+/, "_")}`}
                    onClick={() => {
                      if(valueAsArray.includes(option)) onChange(valueAsArray.filter(o => o!== option).join(","))
                      else onChange([...valueAsArray, option].join(","))
                    }}
                    className={`${className}__dropdownOptionsListItem ${getIsSelectedOption(valueAsArray, option)}`}>
                  {option}
                </li>)
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MultiSelectDropdown;