const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/users.model")

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body
        const userAlreadyExists = await UserModel.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10)

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid user name or password" });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid user name or password" });
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

}

async function logoutUser(req, res) {
    res.clearCookie("token")
    return res.status(200).json({
        message: "User logged out successfully"
    })
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser
}