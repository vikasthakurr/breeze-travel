import "./Auth.css";
import { useAuth, useAlert } from "../../context";
import {
  validateEmail,
  validateName,
  validateNumber,
  validatePassword,
} from "../../utils";

import { signupHandler } from "../../services";

export const AuthSignup = () => {
  const { username, email, password, number, authDispatch } = useAuth();

  const { setAlert } = useAlert();

  const handleNumberChange = (event) => {
    authDispatch({
      type: "NUMBER",
      payload: event.target.value,
    });
  };

  const handleNameChange = (event) => {
    authDispatch({
      type: "NAME",
      payload: event.target.value,
    });
  };

  const handleEmailChange = (event) => {
    authDispatch({
      type: "EMAIL",
      payload: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    authDispatch({
      type: "PASSWORD",
      payload: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const isNumberValid = validateNumber(number);
    const isNameValid = validateName(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isNumberValid || !isNameValid || !isEmailValid || !isPasswordValid) {
      setAlert({
        open: true,
        message: "Please fill valid name, number, email, and password.",
        type: "error",
      });
      return;
    }

    const isSuccess = await signupHandler(
      username,
      number,
      email,
      password,
      setAlert,
    );

    if (isSuccess) {
      authDispatch({
        type: "CLEAR_USER_DATA",
      });
      authDispatch({ type: "SET_TO_LOGIN" });
    }
  };

  return (
    <div className="auth-container">
      <h3 className="auth-title">Create your account</h3>
      <p className="auth-copy">Save hotels, track bookings, and get a smoother checkout flow.</p>
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>{" "}
          </label>
          <input
            value={number}
            type="tel"
            className="auth-input"
            placeholder="Enter Mobile Number"
            required
            onChange={handleNumberChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Name <span className="asterisk">*</span>{" "}
          </label>
          <input
            value={username}
            className="auth-input"
            placeholder="Enter Name"
            required
            onChange={handleNameChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Email <span className="asterisk">*</span>{" "}
          </label>
          <input
            value={email}
            className="auth-input"
            placeholder="Enter Email"
            type="email"
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>{" "}
          </label>
          <input
            value={password}
            className="auth-input"
            placeholder="Enter Password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="button btn-primary btn-login cursor">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
