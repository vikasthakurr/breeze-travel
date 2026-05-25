import "./Auth.css";
import { validateNumber, validatePassword } from "../../utils";
import { loginHandler } from "../../services";
import { useAuth, useAlert } from "../../context";
import { useNavigate } from "react-router-dom";

export const AuthLogin = () => {
  const { authDispatch, number, password } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const handleNumberChange = (event) => {
    authDispatch({
      type: "NUMBER",
      payload: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    authDispatch({
      type: "PASSWORD",
      payload: event.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isNumberValid = validateNumber(number);
    const isPasswordValid = validatePassword(password);
    if (!isNumberValid || !isPasswordValid) {
      setAlert({
        open: true,
        message: "Please enter valid number and password.",
        type: "error",
      });
      return;
    }
    const response = await loginHandler(number, password, setAlert);
    if (response) {
      const { accessToken, username } = response;
      authDispatch({
        type: "SET_ACCESS_TOKEN",
        payload: accessToken,
      });
      authDispatch({
        type: "SET_USER_NAME",
        payload: username,
      });
      authDispatch({
        type: "SHOW_AUTH_MODAL",
      });
    }
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
  };

  const handleTestCredentialsClick = async () => {
    const response = await loginHandler(
      7878787878,
      "Abcd@1234",
      setAlert,
    );
    if (!response) return;
    const { accessToken, username } = response;
    authDispatch({
      type: "SET_ACCESS_TOKEN",
      payload: accessToken,
    });
    authDispatch({
      type: "SET_USER_NAME",
      payload: username,
    });
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  const handleAdminLoginClick = async () => {
    const response = await loginHandler(
      9999999999,
      "Admin@1234",
      setAlert,
    );
    if (!response) return;
    const { accessToken, username } = response;
    authDispatch({
      type: "SET_ACCESS_TOKEN",
      payload: accessToken,
    });
    authDispatch({
      type: "SET_USER_NAME",
      payload: username,
    });
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
    navigate("/admin");
  };

  return (
    <div className="auth-container">
      <h3 className="auth-title">Welcome back</h3>
      <p className="auth-copy">Continue planning your next escape with Breeze Travel.</p>
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
          <button className="button btn-primary btn-login cursor">Login</button>
        </div>
      </form>
      <div className="cta">
        <button
          className="button btn-outline-primary cursor-pointer"
          onClick={handleTestCredentialsClick}
        >
          Login with Test Credentials
        </button>
        <button
          className="button btn-outline-primary cursor-pointer"
          onClick={handleAdminLoginClick}
          type="button"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};
