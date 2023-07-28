import "./RadioInput.css";

const RadioInput = ({ label, name, register, options }) => {
  const className = "RadioInput";
  return (
    <div className={className}>
      <div>{label}</div>
      <div className={`${className}-optionsContainer`}>
        {options?.map((option, index) => {
          return (
            <div
              className={`${className}-option`}
              key={`${name}_${option.replace(/s+/gi, "_").toLowerCase()}`}
            >
              <input
                id={`${name}_${option.replace(/s+/gi, "_").toLowerCase()}`}
                type={"radio"}
                value={option}
                {...register(name, { required: true })}
                className={`${className}-radio`}
              />
              <label
                className={`${className}-label`}
                htmlFor={`${name}_${option.replace(/s+/gi, "_").toLowerCase()}`}
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioInput;
