const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body});
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error);
        }

    } else {
        return res.status(403).json("You can update only your account")
    }
})

// delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error);
        }

    } else {
        return res.status(403).json("You can delete only your account")
    }
})

// get user
router.get("/", async (req, res) => {
    const userId = req.query.userId; // http://localhost:8800/users?userId=007
    const username = req.query.username; // http://localhost:8800/users?username=bond
    try {
        const user = userId 
            ? await User.findById(userId) 
            : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error)
    }
});

// get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend => {
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
    }
})

// follow user
router.put("/:id/follow", async (req, res) => {
    // current user (body) follows user (params)
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {following: req.params.id}});
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You cannot follow yourself")
    }
})

// unfollow user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {following: req.body.userId}});
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You already do not follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You cannot unfollow yourself")
    }
})

module.exports = router