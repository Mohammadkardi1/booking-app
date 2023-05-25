import express from "express"
import { createRoom, 
    deleteRoom, 
    getAllRooms, 
    getRoom, 
    updateRoom, 
    updateRoomAvailability} from "../controllers/room.js"
import { verifyAdmin } from "../utils/verfiyToken.js"

const router = express.Router()


// CREATE
router.post("/:hotelId", verifyAdmin, createRoom)

// DELETE
router.delete('/', deleteRoom)

// UPDATE
router.put('/:id', verifyAdmin, updateRoom)
router.put('/availability/:id', updateRoomAvailability)

// GET Room
// Everybody can get all Rooms
router.get('/:id', getRoom)

// GET ALL
router.get('/', getAllRooms)


// router.get('/', (req, res)=> {
//     res.send("rooms page")
// })

export default router