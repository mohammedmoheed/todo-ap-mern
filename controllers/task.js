import { Task } from "../models/task.js";

export const createTask = async (req, res) => {
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
};

export const getMyTasks = async (req, res) => {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId });

  if (!tasks)
    return res.status(404).json({
      success: false,
      message: "task not found",
    });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  //if not completed then ccomplete vice versa
  task.isCompleted = !task.isCompleted;

  //save task
  await task.save();

  if (!task)
    return res.status(404).json({
      success: false,
      message: "task not found",
    });

  res.status(200).json({
    success: true,
    message: `task updated succesfully`,
  });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  // to delete task
  await task.deleteOne();

  if (!task)
    return res.status(404).json({
      success: false,
      message: "task not found",
    });

  res.status(200).json({
    success: true,
    message: `task deleted succesfully`,
  });
};
