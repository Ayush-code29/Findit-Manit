import User from "../models/user.js";

export const syncUser = async (
  req,
  res
) => {
  try {
    const {
      clerkId,
      name,
      email,
      imageUrl,
    } = req.body;

    let user =
      await User.findOne({
        clerkId,
      });

    if (!user) {
      user = await User.create({
        clerkId,
        name,
        email,
        imageUrl,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};