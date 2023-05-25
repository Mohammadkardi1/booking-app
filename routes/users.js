import express from 'express'
import { deleteUser,
    updateUser,
    getUser,
    getAllUsers } from '../controllers/users.js'
import { verifyToken, 
    verifyUser,
    verifyAdmin } from '../utils/verfiyToken.js'


const router = express.Router()



// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send('hello user, you are logged in')
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send('hello user, you are logged in and you can delete your account')
// })

// router.get('/verifyAdmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('hello user, you are logged in and you can delete all accounts')
// })





// Delete User 
router.delete("/:id", deleteUser)


// Update User 
router.put("/updateUser/:id", verifyUser, updateUser)


// Get User
router.get("/getUser/:id", verifyUser, getUser)

// Get All Users
router.get('/', getAllUsers)

// router.get('/', (req, res) => {
//     res.send("user endpoint")
// })

export default router