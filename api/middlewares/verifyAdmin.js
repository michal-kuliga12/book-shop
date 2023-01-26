import createError from "../util/Error.js";
import verifyToken from "./verifyToken.js";

const verifyAdmin = async (req,res,next) => {
    verifyToken(req,res);
    if (!req.userisAdmin) {
        return next(createError(403,'You do not have permissions'))
    }
    next()
}

export default verifyAdmin;