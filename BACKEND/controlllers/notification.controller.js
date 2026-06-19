import Notification from "../models/Notification.js";

export const getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          receiverId:
            req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.json(notifications);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

export const markAsRead =
  async (req, res) => {
    try {
      await Notification.findByIdAndUpdate(
        req.params.notificationId,
        {
          read: true,
        }
      );

      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

export const markAllAsRead =
  async (req, res) => {
    try {
      await Notification.updateMany(
        {
          receiverId:
            req.params.userId,

          read: false,
        },
        {
          read: true,
        }
      );

      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

export const deleteNotification =
  async (req, res) => {
    try {
      await Notification.findByIdAndDelete(
        req.params.notificationId
      );

      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };