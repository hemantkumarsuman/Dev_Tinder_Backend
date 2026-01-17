// WITH MIDDLEWARE
// purpose: this middleware will read the token from req cookies, validate the token, Find the user

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        //Read the token from req cookies
        const cookies = req.cookies;
        const { token } = cookies;
        if(!token){
            throw new Error("Token is not valid");
        }

        const decodeToken = await jwt.verify(token, "DEV@Tinder$790");

        //Find User using _id
        const { _id } = decodeToken;
        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send(err.message);
    }

}



module.exports = {
    userAuth,
}