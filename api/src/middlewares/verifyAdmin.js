import createError from "../util/Error.js";
import verifyToken from "./verifyToken.js";

const verifyAdmin = async (req, res, next) => {
  try {
    // console.log(req.userIsAdmin);
    if (!req.userIsAdmin) {
      return next(createError(403, "You do not have permissions"));
    }
    return next();
  } catch (err) {
    console.log(err);
    next(createError(403, "You do not have permissions"));
  }
};

export default verifyAdmin;
