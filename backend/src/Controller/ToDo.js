 const Todo = require("../Model/todo");
const User = require("../Model/User");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, priority } = req.body;

    if (!title || !assignedTo) {
      return res.status(400).json({ message: "Title and AssignedTo are required" });
    }

    const user = await User.findById(assignedTo);
    if (!user) return res.status(404).json({ message: "Assigned employee not found" });

    const task = new Todo({
      title,
      description,
      assignedTo,
      dueDate,
      priority,
      createdBy: req.user._id,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Task Create Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
