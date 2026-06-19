import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import {
  Trash2,
  AlertTriangle,
  CheckCircle,
  MapPin,
} from "lucide-react";

function MyReports() {
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState("lost");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const [lostRes, foundRes] = await Promise.all([
        axios.get(
          `http://localhost:5000/api/lost-items/user/${user.id}`
        ),
        axios.get(
          `http://localhost:5000/api/found-items/user/${user.id}`
        ),
      ]);

      setLostItems(lostRes.data);
      setFoundItems(foundRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const deleteLostReport = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this report?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/lost-items/${id}`
      );

      setLostItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFoundReport = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this report?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/found-items/${id}`
      );

      setFoundItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const reports =
    activeTab === "lost"
      ? lostItems
      : foundItems;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white transition-colors">
        Loading Reports...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 transition-colors">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-md p-8 mb-8 transition-colors">

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            My Reports
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage all your lost and found reports.
          </p>

        </div>

        {/* Tabs */}

        <div className="flex gap-4 mb-8">

          <button
            onClick={() =>
              setActiveTab("lost")
            }
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "lost"
                ? "bg-red-500 text-white"
                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            }`}
          >
            Lost Reports
          </button>

          <button
            onClick={() =>
              setActiveTab("found")
            }
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "found"
                ? "bg-green-500 text-white"
                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            }`}
          >
            Found Reports
          </button>

        </div>

        {/* Empty State */}

        {reports.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-md transition-colors">

            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
              No Reports Found
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              You haven't created any reports yet.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {reports.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >

                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/500"
                  }
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between items-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === "lost"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {activeTab === "lost"
                        ? "Lost"
                        : "Found"}
                    </span>

                    {activeTab === "lost" ? (
                      <AlertTriangle
                        className="text-red-500"
                        size={20}
                      />
                    ) : (
                      <CheckCircle
                        className="text-green-500"
                        size={20}
                      />
                    )}

                  </div>

                  <h2 className="text-xl font-bold mt-4 text-slate-800 dark:text-white">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-gray-500 dark:text-gray-400">
                    <MapPin size={16} />
                    {item.location}
                  </div>

                  <button
                    onClick={() =>
                      activeTab === "lost"
                        ? deleteLostReport(
                            item._id
                          )
                        : deleteFoundReport(
                            item._id
                          )
                    }
                    className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Trash2 size={18} />
                    Delete Report
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyReports;