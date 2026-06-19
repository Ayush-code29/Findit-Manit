import express from "express";
import upload from "../middleware/upload.js";

import {
  createFoundItem,
  getFoundItems,
  getUserFoundItems,
  deleteFoundItem
} from "../controlllers/founditemController.js";

const router =
  express.Router();

router.post(
  "/",upload.single("image"),
  createFoundItem
);

router.get(
  "/",
  getFoundItems
);
router.get(
  "/user/:userId",
  getUserFoundItems
);
router.delete("/:id", deleteFoundItem);

export default router;