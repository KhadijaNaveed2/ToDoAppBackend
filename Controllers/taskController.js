import taskModal from "../Modals/taskModal.js";
import slugify from "slugify";

export const createtaskController = async (req,res) => {
    try {
        const {name} = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is Required" });
          }
        const existingtask = await taskModal.findOne({name})
        if(existingtask) {
            return res.status(200).send({
                success: true,
                message: "task Already Exists"
              });
        }
    const  task = await new taskModal({name, slug: slugify(name)}).save();
    res.status(201).send({
        success: true,
        message: "New task Created ",
        task,
      });

    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in task",
      error,
    })
}
};

//Update task 
export const updatetaskController = async (req,res) => {
try {
  const {name} = req.body;
  const {id} = req.params;

  const  task = await taskModal.findByIdAndUpdate(
    id, 
    {name, slug: slugify(name)},
    {new: true}
    );
    if (!task) {
      return res.status(404).send({
        success: false,
        message: "task not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "task Updated Successfully",
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