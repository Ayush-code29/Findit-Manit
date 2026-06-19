import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/sync-user", async (req, res) => {
  try {
    const {
      clerkId,
      name,
      email,
      phoneNumber,
    } = req.body;

    let user = await User.findOne({
      clerkId,
    });

    if (!user) {
      user = await User.create({
        clerkId,
        name,
        email,
        phoneNumber,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;