const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

// Create a new user
const secret = "mysecret123";

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const signup = async (req, res) => {
    const { name, email, password, userType } = req.body;
    console.log("REQ", name, password, userType);
    try {
        const exists = await User.findOne({ email });
        if (exists) {
            throw Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            userType,
        });
        res.status(200).json({ newUser });
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (!exists) {
            throw Error("User doesn't exist");
        }
        const match = bcrypt.compare(password, exists.password);
        if (!match) {
            throw Error("Invalid password");
        }

        const token = generateToken(exists._id);

        res.status(200).json({
            name: exists.name,
            email: exists.email,
            token,
            userType: exists.userType,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

module.exports = {
    signup,
    login,
};
