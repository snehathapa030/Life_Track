const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const { title } = require("process");
const { wrapasync } = require("./wrapasync");

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend", "dist")));
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

const mongoDbUrl = process.env.MONGODB_URL;

main()
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(mongoDbUrl);
}

app.post(
	"/api/user/signup",
	wrapasync(async (req, res) => {
		try {
			let { username, email, password } = req.body;
			const newUser = new User({ email, username });
			const registeredUser = await User.register(newUser, password);
			req.login(registeredUser, (err) => {
				if (err) {
					return next(err);
				}
				console.log("Registered user", registeredUser);
				res.json({ user: newUser });
			});
		} catch (e) {
			console.log(e.message);
			res.json({ error: e.message });
		}
	})
);

app.post(
	"/api/user/login",
	passport.authenticate("local", { failureRedirect: "/" }),
	function (req, res) {
		console.log("Login user", req.user);
		res.json({ user: req.user });
	}
);

app.get("/api/user/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			return console.log(err.message);
		}
		res.json({ success: true });
	});
});

app.get(
	"/api/todo/:id",
	wrapasync(async (req, res) => {
		console.log("all todo list user");
		const allTodo = await Todo.find({ userId: req.params.id });
		res.json({ todo: allTodo });
	})
);
app.post(
	"/api/todo",
	wrapasync(async (req, res) => {
		console.log("add todo list");
		const newTodo = new Todo({
			title: req.body.title,
			userId: req.body.userId,
		});
		const todo = await newTodo.save();
		res.json({ success: true, title: todo.title });
	})
);
app.delete(
	"/api/todo/:id",
	wrapasync(async (req, res) => {
		console.log("delete todo list");
		const deletTodo = await Todo.findByIdAndDelete(req.params.id);
		console.log(deletTodo);
		res.json({ success: true });
	})
);
app.get(
	"/api/todo-complete/:id",
	wrapasync(async (req, res) => {
		console.log("complete todo list");

		const todo = await Todo.findById(req.params.id);
		const UpdateTodo = await Todo.findByIdAndUpdate(req.params.id, {
			completed: !todo.completed,
		});
		console.log(UpdateTodo);
		res.json({ success: true, completed: !todo.completed });
	})
);
app.put(
	"/api/todo/:id",
	wrapasync(async (req, res) => {
		console.log("update todo list");

		const UpdateTodo = await Todo.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
		});
		console.log(UpdateTodo);
		res.json({ success: true, title: UpdateTodo.title });
	})
);
app.delete(
	"/api/all-todo-delete/:id",
	wrapasync(async (req, res) => {
		console.log("all todo delete");
		const AllTodoDelete = await Todo.deleteMany({ userId: req.params.id });
		console.log(AllTodoDelete);
		res.json({ success: true, todo: null });
	})
);
app.get(
	"/api/all-todo-complete/:id",
	wrapasync(async (req, res) => {
		console.log("all todo complete");
		const AllTodoComplete = await Todo.find({
			userId: req.params.id,
		}).updateMany({ completed: true });
		console.log(AllTodoComplete);
		res.json({ success: true, todo: null });
	})
);

// ----------------------------------------------------------------

app.use("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
