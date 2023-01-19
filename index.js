const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan")
const cors = require("cors")
const multer = require("multer");
const path = require("path")

// routes imoports
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")

// dotenv config 
dotenv.config()


// middleware
app.use(express.json());
// app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/images")
    ,
    filename: (req, file, cb) => cb(null, String(req.body.name)),
})
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File Uploaded Successfully");
    } catch (err) {
        console.log(err)
    }
});

app.use("/images", express.static(path.join(__dirname, "public/images")))
// routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/posts", postRoutes)



// server setup
const port = process.env.PORT || 3001
mongoose.set('strictQuery', false).connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}).catch((err) => {
    console.log(`${err} didn't connect`)
})