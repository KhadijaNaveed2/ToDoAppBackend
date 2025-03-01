import JWT from "jsonwebtoken";

import userModal from "../Modals/userModal.js";
//PROTECT ROUTES TOKEN BASE
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token not provided",
      });
    }

    const decode = JWT.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.status(401).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

//ADMIN ACCESS MIDDLEWARE
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Admin Middleware",
      error,
    });
  }
};
