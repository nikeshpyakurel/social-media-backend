const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan")
const cors = require("cors")
// routes imoports
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")

// dotenv config 
dotenv.config()


// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

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