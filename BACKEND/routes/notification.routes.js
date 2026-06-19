import express from "express";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controlllers/notification.controller.js";

const router = express.Router();

router.get(
  "/:userId",
  getNotifications
);

router.patch(
  "/read/:notificationId",
  markAsRead
);

router.patch(
  "/read-all/:userId",
  markAllAsRead
);

router.delete(
  "/:notificationId",
  deleteNotification
);

export default router;