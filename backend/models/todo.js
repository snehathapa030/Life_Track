const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
	title: String,
	completed: { type: Boolean, default: false },
	date: { type: Date, default: Date.now },
	userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports.Todo = mongoose.model("Todo", todoSchema);
