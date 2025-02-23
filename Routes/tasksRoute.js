import express from "express";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import { taskController, createtaskController, deletetaskController, singletaskController, updatetaskController } from "../Controllers/taskController.js";

// router object
const router = express.Router();

//Routing Perform
//Create task

router.post("/create-task", requireSignIn, isAdmin, createtaskController);

//Update task
router.post("/update-task/:id", requireSignIn, isAdmin, updatetaskController);

//GetAll task
router.get("/get-task",  taskController);

//Single task 
router.get("/single-task/:slug",  singletaskController);

//Delete task
router.delete("/delete-task/:id", requireSignIn, isAdmin, deletetaskController);

export default router;