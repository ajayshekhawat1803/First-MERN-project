import express from "express";
import cors from 'cors'
import './db/config.js'
import user from "./db/user.js";

// import mongoose from "mongoose";
// const connectDB = async () => {
//     mongoose.connect("mongodb://localhost:27017/e-com");
//     const productSchema = new mongoose.Schema({})
//     const product = mongoose.model('products', productSchema)
//     const data = await product.find()
//     console.log(data);
// }
// connectDB();

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("App is running")
})
app.post("/register", async (req, res) => {
    let usertoregister = new user(req.body);
    let result = await usertoregister.save();
    result = result.toObject();
    delete result.password
    res.send(result)
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let usertologin = await user.findOne(req.body).select("-password")

        if (usertologin) {
            res.send(usertologin)
        } else {
            res.send({ result: "no user found" })
        }
    }
    else {
        res.send({ result: "Plzz Enter both fields" })
    }
})


app.listen(4000, () => {
    console.log("Server is runnning at port 4000");
})