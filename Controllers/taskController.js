import taskModal from "../Modals/taskModal.js";
import slugify from "slugify";

export const createtaskController = async (req, res) => {
  try {
    const { title, description, date, file } = req.body;

    // Check if title is provided
    if (!title || title.trim() === "") {
      return res.status(400).send({ message: "Title is Required" });
    }

    const task = await new taskModal({
      title,
      description,
      date,
      file,
      slug: slugify(title),
    }).save();

    res.status(201).send({ success: true, message: "Task Created", task });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in creating task" });
  }
};

//Update task 
export const updatetaskController = async (req, res) => {
  try {
    const { title } = req.body; // Use title instead of name
    const { id } = req.params;

    const task = await taskModal.findByIdAndUpdate(
      id,
      { title, slug: slugify(title) }, // Fix here
      { new: true }
    );

    if (!task) {
      return res.status(404).send({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating task",
      error,
    });
  }
};

//GetAll taskController

export const taskController = async (req,res) => {
  try {
    const  task = await taskModal.find({});
    res.status(200).send({
      success: true,
      message: "All Tasks List",
      task,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all tasks",
      error,
    });
  }
};

//Single taskController
export const singletaskController =  async (req, res) => {
  try {
  const  task = await taskModal.findOne({slug:req.params.slug});
  res.status(200).send({
    success: true,
    message: "Get single task Successfully",
    task,
  });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Single task",
      error,
    });
    
  }
};
//Delete taskController
export const deletetaskController = async (req,res) => {
  try {
    const {id} = req.params;
            await taskModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Deleting task",
      error,
    });
  }
};
export const searchTaskController = async (req, res) => {
  try {
    const { name } = req.query;

    const tasks = await taskModal.find({ title: { $regex: name, $options: "i" } });
    res.status(200).send({
      success: true,
      message: "Search Results",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while searching tasks",
      error,
    });
  }
};