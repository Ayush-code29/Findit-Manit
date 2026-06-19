import LostItem from "../models/LostItem.js";

export const createLostItem = async (
  req,
  res
) => {
  try {
   const item =
await LostItem.create({
  ...req.body,

  image:
    req.file?.path || "",
});

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getLostItems = async (
  req,
  res
) => {
  try {
    const items =
      await LostItem.find({
        status: "available",
      }).sort({
        createdAt: -1,
      });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserLostItems = async (
  req,
  res
) => {
  try {
    const items =
      await LostItem.find({
        userId: req.params.userId,
      }).sort({
        createdAt: -1,
      });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteLostItem = async (
  req,
  res
) => {
  try {
    const deletedItem =
      await LostItem.findByIdAndDelete(
        req.params.id
      );

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message:
        "Lost item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};