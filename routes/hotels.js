import express from 'express'
import Hotel from '../models/Hotel.js'
import { createHotel, 
    deleteHotel,
    updateHotel,
    getHotel,
    getAllHotels, 
    countByCity,
    countByType,
    getHotelsRooms} from '../controllers/hotels.js'
import { verifyAdmin } from '../utils/verfiyToken.js'


const router = express.Router()



// CREATE
router.post("/", createHotel)

// DELETE
router.delete('/:id', deleteHotel)

// UPDATE
router.put('/:id', updateHotel)

// GET hotel
// Everybody can get all hotels
router.get('/find/:id', getHotel)

// GET ALL
router.get('/', getAllHotels)
router.get('/countbycity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelsRooms)


export default router