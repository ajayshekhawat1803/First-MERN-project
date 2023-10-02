import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    profilePath: String
});

const user = mongoose.model("users",userSchema);
export default user