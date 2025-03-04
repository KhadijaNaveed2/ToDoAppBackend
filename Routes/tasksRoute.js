import express from "express";
import multer from "multer";

import { taskController, createtaskController, deletetaskController, singletaskController, updatetaskController, searchTaskController } from "../Controllers/taskController.js";

// router object
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + (file.originalname || "file"));

    },
  });
  

  const upload = multer({ storage });
//Routing Perform
router.get("/search-task", searchTaskController);
//Create task with file upload
router.post("/create-task", upload.single('file'), createtaskController);

//Update task
router.put("/update-task/:id",updatetaskController);

//GetAll task
router.get("/get-task",  taskController);

//Single task 
router.get("/single-task/:slug",  singletaskController);

//Delete task
router.delete("/delete-task/:id", deletetaskController);


export default router;