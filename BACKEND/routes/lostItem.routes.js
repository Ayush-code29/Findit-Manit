import express from "express";
import upload from "../middleware/upload.js";

import {
  createLostItem,
  getLostItems,
  getUserLostItems,
  deleteLostItem
} from "../controlllers/lostitemController.js";

const router =
  express.Router();

router.post(
  "/",upload.single("image"),
  createLostItem
);

router.get(
  "/",
  getLostItems
);
router.get(
  "/user/:userId",
  getUserLostItems
);
router.delete("/:id", deleteLostItem);


export default router;