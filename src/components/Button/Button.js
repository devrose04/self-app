import "./Button.css";

const Button = ({ children, type = "default", buttonType = "button", onClick, handleHover, handleMouseLeave, disabled }) => {
  const className = ["Button"];
  if (type === "primary") className.push("Button-primary");
  if (type === "secondary") className.push("Button-secondary");
  if (disabled) className.push("Button-primary Button-disabled");
  
  return (
    <button
      type={buttonType}
      disabled={disabled}
      className={className.join(" ")}
      onClick={onClick}
      onMouseOver={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;
