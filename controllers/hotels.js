import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

// Create new hotel 
export const createHotel = async (req, res, next) => {
    // creates a new instance of the Hotel Mongoose model using the request body data.
    // The req.body object contains the data submitted by the client in the request body.
    const newHotel = new Hotel(req.body)

    try {
        // saves the new hotel object to the database using the save() method of the Mongoose model. 
        // This method returns a Promise, so we need to use await to wait for the Promise to resolve 
        // before continuing.
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        // sends an error response back to the client with a status code of 500 (Internal Server Error)
        next(err)
    }
}


// Delete hotel
export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send("Hotel has been deleted")
    } catch (err) {
        next(err)
    }
}

// Update hotel 
export const updateHotel = async (req, res, next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}


// Get hotel 
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

// Get all hotels
export const getAllHotels = async (req, res, next) => {

    const {min, max, limit, ...others} =  req.query

    try {
        // const allHotels = await Hotel.find({...others,cheapestPrice: {$gt:min || 1, $lt:max || 999 }}).limit(limit)
        
        
        const allHotels = await Hotel.find({...others, cheapestPrice: {$gt:min || 1, $lt:max || 999}}).limit(limit)
        res.status(200).json(allHotels)
    } catch (err) {
        next(err)
    }
}

// Get all hotels by city
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

// Get all hotels by type
export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({type: "apartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})

        
        res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},
        ])
    } catch (err) {
        next(err)
    }
}


export const getHotelsRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
            })
        )
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}