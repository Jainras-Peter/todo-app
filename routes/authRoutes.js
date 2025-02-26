const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Home Page
router.get("/", (req, res) => {
    res.render("index");
});

// Signup Page
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        await User.register(user, password);
        res.redirect("/login");
    } catch (error) {
        res.redirect("/signup");
    }
});

// Login Page
router.get("/login", (req, res) => {
    res.render("login");
});

// Login User
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/tasks",
        failureRedirect: "/login",
    })
);

// Logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

module.exports = router;
