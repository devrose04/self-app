import React, { useState } from "react";
import { isFormCompleted, signIn } from "../utils";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/signUpDiscover.scss";
import Spinner from "../components/Spinner";
const SignUpDiscover = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    source: "Micah",
    otherInfo: "",
    friend: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn(
      formState.email,
      formState.password,
      formState.confirmPassword,
      formState.firstName,
      formState.lastName,
      formState.source,
      formState.otherInfo,
      formState.friend,
      setIsLoading,
      setError,
      userId
    );
    return result;
  };

  const validateFormState = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "firstName":
          if (!value) {
            stateObj[name] = "Please enter a first name.";
          }
          break;

        case "lastName":
          if (!value) {
            stateObj[name] = "Please enter last name.";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Please enter a valid email.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter password.";
          } else if (
            formState.confirmPassword &&
            value !== formState.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and confirm password do not match.";
          } else {
            stateObj["confirmPassword"] = formState.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter confirm password.";
          } else if (formState.password && value !== formState.password) {
            stateObj[name] = "Password and confirm password do not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateFormState(event);
  };

  return (
    <div className="form-container">
      {!isLoading && (
        <div>
          <h2>Create Account</h2>
          <form>
            <div className="names">
              <input
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                onBlur={validateFormState}
                type="text"
                placeholder="First Name"
              />
              <input
                name="lastName"
                type="text"
                value={formState.last}
                onChange={handleInputChange}
                onBlur={validateFormState}
                placeholder="Last Name"
              />
            </div>
            <input
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              onBlur={validateFormState}
              type="email"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formState.password}
              onChange={handleInputChange}
              onBlur={validateFormState}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Please Confirm Password"
              value={formState.confirmPassword}
              onChange={handleInputChange}
              onBlur={validateFormState}
            />
            <div className="hear_about_us">
              <h3>How did you hear about us?</h3>
              <div className="hear_about_us_options">
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    name="source"
                    value="Facebook"
                    checked={formState.source === "Facebook"}
                    onChange={handleInputChange}
                  />
                  <label>Facebook</label>
                </div>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    value="Reddit"
                    name="source"
                    checked={formState.source === "Reddit"}
                    onChange={handleInputChange}
                  />
                  <label>Reddit</label>
                </div>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    value="Instagram"
                    name="source"
                    checked={formState.source === "Instagram"}
                    onChange={handleInputChange}
                  />
                  <label>Instagram</label>
                </div>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    name="source"
                    value="Micah"
                    checked={formState.source === "Micah"}
                    onChange={handleInputChange}
                  />
                  <label>Micah</label>
                </div>
                <div className="hear_about_us">
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      name="source"
                      value="Friend"
                      checked={formState.source === "Friend"}
                      onChange={handleInputChange}
                    />
                    <label>Friend</label>
                  </div>
                </div>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    value="Other"
                    name="source"
                    checked={formState.source === "Other"}
                    onChange={handleInputChange}
                  />
                  <label>Other</label>
                </div>
              </div>
            </div>
            <div>
              {formState.source === "Other" && (
                <input
                  type="text"
                  name="otherInfo"
                  placeholder="Where from?"
                  value={formState.otherInfo}
                  onChange={handleInputChange}
                />
              )}
              {formState.source === "Friend" && (
                <div>
                  <input
                    type="text"
                    name="friend"
                    placeholder="Friend's Name"
                    value={formState.friend}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            {error.firstName && (
              <span className="error">{error.firstName}</span>
            )}
            {error.lastName && <span className="error">{error.lastName}</span>}
            {error.email && <span className="error">{error.email}</span>}
            {error.confirmPassword && (
              <span className="error">{error.confirmPassword}</span>
            )}
            <button
              className={
                !isFormCompleted(formState)
                  ? "disabled_button"
                  : "enabled_button_discover"
              }
              disabled={!isFormCompleted(formState)}
              onClick={async (e) => {
                const result = await handleSignIn(e);
                if (result) return navigate("/discover/dashboard");
                else {
                  return navigate("/discover/signup");
                }
              }}
            >
              Sign Up
            </button>
            <span className="question">
              Already have an account,{" "}
              <Link to={"/discover/login"}>
                <b>Login</b>
              </Link>
            </span>
          </form>
        </div>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default SignUpDiscover;
