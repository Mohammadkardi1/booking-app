import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { createError } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({ 
            ...req.body,
            password: hash,
            isAdmin: req.body.isAdmin || false
        })
        await newUser.save()
        res.status(200).json(newUser)
    } catch (err) {
        next(err)
    }
}


// Login function 
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            return next(createError(404, "User not found!"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password!"))
        }

        // To avoid include password and isAdmin in response
        const {password, isAdmin, ...otherDetails} = user._doc


        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)


        res.cookie('access_token', token, {
            httpOnly: true,
            
        })
        .status(200).json({details: {...otherDetails}, isAdmin})
    } catch (err) {
        next(err)
    }
}


