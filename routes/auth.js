import express from 'express'
import { register, 
    login} from '../controllers/auth.js'

const router = express.Router()

// Create User
router.post('/register', register)

// Login 
router.post('/login', login)




export default router