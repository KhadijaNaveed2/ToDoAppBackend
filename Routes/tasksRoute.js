import express from "express";

import { taskController, createtaskController, deletetaskController, singletaskController, updatetaskController, searchTaskController } from "../Controllers/taskController.js";

// router object
const router = express.Router();

//Routing Perform
router.get("/search-task", searchTaskController);
//Create task

router.post("/create-task",  createtaskController);

//Update task
router.put("/update-task/:id",updatetaskController);

//GetAll task
router.get("/get-task",  taskController);

//Single task 
router.get("/single-task/:slug",  singletaskController);

//Delete task
router.delete("/delete-task/:id", deletetaskController);


export default router;