import Hotel from "../model/hotel.model.js";

const singlehotelHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        res.json(hotel)
    }catch(err){
        res.status(404).json({ message: "No hotel found" })
    }
}

export default singlehotelHandler;
