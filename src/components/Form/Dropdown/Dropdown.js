import './Dropdown.css';
import {useState, useRef, useEffect} from "react";

const Dropdown = ({label, options = [], value, onChange, register, name}) => {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);
  const className = 'Dropdown';
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

  return (
    <div className={className}>
      <div>{label}</div>
      <div ref={wrapperRef} className={`${className}__dropdownContainer`} onClick={() => setShowOptions(!showOptions)}>
        <div>{value || 'Select answer'}</div>

        {showOptions && (
          <ul className={`${className}__dropdownOptionsList`}>
            {options.map(option => {
              return (
                <li key={`dropdown_option_${(option + "").toLowerCase().replace(/\s+/, "_")}`}
                    onClick={() => {
                      onChange(option);
                      setShowOptions(false);
                    }}
                    className={`${className}__dropdownOptionsListItem`}>
                  {option}
                </li>)
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dropdown;