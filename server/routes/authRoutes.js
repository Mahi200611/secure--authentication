const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { register, login } = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "You are authorized!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("PROFILE ERROR:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;