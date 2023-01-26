import jwt from "jsonwebtoken"

const generateToken = (user) => {
    return jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.ACCESS_TOKEN, {expiresIn: "15s"})
}

export default generateToken