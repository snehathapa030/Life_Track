import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/slice/todoSlice";

const Main = () => {
	const userId = useSelector((store) => store.user.userDetail?._id);
	const allTodo = useSelector((store) => store.todo.todoDetail);
	const [newTodo, setNewTodo] = useState("");
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [addTodoForm, setAddTodoForm] = useState(false);
	const [updateTodoForm, setUpdateTodoForm] = useState(false);
	const [oldTodoId, setOldTodoId] = useState(null);
	const [oldTodoTitle, setOldTodoTitle] = useState(null);
	const handleAddTodo = () => {
		console.log("addTodo called");
		fetch("/api/todo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title.charAt(0).toUpperCase() + title.slice(1),
				userId: userId,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				setNewTodo(json);
			})
			.catch((err) => {
				console.log(err);
			});
		setTitle("");
	};
	const handleUpdateTodo = (todoId) => {
		console.log("updateTodo called");
		fetch("/api/todo/" + todoId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title:
					oldTodoTitle.charAt(0).toUpperCase() +
					oldTodoTitle.slice(1),
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				setNewTodo(json);
			})
			.catch((err) => {
				console.log(err);
			});
		setOldTodoTitle("");
		setOldTodoId("");
		setUpdateTodoForm(false);
	};
	const handleDleteTodo = (todoId) => {
		console.log("deleteTodo called");
		fetch("/api/todo/" + todoId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setNewTodo(json);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleCompleteTodo = (todoId) => {
		console.log("deleteTodo called");
		fetch("/api/todo-complete/" + todoId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setNewTodo(json);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const allTodoCall = () => {
		console.log("allTodo called");
		fetch("/api/todo/" + userId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch(addTodo(json.todo));
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleAllDelete = () => {
		console.log("allCompleteTodo called");
		fetch("/api/all-todo-delete/" + userId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch(addTodo(json.todo));
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleAllComplete = () => {
		console.log("allCompleteTodo called");
		fetch("/api/all-todo-complete/" + userId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setNewTodo(json);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		console.log("Main useEffect called");
		if (userId) {
			allTodoCall();
		}
	}, [newTodo]);
	return (
		<div
			onClick={() => {
				setAddTodoForm(false);
				setUpdateTodoForm(false);
			}}
			className="flex flex-col items-center my-10 text-slate-300 min-h-[80vh] relative"
		>
			<h2 className="text-2xl underline underline-offset-8 font-semibold tracking-[-.14rem] sm:tracking-normal">
				Track your daily activities
			</h2>
			<div className="relative pb-14 w-[90%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-500 rounded-lg h-fit min-h-[60vh]  mt-5">
				{allTodo?.map((item) => (
					<div
						key={item._id}
						className={
							item.completed
								? "border border-white m-3 py-2 px-8 rounded-full flex justify-between sm:text-lg sm:font-medium bg-green-600 text-white"
								: "border border-slate-800 m-3 py-2 px-8 rounded-full flex justify-between sm:text-lg sm:font-medium bg-slate-300 text-slate-700"
						}
					>
						<h2>{item.title}</h2>
						<div className="flex items-center gap-3 sm:gap-5 md:gap-7">
							<p
								onClick={(e) => {
									e.stopPropagation();
									setOldTodoId(item?._id);
									setOldTodoTitle(item?.title);
									setUpdateTodoForm(true);
								}}
								className="cursor-pointer"
							>
								<i className="fa-regular fa-pen-to-square"></i>
							</p>
							<p
								onClick={() => handleDleteTodo(item._id)}
								className="cursor-pointer"
							>
								<i className="fa-regular fa-trash-can"></i>
							</p>
							{item.completed ? (
								<p
									className="cursor-pointer"
									onClick={() => handleCompleteTodo(item._id)}
								>
									<i className="fa-solid fa-square-check"></i>
								</p>
							) : (
								<p
									className="cursor-pointer"
									onClick={() => handleCompleteTodo(item._id)}
								>
									<i className="fa-regular fa-square"></i>
								</p>
							)}
						</div>
					</div>
				))}
				<div className="flex sm:gap-3  absolute bottom-3 right-1 sm:right-3 text-xs sm:text-base">
					{allTodo && (
						<button
							onClick={handleAllDelete}
							className="bg-black rounded-full px-5 py-2 sm:font-medium border border-slate-400 shadow-lg hover:text-black hover:bg-white transition-all"
						>
							All_Deleted
						</button>
					)}
					<button
						onClick={handleAllComplete}
						className="bg-black rounded-full px-5 py-2 sm:font-medium border border-slate-400 shadow-lg hover:text-black hover:bg-white transition-all"
					>
						All_Completed
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							setAddTodoForm(true);
						}}
						className="bg-black rounded-full px-5 py-2 sm:font-medium border border-slate-400 shadow-lg hover:text-black hover:bg-white transition-all"
					>
						Add
					</button>
				</div>
			</div>
			{addTodoForm ? (
				<div
					onClick={(e) => e.stopPropagation()}
					className="fixed top-1/3 p-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-700 rounded-lg h-fit  mt-5 transition-all"
				>
					<form className="w-full flex justify-between flex-col">
						<h3 className="text-xl font-semibold p-1">
							Enter Todo
						</h3>
						<input
							className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
							type="text"
							placeholder="Enter Username"
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<button
							onClick={(e) => {
								if (title) {
									handleAddTodo();
								}
								e.preventDefault();
							}}
							className="w-full font-semibold hover:bg-black rounded-full px-5 py-4 mt-5 text-lg border border-slate-400  text-slate-500 hover:text-white bg-slate-800 transition-all"
						>
							Add
						</button>
					</form>
				</div>
			) : null}
			{updateTodoForm ? (
				<div
					onClick={(e) => e.stopPropagation()}
					className="fixed top-1/3 p-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-700 rounded-lg h-fit  mt-5 transition-all"
				>
					<form className="w-full flex justify-between flex-col">
						<h3 className="text-xl font-semibold p-1">
							Enter Todo
						</h3>
						<input
							className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
							type="text"
							placeholder="Enter Username"
							name="title"
							value={oldTodoTitle}
							onChange={(e) => setOldTodoTitle(e.target.value)}
						/>
						<button
							onClick={(e) => {
								if (oldTodoTitle) {
									handleUpdateTodo(oldTodoId);
								}
								e.preventDefault();
							}}
							className="w-full font-semibold hover:bg-black rounded-full px-5 py-4 mt-5 text-lg border border-slate-400  text-slate-500 hover:text-white bg-slate-800 transition-all"
						>
							Update
						</button>
					</form>
				</div>
			) : null}
		</div>
	);
};

export default Main;

// Update todo baki hai ________________
