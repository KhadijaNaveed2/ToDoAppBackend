import userModal from "../Modals/userModal.js";
import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phoneno, address, answer, } = req.body;
        //Validation
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phoneno) {
            return res.send({ message: "Phone No is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }
        //CHECK USER
        const existingUser = await userModal.findOne({ email });
        // EXISTING USER CONDITION CHECK
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please Login",
            });
        }
        //REgister User
        const hashedPassword = await hashPassword(password);
        //SAVE
        const user = await new userModal({
            name,
            email,
            phoneno,
            address,
            password: hashedPassword,
            answer,
        }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};

//POST LOGIN 
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //VALIDATION
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            });
        }
        // CHECK USER
        const user = await userModal.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Registered"
            });
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            });
        }
        // TOKEN GENERATE/CREATE

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneno: user.phoneno,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
};
//Forgot Password CONTOLLER
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        //Validation
        if (!email) {
            return res.status(400).send({ message: "Email is Required" });
        }
        if (!answer) {
            return res.status(400).send({ message: "Answer is Required" });
        }
        if (!newPassword) {
            return res.status(400).send({ message: " New Password is Required" });
        }
        //Check
        const user = await userModal.findOne({ email, answer });
        //Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer",
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModal.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};



//get all user controller
export const getUserListController = async (req, res) => {
    try {
        // Exclude users with the role "admin"
        const users = await userModal.find({ role: { $ne: '1' } }, "-password");

        res.status(200).send({
            success: true,
            message: "Users retrieved successfully",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving users",
            error,
        });
    }
};