import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <h3>Breeze Travel</h3>
          <p>Book better trips with curated stays, smarter flights, and clear pricing.</p>
        </div>

        <div className="footer-links">
          <a href="#destination-section">Destinations</a>
          <a href="#hotel-section">Hotels</a>
          <a href="#flight-section">Flights</a>
          <a href="#booking-section">Bookings</a>
        </div>
      </div>
      <p className="footer-copy">© 2026 Breeze Travel. All rights reserved.</p>
    </footer>
  );
};
