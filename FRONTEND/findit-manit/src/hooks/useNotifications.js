import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  getNotifications,
} from "../services/notificationService";

const useNotifications = () => {
  const { user } = useUser();

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchNotifications =
    async () => {
      if (!user) return;

      try {
        const data =
          await getNotifications(
            user.id
          );

        setNotifications(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!user) return;

    fetchNotifications();

    const interval =
      setInterval(() => {
        fetchNotifications();
      }, 5000);

    return () =>
      clearInterval(interval);
  }, [user]);

  return {
    notifications,
    loading,
    refreshNotifications:
      fetchNotifications,
  };
};

export default useNotifications;