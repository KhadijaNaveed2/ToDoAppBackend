import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

import cors from "cors";


//dotenv configure
dotenv.config();

//database config
connectDB();

//rest objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//PORT
const PORT = process.env.PORT || 5000;
//Run Listen
app.listen(PORT, () => {
    console.log(`Server on running ${PORT}`.bgCyan.bgWhite);
});
