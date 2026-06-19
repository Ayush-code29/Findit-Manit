import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Bell } from "lucide-react";

function Notifications() {
  const { user } = useUser();

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchNotifications =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:5000/api/notifications/${user.id}`
          );

        setNotifications(res.data);

        // Mark all unread notifications as read
        for (const notification of res.data) {
          if (!notification.read) {
            await axios.patch(
              `http://localhost:5000/api/notifications/read/${notification._id}`
            );
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (user) {
      fetchNotifications();

      const interval =
        setInterval(() => {
          fetchNotifications();
        }, 5000);

      return () =>
        clearInterval(interval);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-3 mb-8">

          <Bell
            size={34}
            className="text-indigo-600"
          />

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

        </div>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 shadow-md text-center">

            <h2 className="text-xl font-semibold">
              No Notifications Yet
            </h2>

          </div>
        ) : (
          <div className="space-y-4">

            {notifications.map(
              (notification) => (
                <div
                  key={
                    notification._id
                  }
                  className={`bg-white rounded-3xl p-6 shadow-md border-l-4 ${
                    notification.title.includes(
                      "Approved"
                    )
                      ? "border-green-500"
                      : notification.title.includes(
                          "Rejected"
                        )
                      ? "border-red-500"
                      : "border-indigo-500"
                  }`}
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <h2 className="font-bold text-lg">
                        {
                          notification.title
                        }
                      </h2>

                      <p className="text-gray-600 mt-2">
                        {
                          notification.message
                        }
                      </p>
                    </div>

                    {!notification.read && (
                      <span className="bg-red-500 w-3 h-3 rounded-full" />
                    )}

                  </div>

                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default Notifications;