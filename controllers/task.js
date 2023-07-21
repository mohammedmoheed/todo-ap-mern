import { Task } from "../models/task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;
    await Task.create({
      title,
      description,
      user,
    });
    res.status(201).json({
      success: true,
      message: "task created successfuly",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });

    if (!tasks) return next(new ErrorHandler("Task not found", 404));

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    //if not completed then ccomplete vice versa
    task.isCompleted = !task.isCompleted;

    //save task
    await task.save();

    res.status(200).json({
      success: true,
      message: `task updated succesfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    // to delete task
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: `task deleted succesfully`,
    });
  } catch (error) {
    next(error);
  }
};
