import "./AuthModal.css";
import { AuthLogin, AuthSignup } from "../index";
import { useAuth } from "../../context";

export const AuthModal = () => {
  const { authDispatch, selectedTab } = useAuth();

  const handleLoginClick = () => {
    authDispatch({ type: "SET_TO_LOGIN" });
  };

  const handleSignupClick = () => {
    authDispatch({ type: "SET_TO_SIGNUP" });
  };

  const handleModalCloseClick = () => {
    authDispatch({ type: "SHOW_AUTH_MODAL" });
  };

  return (
    <div className="auth-modal-container fixed">
      <div className="auth-modal absolute">
        <div className="auth-modal-header">
          <div>
            <p className="auth-modal-eyebrow">Welcome to Breeze</p>
            <h2>
              {selectedTab === "login" ? "Log in" : "Create your account"}
            </h2>
            <p className="auth-modal-copy">
              {selectedTab === "login"
                ? "Access your saved stays, wishlist, and trip preferences in one place."
                : "Sign up for a smoother booking flow, smarter recommendations, and secure travel management."}
            </p>
          </div>
          <button
            className="button btn-close cursor-pointer"
            onClick={handleModalCloseClick}
            aria-label="Close authentication modal"
          >
            <span className="material-icons-outlined">close</span>
          </button>
        </div>

        <div className="auth-tab-row">
          <button
            className={`button btn-auth ${
              selectedTab === "login" ? "btn-auth-selected" : ""
            }`}
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className={`button btn-auth ${
              selectedTab === "signup" ? "btn-auth-selected" : ""
            }`}
            onClick={handleSignupClick}
          >
            Signup
          </button>
        </div>

        <div className="auth-modal-body">
          {selectedTab === "login" ? <AuthLogin /> : <AuthSignup />}
        </div>
      </div>
    </div>
  );
};
