const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Task", TaskSchema);
