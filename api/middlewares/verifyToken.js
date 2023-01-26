import createError from "../util/Error.js";
import jwt from 'jsonwebtoken'

const verifyToken = async (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, 'Forbidden'))
    }
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.userId = data.id;
        req.userIsAdmin = data.isAdmin;
        return next()
    } catch (err) {
        return next(createError(401, 'Forbidden'))
    }
}

export default verifyToken;