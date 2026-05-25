import React from "react";
import "./Hero.css";

export const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <p className="hero-badge">BEST DESTINATIONS AROUND THE WORLD</p>
        <h1 className="hero-title">
          Travel, enjoy and live a new and full life
        </h1>
        <p className="hero-subtitle">
          Built Wicket longer admire do barton vanity itself do in it. Preferred
          to sportsmen it engrossed listening. Park gate sell they west hard for
          the.
        </p>

        <div className="hero-actions">
          <a href="#stay-grid" className="hero-btn">
            Find out more
          </a>
          <div className="hero-play-wrap">
            <button type="button" className="hero-play-button">
              <span className="material-icons">play_arrow</span>
            </button>
            <span className="hero-secondary">Play Demo</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-blob" />
        <img
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80"
          alt="Traveler with backpack"
          className="hero-traveler"
        />
        <span className="hero-plane hero-plane-a">✈</span>
        <span className="hero-plane hero-plane-b">✈</span>
      </div>
    </section>
  );
};
