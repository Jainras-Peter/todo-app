const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// Show tasks page
router.get("/", isAuthenticated, async (req, res) => {
    const tasks = await Task.find({ userId: req.user._id });
    res.render("todo", { user: req.user, tasks });
});

// Add task
router.post("/", isAuthenticated, async (req, res) => {
    const newTask = new Task({ userId: req.user._id, title: req.body.title });
    await newTask.save();
    res.redirect("/tasks");
});

// Delete task
router.post("/:id/delete", isAuthenticated, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/tasks");
});

module.exports = router;
