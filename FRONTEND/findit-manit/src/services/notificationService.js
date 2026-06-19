import axios from "axios";

const API =
  "http://localhost:5000/api/notifications";

export const getNotifications =
  async (userId) => {
    const res =
      await axios.get(
        `${API}/${userId}`
      );

    return res.data;
  };

export const markNotificationAsRead =
  async (notificationId) => {
    const res =
      await axios.patch(
        `${API}/read/${notificationId}`
      );

    return res.data;
  };

export const markAllNotificationsAsRead =
  async (userId) => {
    const res =
      await axios.patch(
        `${API}/read-all/${userId}`
      );

    return res.data;
  };