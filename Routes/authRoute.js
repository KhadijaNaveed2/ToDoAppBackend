import express from "express";
import {registerController, loginController,  forgotPasswordController, getUserListController, updateProfileController,} from "../Controllers/authController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";


// router object
const router = express.Router();

//Routing Perform

//Register || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);


//get all users
router.get('/users', requireSignIn, getUserListController);

router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ok: true});
});
router.put("/profile", requireSignIn, updateProfileController);


export default router;
