const User = require('../models/User')
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json({ err: err.message })
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json({ msg: "Account Has Been Updated" })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    } else {
        return res.status(403).json({ msg: "You can update your account only" });
    }
}

const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ msg: "Account Has Been Deleted successfully" })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    } else {
        return res.status(403).json({ msg: "You can delete your account only" });
    }
}
const getSingleUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById({ _id: userId }) :
            await User.findOne({ username: username });
        const { password, createdAt, updatedAt, ...other } = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json({ msg: "User has been followed" })
            } else {
                res.status(403).json({ msg: "You allready follow this user" });
            }
        } catch (err) {

            res.status(500).json({ err: err.message });
        }
    } else {
        res.status(403).json({ msg: "You Can't follow yourself" });
    }
}

const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json({ msg: "User has been unfollowed" })
            } else {
                res.status(403).json({ msg: "You don't follow this user" });
            }
        } catch (err) {

            res.status(500).json({ err: err.message });
        }
    } else {
        res.status(403).json({ msg: "You Can't unfollow yourself" });
    }
}



module.exports = { updateUser, deleteUser, getSingleUser, followUser, unfollowUser }