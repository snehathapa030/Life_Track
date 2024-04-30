const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	email: String,
	date: { type: Date, default: Date.now },
});

userSchema.plugin(passportLocalMongoose);

module.exports.User = mongoose.model("User", userSchema);
