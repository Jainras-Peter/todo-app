require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // ✅ Import Local Strategy
const User = require("./models/User"); // Import User Model
const connectDB = require("./config/database");

//helmet cors
const helmet = require("helmet");
const cors = require("cors");

app.use(helmet());
app.use(cors());

// Initialize Express App
const app = express();
connectDB();

// Set View Engine and Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session Setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mysecret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Use Passport Local Strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
