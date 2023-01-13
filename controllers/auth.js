const User = require('../models/User')
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken')


//register
const createUser = async (req, res) => {
    try {
        // password generate
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //creat new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save user 
        const user = await newUser.save();
        // generating jwt token when user is created
        const accessToken = sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "24hrs" });
        res.status(200).json({ user, "message": "User Created Successfully", accessToken });

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}


// login

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json({ err: "User Not Found" });
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json({ msg: "Invalid Password" });
        // generating jwt token for login
        const accessToken = sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "24hrs" });
        res.status(200).json({user,accessToken})
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

module.exports = { createUser, loginUser }