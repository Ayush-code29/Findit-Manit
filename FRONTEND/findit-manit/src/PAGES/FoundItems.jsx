import { useEffect, useState } from "react";
import axios from "axios";

import {
  MapPin,
  SearchCheck,
  Package,
  Phone,
  Calendar,
} from "lucide-react";

import ClaimModal from "../components/ClaimModal";

function FoundItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const fetchFoundItems = async () => {
    try {
      const res = await axios.get(
        "https://findit-manit-backend-ab8s.onrender.com/api/found-items"
      );

      setItems(
  res.data.sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  )
);
    } catch (error) {
      console.log(error);

      setError(
        "Failed to load found items. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const handleClaim = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Loading Found Items...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900">
        <h1 className="text-xl text-red-500 font-semibold">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8 dark:bg-slate-900">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-3 mb-8">

          <SearchCheck
            size={38}
            className="text-emerald-600"
          />

          <div>

            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              Found Items Feed
            </h1>

            <p className="text-gray-500 dark:text-gray-400">
              Browse items reported by students.
            </p>

          </div>

        </div>

        {/* Empty State */}

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-md text-center dark:bg-slate-800">

            <Package
              size={60}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              No Found Items Yet
            </h2>

            <p className="text-gray-500 mt-2 dark:text-gray-400">
              Be the first student to report
              a found item.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >

                {/* Image */}

                <img
                  src={
                    item.image ||
                    "/placeholder-item.jpg"
                  }
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  {/* Category + Status */}

                  <div className="flex justify-between items-center">

                    <span className="inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                      {item.category}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "claimed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.status || "Available"}
                    </span>

                  </div>

                  {/* Title */}

                  <h2 className="text-2xl font-bold mt-4 text-slate-800 dark:text-white">
                    {item.title}
                  </h2>

                  {/* Description */}

                  <p className="text-gray-600 mt-2 line-clamp-3 dark:text-gray-300">
                    {item.description}
                  </p>

                  {/* Location */}

                  <div className="flex items-center gap-2 mt-4 text-gray-500 dark:text-gray-400">

                    <MapPin size={16} />

                    <span>
                      {item.location}
                    </span>

                  </div>

                  {/* Contact */}

                  {item.phoneNumber && (
                    <div className="flex items-center gap-2 mt-3 text-gray-500 dark:text-gray-400">

                      <Phone size={16} />

                      <span>
                        {item.phoneNumber}
                      </span>

                    </div>
                  )}

                  {/* Date */}

                  {item.createdAt && (
                    <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm dark:text-gray-500">

                      <Calendar size={14} />

                      <span>
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </span>

                    </div>
                  )}

                  {/* Hostel / Department */}

                  {item.hostelDepartment && (
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      {item.hostelDepartment}
                    </div>
                  )}

                  {/* Claim Button */}

                  <button
                    onClick={() =>
                      handleClaim(item)
                    }
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition dark:hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Claim Item
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Claim Modal */}

        {selectedItem && (
          <ClaimModal
            isOpen={isModalOpen}
            onClose={() =>
              setIsModalOpen(false)
            }
            item={selectedItem}
          />
        )}

      </div>

    </div>
  );
}

export default FoundItems;