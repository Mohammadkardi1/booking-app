import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";


// Create room
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom._id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

// Delete Room
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.query.hotelId
    try {
        await Room.findByIdAndDelete(req.query.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.query.id}})
        } catch (err) {
            next(err)
        }
        res.status(200).send("Room has been deleted")
    } catch (err) {
        next(err)
    }
}

// Update Room 
export const updateRoom = async (req, res, next) => {

    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true})
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
}


// Update Room Availability  
export const updateRoomAvailability = async (req, res, next) => {

    try {
        await Room.updateOne({"roomNumbers._id": req.params.id}, 
        {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json("Room status has been updated.")
    } catch (err) {
        next(err)
    }
}

// Get Room 
export const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id)
        res.status(200).json(getRoom)
    } catch (err) {
        next(err)
    }
}

// Get all Rooms
export const getAllRooms = async (req, res, next) => {
    try {
        const allRooms = await Room.find()
        res.status(200).json(allRooms)
    } catch (err) {
        next(err)
    }
}