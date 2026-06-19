import {
  Bell,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useUser,
} from "@clerk/clerk-react";

import NotificationDropdown from "./NotificationDropdown";

function NotificationBell() {
  const { user } =
    useUser();

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    open,
    setOpen,
  ] = useState(false);

  const fetchNotifications =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:5000/api/notifications/${user.id}`
          );

        setNotifications(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleOpen =
    async () => {
      const newState =
        !open;

      setOpen(newState);

      if (
        newState &&
        notifications.length > 0
      ) {
        try {
          await axios.patch(
            `http://localhost:5000/api/notifications/read-all/${user.id}`
          );

          setNotifications(
            notifications.map(
              (n) => ({
                ...n,
                read: true,
              })
            )
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

  const unreadCount =
    notifications.filter(
      (n) => !n.read
    ).length;

  return (
    <div className="relative">

      <button
        onClick={handleOpen}
        className="relative"
      >
        <Bell size={24} />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
  notifications={notifications}
  setNotifications={setNotifications}
  refreshNotifications={fetchNotifications}
/>
      )}
    </div>
  );
}

export default NotificationBell;