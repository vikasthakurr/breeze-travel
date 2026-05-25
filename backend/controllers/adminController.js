import Hotel from "../model/hotel.model.js";
import User from "../model/user.model.js";
import { v4 as uuid } from "uuid";
import hotels from "../data/hotels.js";

const seedHotelsIfEmpty = async () => {
  const hotelCount = await Hotel.countDocuments();
  if (hotelCount > 0) return;
  await Hotel.insertMany(hotels.data);
};

const getAdminHotelsHandler = async (req, res) => {
  try {
    await seedHotelsIfEmpty();
    const hotels = await Hotel.find({}).sort({ _id: -1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch hotels." });
  }
};

const createAdminHotelHandler = async (req, res) => {
  try {
    const {
      name,
      category,
      address,
      city,
      state,
      country,
      image,
      price,
      rating,
      propertyType,
      isCancelable,
    } = req.body;

    if (
      !name ||
      !category ||
      !address ||
      !city ||
      !state ||
      !country ||
      !image ||
      price === undefined ||
      rating === undefined
    ) {
      return res.status(400).json({ message: "Missing required hotel details." });
    }

    if (Number.isNaN(Number(price)) || Number.isNaN(Number(rating))) {
      return res.status(400).json({ message: "Price and rating must be valid numbers." });
    }

    const createdHotel = await Hotel.create({
      id: uuid(),
      name,
      category,
      image,
      imageArr: [image],
      address,
      city,
      state,
      country,
      price: Number(price),
      rating: Math.min(5, Math.max(0, Number(rating))),
      numberOfBathrooms: 1,
      numberOfBeds: 1,
      numberOfguest: 2,
      numberOfBedrooms: 1,
      numberOfStudies: 0,
      hostName: "Breeze Host",
      hostJoinedOn: "January 2026",
      ameneties: ["Wifi"],
      healthAndSafety: ["Smoke alarm"],
      houseRules: ["Check-in: After 2:00 pm", "Check out: 11:00 am"],
      propertyType: propertyType || "Hotel",
      isCancelable: typeof isCancelable === "boolean" ? isCancelable : true,
    });

    return res.status(201).json(createdHotel);
  } catch (error) {
    return res.status(500).json({ message: "Could not create hotel." });
  }
};

const deleteAdminHotelHandler = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }

    return res.json({ message: "Hotel deleted." });
  } catch (error) {
    return res.status(400).json({ message: "Invalid hotel id." });
  }
};

const updateAdminHotelHandler = async (req, res) => {
  try {
    const {
      name,
      category,
      address,
      city,
      state,
      country,
      image,
      price,
      rating,
      propertyType,
      isCancelable,
    } = req.body;

    const updatedPayload = {};

    if (name !== undefined) updatedPayload.name = name;
    if (category !== undefined) updatedPayload.category = category;
    if (address !== undefined) updatedPayload.address = address;
    if (city !== undefined) updatedPayload.city = city;
    if (state !== undefined) updatedPayload.state = state;
    if (country !== undefined) updatedPayload.country = country;
    if (image !== undefined) {
      updatedPayload.image = image;
      updatedPayload.imageArr = [image];
    }
    if (price !== undefined) {
      if (Number.isNaN(Number(price))) {
        return res.status(400).json({ message: "Price must be a valid number." });
      }
      updatedPayload.price = Number(price);
    }
    if (rating !== undefined) {
      if (Number.isNaN(Number(rating))) {
        return res.status(400).json({ message: "Rating must be a valid number." });
      }
      updatedPayload.rating = Math.min(5, Math.max(0, Number(rating)));
    }
    if (propertyType !== undefined) updatedPayload.propertyType = propertyType;
    if (isCancelable !== undefined) updatedPayload.isCancelable = Boolean(isCancelable);

    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, updatedPayload, {
      new: true,
    });

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }

    return res.json(updatedHotel);
  } catch (error) {
    return res.status(400).json({ message: "Invalid hotel id." });
  }
};

const getAdminUsersHandler = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ _id: -1 });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch users." });
  }
};

export {
  getAdminHotelsHandler,
  createAdminHotelHandler,
  deleteAdminHotelHandler,
  updateAdminHotelHandler,
  getAdminUsersHandler,
};
