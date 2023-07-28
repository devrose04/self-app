import React, { useState, useEffect } from "react";
import { isFormCompleted, login, passwordReset } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signUpWellness.scss";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import Spinner from "../components/Spinner";

const LoginWellness = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [showForgot, setShowForgot] = useState(false);
  const [passwordHasChanged, setPasswordHasChanged] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordReset = async (e, email) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await passwordReset(email);
      setPasswordHasChanged(true);
      setShowForgot(false);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      setError("There was an error, try again.");
      setPasswordHasChanged(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return navigate("/wellness/dashboard");
      } else {
        return navigate("/wellness/login");
      }
    });
  }, [navigate]);

  return (
    <div className="form-container">
      {!isLoading && (
        <>
          {!showForgot && !passwordHasChanged && (
            <>
              <h2>Welcome Back</h2>
              <form>
                <input
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Email"
                />
                <input
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Password"
                />
                <span className="question">
                  Don’t have an account yet,{" "}
                  <Link to="/wellness/signup">
                    <b>Sign Up</b>
                  </Link>
                </span>
                <span className="forgot" onClick={() => setShowForgot(true)}>
                  Forgot password?
                </span>

                <button
                  className={
                    !isFormCompleted(formState)
                      ? "disabled_button"
                      : "enabled_button_wellness"
                  }
                  disabled={!isFormCompleted(formState)}
                  onClick={(e) => {
                    e.preventDefault();
                    login(
                      formState.email,
                      formState.password,
                      setIsLoading,
                      setError
                    );
                  }}
                >
                  Login
                </button>
              </form>
            </>
          )}
          {showForgot && (
            <form>
              <h2 className="reset_title">Reset password</h2>
              <input
                name="email"
                value={formState.email}
                onChange={(e) => handleInputChange(e)}
                type="email"
                placeholder="Email"
              />
              <button onClick={(e) => handlePasswordReset(e, formState.email)}>
                Send email
              </button>
            </form>
          )}
          {passwordHasChanged && (
            <>
              <span className="confirm_message">
                An email has been sent to reset your password.
              </span>
              <button
                className="go_back"
                onClick={() => setPasswordHasChanged(false)}
              >
                Go back
              </button>
            </>
          )}
        </>
      )}
      {isLoading && <Spinner />}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default LoginWellness;
