import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import { useAuth } from "../../context";
import { api, getAuthConfig } from "../../services";
import "./Admin.css";

const dummyHotelImage = "https://placehold.co/600x400/f8e7cf/1f2a58?text=Breeze+Travel";

const initialFormData = {
  name: "",
  category: "",
  address: "",
  city: "",
  state: "",
  country: "",
  image: "",
  price: "",
  rating: "",
  propertyType: "Hotel",
  isCancelable: true,
};

export const Admin = () => {
  const { accessToken } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingHotelId, setEditingHotelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activePanel, setActivePanel] = useState("overview");
  const [searchText, setSearchText] = useState("");
  const [cancelFilter, setCancelFilter] = useState("all");

  const totalHotels = useMemo(() => hotels.length, [hotels]);
  const avgPrice = useMemo(() => {
    if (hotels.length === 0) return 0;
    return Math.round(hotels.reduce((sum, hotel) => sum + hotel.price, 0) / hotels.length);
  }, [hotels]);
  const avgRating = useMemo(() => {
    if (hotels.length === 0) return 0;
    const totalRating = hotels.reduce((sum, hotel) => sum + hotel.rating, 0);
    return (totalRating / hotels.length).toFixed(1);
  }, [hotels]);
  const cancellableCount = useMemo(
    () => hotels.filter((hotel) => hotel.isCancelable).length,
    [hotels],
  );
  const recentHotels = useMemo(() => hotels.slice(0, 4), [hotels]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesSearch = `${hotel.name} ${hotel.city} ${hotel.state}`
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCancelFilter =
        cancelFilter === "all"
          ? true
          : cancelFilter === "cancelable"
            ? hotel.isCancelable
            : !hotel.isCancelable;
      return matchesSearch && matchesCancelFilter;
    });
  }, [hotels, searchText, cancelFilter]);

  const totalUsers = useMemo(() => users.length, [users]);

  const fetchHotels = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        "/api/admin/hotels",
        getAuthConfig(accessToken || localStorage.getItem("token")),
      );
      setHotels(data || []);
    } catch (error) {
      setErrorMessage("Could not load hotels.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await api.get(
        "/api/admin/users",
        getAuthConfig(accessToken || localStorage.getItem("token")),
      );
      setUsers(data || []);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          "Could not load users. Please restart backend server.",
      );
    }
  }, [accessToken]);

  useEffect(() => {
    const currentRole = localStorage.getItem("role");
    if (currentRole !== "admin") {
      setErrorMessage("Admin access required. Please login as admin.");
      return;
    }
    fetchHotels();
    fetchUsers();
  }, [fetchHotels, fetchUsers]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateHotel = async (event) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    try {
      setLoading(true);
      await api.post(
        "/api/admin/hotels",
        {
          ...formData,
          price: Number(formData.price),
          rating: Number(formData.rating),
          isCancelable: formData.isCancelable === "true",
        },
        getAuthConfig(accessToken || localStorage.getItem("token")),
      );
      setMessage("Hotel added successfully.");
      setFormData(initialFormData);
      await fetchHotels();
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Could not add hotel.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = (hotel) => {
    setActivePanel("add");
    setEditingHotelId(hotel._id);
    setFormData({
      name: hotel.name || "",
      category: hotel.category || "",
      address: hotel.address || "",
      city: hotel.city || "",
      state: hotel.state || "",
      country: hotel.country || "",
      image: hotel.image || "",
      price: hotel.price || "",
      rating: hotel.rating || "",
      propertyType: hotel.propertyType || "Hotel",
      isCancelable: hotel.isCancelable ? "true" : "false",
    });
    setMessage("");
    setErrorMessage("");
  };

  const handleHotelUpdate = async (event) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    try {
      setLoading(true);
      await api.put(
        `/api/admin/hotels/${editingHotelId}`,
        {
          ...formData,
          price: Number(formData.price),
          rating: Number(formData.rating),
          isCancelable: formData.isCancelable === "true",
        },
        getAuthConfig(accessToken || localStorage.getItem("token")),
      );
      setMessage("Hotel updated successfully.");
      setEditingHotelId("");
      setFormData(initialFormData);
      await fetchHotels();
      setActivePanel("inventory");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Could not update hotel.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingHotelId("");
    setFormData(initialFormData);
  };

  const handleDeleteHotel = async (hotelId) => {
    setMessage("");
    setErrorMessage("");
    try {
      setLoading(true);
      await api.delete(
        `/api/admin/hotels/${hotelId}`,
        getAuthConfig(accessToken || localStorage.getItem("token")),
      );
      setMessage("Hotel removed.");
      setHotels((prev) => prev.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      setErrorMessage("Could not remove hotel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <Navbar route="admin" />

      <main className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-profile">
            <div className="admin-avatar">BT</div>
            <div>
              <p className="admin-role">Administrator</p>
              <h3>Breeze Team</h3>
              <span>ops@breezetravel.com</span>
            </div>
          </div>

          <nav className="admin-nav">
            <button
              type="button"
              className={activePanel === "overview" ? "admin-nav-active" : ""}
              onClick={() => setActivePanel("overview")}
            >
              <span className="material-icons-outlined">dashboard</span>
              Overview
            </button>
            <button
              type="button"
              className={activePanel === "add" ? "admin-nav-active" : ""}
              onClick={() => setActivePanel("add")}
            >
              <span className="material-icons-outlined">add_business</span>
              Add Hotel
            </button>
            <button
              type="button"
              className={activePanel === "inventory" ? "admin-nav-active" : ""}
              onClick={() => setActivePanel("inventory")}
            >
              <span className="material-icons-outlined">inventory_2</span>
              Inventory
            </button>
            <button
              type="button"
              className={activePanel === "users" ? "admin-nav-active" : ""}
              onClick={() => setActivePanel("users")}
            >
              <span className="material-icons-outlined">group</span>
              Users
            </button>
            <Link to="/" className="admin-home-link">
              <span className="material-icons-outlined">home</span>
              Go to Home
            </Link>
          </nav>
        </aside>

        <section className="admin-content">
          <header className="admin-hero">
            <p className="admin-kicker">Breeze control room</p>
            <h1>Interactive Admin Dashboard</h1>
            <p>Manage properties, monitor performance, and keep inventory fresh.</p>
          </header>

          <section className="admin-metrics">
            <article className="admin-metric-card">
              <span className="material-icons-outlined">apartment</span>
              <p>Total Hotels</p>
              <strong>{totalHotels}</strong>
            </article>
            <article className="admin-metric-card">
              <span className="material-icons-outlined">payments</span>
              <p>Average Price</p>
              <strong>₹{avgPrice}</strong>
            </article>
            <article className="admin-metric-card">
              <span className="material-icons-outlined">star</span>
              <p>Average Rating</p>
              <strong>{avgRating}</strong>
            </article>
            <article className="admin-metric-card">
              <span className="material-icons-outlined">event_available</span>
              <p>Cancelable Stays</p>
              <strong>{cancellableCount}</strong>
            </article>
            <article className="admin-metric-card">
              <span className="material-icons-outlined">person</span>
              <p>Registered Users</p>
              <strong>{totalUsers}</strong>
            </article>
          </section>

          {message ? <p className="admin-feedback success">{message}</p> : null}
          {errorMessage ? <p className="admin-feedback error">{errorMessage}</p> : null}

          {activePanel === "overview" && (
            <section className="admin-card">
              <h2>Recently added hotels</h2>
              {recentHotels.length === 0 ? (
                <p className="admin-empty">No hotels available.</p>
              ) : (
                <div className="admin-grid">
                  {recentHotels.map((hotel) => (
                    <article className="admin-hotel" key={hotel._id}>
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        onError={(event) => {
                          event.currentTarget.src = dummyHotelImage;
                        }}
                      />
                      <div>
                        <h3>{hotel.name}</h3>
                        <p>
                          {hotel.city}, {hotel.state}
                        </p>
                        <p>₹{hotel.price} / night</p>
                      </div>
                      <span className="admin-status-pill">
                        {hotel.isCancelable ? "Cancelable" : "Fixed Booking"}
                      </span>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {activePanel === "add" && (
            <section className="admin-card">
              <h2>{editingHotelId ? "Edit hotel" : "Add new hotel"}</h2>
              <form className="admin-form" onSubmit={editingHotelId ? handleHotelUpdate : handleCreateHotel}>
                <input name="name" placeholder="Hotel name" value={formData.name} onChange={handleChange} required />
                <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                <input name="image" placeholder="Main image URL" value={formData.image} onChange={handleChange} required />
                <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)" value={formData.rating} onChange={handleChange} required />
                <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                  <option value="Hotel">Hotel</option>
                  <option value="House">House</option>
                  <option value="Guest House">Guest House</option>
                </select>
                <select name="isCancelable" value={String(formData.isCancelable)} onChange={handleChange}>
                  <option value="true">Cancelable</option>
                  <option value="false">Non-cancelable</option>
                </select>

                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editingHotelId ? "Update hotel" : "Add hotel"}
                </button>
                {editingHotelId ? (
                  <button type="button" className="admin-cancel-btn" onClick={handleCancelEdit}>
                    Cancel edit
                  </button>
                ) : null}
              </form>
            </section>
          )}

          {activePanel === "inventory" && (
            <section className="admin-card">
              <div className="admin-inventory-head">
                <h2>Current hotels</h2>
                <div className="admin-actions-row">
                  <input
                    className="admin-search"
                    placeholder="Search by hotel or city"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                  />
                  <select value={cancelFilter} onChange={(event) => setCancelFilter(event.target.value)}>
                    <option value="all">All stays</option>
                    <option value="cancelable">Cancelable</option>
                    <option value="non-cancelable">Non-cancelable</option>
                  </select>
                </div>
              </div>
              {loading && hotels.length === 0 ? (
                <p className="admin-empty">Loading hotels...</p>
              ) : filteredHotels.length === 0 ? (
                <p className="admin-empty">No hotels match your filters.</p>
              ) : (
                <div className="admin-grid">
                  {filteredHotels.map((hotel) => (
                    <article className="admin-hotel" key={hotel._id}>
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        onError={(event) => {
                          event.currentTarget.src = dummyHotelImage;
                        }}
                      />
                      <div>
                        <h3>{hotel.name}</h3>
                        <p>
                          {hotel.city}, {hotel.state}
                        </p>
                        <p>₹{hotel.price} / night</p>
                      </div>
                      <div className="admin-row-actions">
                        <button type="button" className="admin-edit-btn" onClick={() => handleEditStart(hotel)}>
                          <span className="material-icons-outlined">edit</span>
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDeleteHotel(hotel._id)}>
                          <span className="material-icons-outlined">delete</span>
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {activePanel === "users" && (
            <section className="admin-card">
              <h2>Registered users</h2>
              {users.length === 0 ? (
                <p className="admin-empty">No users registered yet.</p>
              ) : (
                <div className="admin-grid">
                  {users.map((user) => (
                    <article className="admin-user" key={user._id}>
                      <div className="admin-user-avatar">
                        {(user.username || "U").slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <h3>{user.username || "Unnamed user"}</h3>
                        <p>{user.email || "No email provided"}</p>
                        <p>{user.number || "No number provided"}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </section>
      </main>
    </div>
  );
};
