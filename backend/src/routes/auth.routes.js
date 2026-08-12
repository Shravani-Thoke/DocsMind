const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/register", (req, res) => {
    res.send("Register Page");
})

router.get("/login", (req, res) => {
    res.send("Login Page");
})

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/logout", AuthController.logoutUser);

router.get("/google", passport.authenticate("google",
    { scope: ["profile", "email"] }
));

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    (req, res) => {
        const token = jwt.sign(
            {
                id: req.user._id,
                email: req.user.email,
            },
            process.env.JWT_SECRET
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        // Redirect or respond with token
        res.redirect(
            `${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard`
        ); // Example redirect
    })



module.exports = router;