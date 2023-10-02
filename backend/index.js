import express from "express";
import cors from 'cors'
import './db/config.js'
import user from "./db/user.js";
import product from "./db/product.js";
import multer from "multer";
import path from "path"


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(__dirname);
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static('uploads'));
// app.use('/uploads', express.static('images'));

app.get("/", (req, res) => {
    res.send("App is running")
})
// app.post("/register", async (req, res) => {
//     let usertoregister = new user(req.body);
//     let result = await usertoregister.save();
//     result = result.toObject();
//     delete result.password
//     res.send(result)
// })
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
        // Use the student's name as the filename and keep the original extension
        const ext = path.extname(file.originalname);
        const filename = req.body.name + ext;
        callback(null, filename);
    },
})
const upload = multer({ storage: storage });

app.post("/register", upload.single("profilePic"), async (req, res) => {
    const { name, email, password } = req.body;
    const profilePic = req.file;
    const profilePath = profilePic.path;
    let usertoregister = new user({ name, email, password, profilePath })
    let result = await usertoregister.save();
    result = result.toObject();
    delete result.password
    console.log(result);
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

app.post("/add-product", async (req, res) => {
    let producttoAdd = new product(req.body);
    let result = await producttoAdd.save()
    res.send(result)
})

app.get("/allProducts", async (req, res) => {
    let existingProducts = await product.find();
    if ((existingProducts).length > 0) {
        res.json(existingProducts)
    } else {
        res.json({ result: "NO product found" })
    }
})

app.delete("/product/:id", async (req, res) => {
    const idtodelete = req.params.id
    const result = await product.deleteOne({ _id: idtodelete })
    res.send(result)
})

//To Update
app.get("/product/:id", async (req, res) => {
    let result = await product.findOne({ _id: req.params.id })
    if (result) {
        res.json(result)
    } else {
        res.send({ Result: "NO Product Found" })
    }
})
app.put("/product/:id", async (req, res) => {
    let result = await product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.json(result)
})




app.listen(4000, () => {
    console.log("Server is runnning at port 4000");
})