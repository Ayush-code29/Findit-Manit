import axios from "axios";

function NotificationDropdown({
  notifications,
  setNotifications,
  refreshNotifications,
}) {
  const approveClaim = async (
    claimId,
    notificationId
  ) => {
    try {
      // Remove notification instantly

      setNotifications((prev) =>
        prev.filter(
          (n) => n._id !== notificationId
        )
      );

      await axios.patch(
        `http://localhost:5000/api/claims/${claimId}/approve`
      );

      alert("Claim Approved");
    } catch (error) {
      console.log(error);

      refreshNotifications();
    }
  };

  const rejectClaim = async (
    claimId,
    notificationId
  ) => {
    try {
      // Remove notification instantly

      setNotifications((prev) =>
        prev.filter(
          (n) => n._id !== notificationId
        )
      );

      await axios.patch(
        `http://localhost:5000/api/claims/${claimId}/reject`
      );

      alert("Claim Rejected");
    } catch (error) {
      console.log(error);

      refreshNotifications();
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4 z-50 border border-slate-200 dark:border-slate-700">

      <h3 className="font-bold text-lg mb-3 text-slate-800 dark:text-white">
        Notifications
      </h3>

      {notifications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No Notifications
        </p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className="border-b border-slate-200 dark:border-slate-700 py-3"
          >
            <h4 className="font-semibold text-slate-800 dark:text-white">
              {notification.title}
            </h4>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {notification.message}
            </p>

            {notification.claimId && (
              <div className="flex gap-2 mt-3">

                <button
                  type="button"
                  onClick={() =>
                    approveClaim(
                      notification.claimId,
                      notification._id
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition"
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() =>
                    rejectClaim(
                      notification.claimId,
                      notification._id
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                >
                  Reject
                </button>

              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationDropdown;