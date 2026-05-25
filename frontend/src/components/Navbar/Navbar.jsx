import "./Navbar.css";
import { useDate, useAuth } from "../../context";
import { Link } from "react-router-dom";

export const Navbar = ({ route }) => {
  const { destination, dateDispatch, checkInDate, checkOutDate, guests } =
    useDate();
  const { authDispatch, accessToken } = useAuth();

  const handleSearchClick = () => {
    dateDispatch({ type: "OPEN_SEARCH_MODAL" });
  };

  const handleAuthClick = () => {
    if (accessToken) {
      authDispatch({ type: "SHOW_DROP_DOWN_OPTIONS" });
    } else {
      authDispatch({ type: "SHOW_AUTH_MODAL" });
    }
  };

  if (route === "home") {
    return (
      <header className="heading heading-home">
        <Link to="/" className="heading-1 heading-home-brand">
          Breeze <span>Travel</span>
        </Link>

        <nav className="home-nav-links">
          <a href="#destination-section">Destinations</a>
          <a href="#hotel-section">Hotels</a>
          <a href="#flight-section">Flights</a>
          <a href="#booking-section">Bookings</a>
        </nav>

        <div className="home-nav-actions">
          <button type="button" className="home-login-btn" onClick={handleAuthClick}>
            Login
          </button>
          <button type="button" className="home-signup-btn" onClick={handleAuthClick}>
            Sign up
          </button>
          <Link to="/admin" className="home-lang-link">
            Admin
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="heading d-flex align-center">
      <Link to="/" className="heading-1">
        Breeze <span>Travel</span>
      </Link>

      {route !== "wishlist" && route !== "admin" && (
        <div
          className="form-container cursor-pointer"
          onClick={handleSearchClick}
        >
          <span className="form-option">
            {route === "home" ? "Any Where" : destination || "Any Where"}
          </span>
          <span className="border-right-1px"></span>
          <span className="form-option">
            {checkInDate && checkOutDate && route !== "home"
              ? `${checkInDate.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })} - ${checkOutDate.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}`
              : "Any Week"}
          </span>
          <span className="border-right-1px"></span>
          <span className="form-option">
            {route !== "home" && guests > 0 ? `${guests} guests` : "Add Guests"}
          </span>
          <span className="search material-icons-outlined">search</span>
        </div>
      )}

      <Link to="/admin" className="admin-nav-link">
        Admin
      </Link>

      <nav className="nav d-flex align-center cursor-pointer" onClick={handleAuthClick}>
        <span className="menu material-icons-outlined profile-option">menu</span>
        <span className="person material-icons-outlined">person_2</span>
      </nav>
    </header>
  );
};
