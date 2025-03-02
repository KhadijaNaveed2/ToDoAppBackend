import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true, 
  
  },

  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  file: {
    type: String, 
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("task", taskSchema);