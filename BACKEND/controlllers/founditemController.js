import FoundItem from "../models/FoundItem.js";

export const createFoundItem = async (req, res) => {
  try {
    const item =
await FoundItem.create({
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

export const getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find({
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

export const getUserFoundItems = async (
  req,
  res
) => {
  try {
    const items = await FoundItem.find({
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

export const deleteFoundItem = async (
  req,
  res
) => {
  try {
    const deletedItem =
      await FoundItem.findByIdAndDelete(
        req.params.id
      );

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message:
        "Found item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};