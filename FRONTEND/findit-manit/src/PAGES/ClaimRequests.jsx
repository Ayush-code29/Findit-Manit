import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function ClaimRequests() {
  const { user } = useUser();

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState("");

  useEffect(() => {
    if (user) {
      fetchClaims();
    }
  }, [user]);

  const fetchClaims = async () => {
    try {
      const res = await axios.get(
        `https://findit-manit-backend-ab8s.onrender.com/api/claims/user/${user.id}`
      );

      setClaims(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const approveClaim = async (claimId) => {
    try {
      setActionLoading(claimId);

      await axios.patch(
        `https://findit-manit-backend-ab8s.onrender.com/api/claims/${claimId}/approve`
      );

      alert("Claim Approved");

      fetchClaims();
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading("");
    }
  };

  const rejectClaim = async (claimId) => {
    try {
      setActionLoading(claimId);

      await axios.patch(
        `https://findit-manit-backend-ab8s.onrender.com/api/claims/${claimId}/reject`
      );

      alert("Claim Rejected");

      fetchClaims();
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white transition-colors">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 transition-colors">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Claim Requests
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage ownership requests submitted for your items.
          </p>

        </div>

        {/* Empty State */}

        {claims.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-md text-center transition-colors">

            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              No Claim Requests
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              You haven't received any ownership requests yet.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {claims.map((claim) => (
              <div
                key={claim._id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md transition-colors"
              >

                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {claim.claimerName}
                </h2>

                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {claim.reason}
                </p>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Phone: {claim.claimerPhone}
                </p>

                <div className="mt-4">

                  <span className="font-semibold text-slate-700 dark:text-gray-300">
                    Status:
                  </span>{" "}

                  <span
                    className={
                      claim.status === "approved"
                        ? "text-green-600 font-semibold"
                        : claim.status === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-500 font-semibold"
                    }
                  >
                    {claim.status}
                  </span>

                </div>

                {claim.status === "pending" && (
                  <div className="flex gap-3 mt-5">

                    <button
                      disabled={
                        actionLoading === claim._id
                      }
                      onClick={() =>
                        approveClaim(
                          claim._id
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {actionLoading === claim._id
                        ? "Processing..."
                        : "Approve"}
                    </button>

                    <button
                      disabled={
                        actionLoading === claim._id
                      }
                      onClick={() =>
                        rejectClaim(
                          claim._id
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition disabled:opacity-50"
                    >
                      Reject
                    </button>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default ClaimRequests;