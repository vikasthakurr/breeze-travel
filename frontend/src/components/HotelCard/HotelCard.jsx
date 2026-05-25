import "./HotelCard.css";
import { useNavigate } from "react-router-dom";
import { useWishlist, useAuth, useAlert } from "../../context";
import { findHotelInWishlist } from "../../utils";

const dummyHotelImage = "https://placehold.co/600x400/f8e7cf/1f2a58?text=Breeze+Travel";

export const HotelCard = ({ hotel }) => {
  const { _id, name, image, address, state, rating, price } = hotel;
  const { wishlistDispatch, wishlist } = useWishlist();
  const { accessToken, authDispatch } = useAuth();
  const { setAlert } = useAlert();
  const isHotelInWishlist = findHotelInWishlist(wishlist, _id);
  const navigate = useNavigate();

  const handleHotelCardClick = () => {
    navigate(`/hotels/${name}/${address}-${state}/${_id}/reserve`);
  };

  const handleWishlistClick = () => {
    if (accessToken) {
      if (!isHotelInWishlist) {
        wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: hotel });
        setAlert({
          open: true,
          message: `Hotel:: ${name} added to wishlist`,
          type: "success",
        });
      } else {
        wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: _id });
        setAlert({
          open: true,
          message: `Hotel:: ${name} removed from wishlist`,
          type: "success",
        });
      }
    } else {
      authDispatch({ type: "SHOW_AUTH_MODAL" });
    }
  };

  return (
    <div className="hotelcard-container">
      <div onClick={handleHotelCardClick}>
        <div className="image-container">
          <img
            src={image}
            alt={name}
            className="img"
            onError={(event) => {
              event.currentTarget.src = dummyHotelImage;
            }}
          />
        </div>

        <div className="hotelcard-details">
          <div className="d-flex">
            <span className="location">
              {address}, {state}
            </span>
            <span className="rating">
              <span className="material-icons-outlined">star</span>
              {rating}
            </span>
          </div>

          <p className="hotel-name">{name}</p>

          <p className="price-details">
            <span className="price">Rs. {price}</span>
            <span>night</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        className="button btn-wishlist"
        onClick={handleWishlistClick}
      >
        <span className={`material-icons ${isHotelInWishlist ? "fav-selected" : "favorite"}`}>
          favorite
        </span>
      </button>
    </div>
  );
};
