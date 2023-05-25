import jwt from "jsonwebtoken"
import { createError } from "./error.js"

// middleware to verify that the user is authorized
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, "You are not authenticated"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid"))
        }
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    // The third arguement:a callback function that is executed after 
    // the authentication and authorization checks have been performed.
    verifyToken(req, res, () => {
        // Owner or admin will only have the authorization
        if (req.user.id === req.params.id || req.user.isAdmin ) {
            next()
        } else {
            return next(createError(403, "You are not authorized"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,  () => {
        // Only the admin will have the authorization
        if ( req.user.isAdmin ) {
            next()
        } else {
            return next(createError(403, "You are not authorized"))
        }
    })
}



