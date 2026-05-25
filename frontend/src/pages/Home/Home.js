import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Navbar,
  HotelCard,
  SearchStayWithDate,
  AuthModal,
  ProfileDropDown,
  Alert,
  Hero,
  Footer,
} from "../../components";
import "./Home.css";
import { useDate, useAuth, useAlert } from "../../context";
import { api } from "../../services";

const introHighlights = [
  {
    title: "Instant booking",
    text: "Plan your stay faster with clear pricing, flexible dates, and a checkout flow that feels effortless.",
  },
  {
    title: "Thoughtfully chosen stays",
    text: "Browse handpicked properties with strong reviews, modern amenities, and memorable locations.",
  },
  {
    title: "Travel support",
    text: "Get responsive assistance and a calm booking experience from inspiration to confirmation.",
  },
  {
    title: "Rewards-ready trips",
    text: "Save your favorite stays and revisit them whenever you're planning your next getaway.",
  },
];

const destinationCards = [
  {
    title: "Rome, Italy",
    duration: "10 Days Trip",
    image:
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=900&q=80",
    price: "$5.42k",
  },
  {
    title: "London, UK",
    duration: "12 Days Trip",
    image:
      "https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=900&q=80",
    price: "$4.2k",
  },
  {
    title: "Full Europe",
    duration: "28 Days Trip",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80",
    price: "$15k",
  },
];

const featureCards = [
  {
    title: "Handpicked Hotels",
    text: "Top stays with verified amenities, beautiful views, and trusted hosts.",
  },
  {
    title: "Fast Flight Search",
    text: "Smart route pairing and date flexibility to find great-value airfare quickly.",
  },
  {
    title: "Simple Booking Flow",
    text: "One streamlined process from selection to payment, designed for clarity.",
  },
];

export const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(16);
  const [testData, setTestData] = useState([]);
  const [hotels, setHotels] = useState([]);
  const { isSearchModalOpen } = useDate();

  const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
  const { alert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/hotels");

        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      if (hotels && hotels.length > 0) {
        setHotels(
          hotels.concat(testData.slice(currentIndex, currentIndex + 16)),
        );
        setCurrentIndex((prev) => prev + 16);
      } else {
        setHotels([]);
      }
    }, 1000);
  };

  return (
    <div className="home-shell">
      <Navbar route="home" />
      <Hero />
      <section id="destination-section" className="landing-section">
        <div className="landing-head">
          <p className="eyebrow">Category</p>
          <h2>Top Destinations</h2>
        </div>
        <div className="destination-grid">
          {destinationCards.map((card) => (
            <article key={card.title} className="destination-card">
              <img src={card.image} alt={card.title} />
              <div className="destination-content">
                <div className="destination-title-row">
                  <h3>{card.title}</h3>
                  <span>{card.price}</span>
                </div>
                <p>{card.duration}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="hotel-section" className="landing-section landing-section-soft">
        <div className="landing-head">
          <p className="eyebrow">Services</p>
          <h2>What We Offer</h2>
        </div>
        <div className="feature-grid">
          {featureCards.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-intro">
        <div className="intro-copy">
          <p className="eyebrow">Freshly curated</p>
          <h2>
            Your next getaway, designed to feel effortless from the very first
            click.
          </h2>
          <p>
            Breeze brings together a modern booking flow, elegant hotel
            storytelling, and handpicked stays so you can focus on the journey
            instead of the logistics.
          </p>
        </div>
        <div className="intro-highlights">
          {introHighlights.map((item) => (
            <div key={item.title} className="intro-highlight-card">
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="flight-section" className="landing-section flight-section">
        <div className="flight-copy">
          <p className="eyebrow">Flights</p>
          <h2>Best flights with low-cost add-ons</h2>
          <p>
            Compare routes, departure windows, and baggage options in one clear
            flow before you book.
          </p>
        </div>
        <div className="flight-panel">
          <div>
            <span>From</span>
            <strong>Delhi</strong>
          </div>
          <div>
            <span>To</span>
            <strong>Paris</strong>
          </div>
          <div>
            <span>Fare starts</span>
            <strong>₹34,500</strong>
          </div>
        </div>
      </section>

      {hotels && hotels.length > 0 ? (
        <InfiniteScroll
          dataLength={hotels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            hotels.length > 0 && <h3 className="alert-text">Loading...</h3>
          }
          endMessage={<p className="alert-text">You have seen it all</p>}
        >
          <main
            id="booking-section"
            className="main d-flex align-center wrap gap-larger"
          >
            {hotels &&
              hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
          </main>
        </InfiniteScroll>
      ) : (
        <></>
      )}

      <Footer />
      {isDropDownModalOpen && <ProfileDropDown />}
      {isSearchModalOpen && <SearchStayWithDate />}
      {isAuthModalOpen && <AuthModal />}
      {alert.open && <Alert />}
    </div>
  );
};
