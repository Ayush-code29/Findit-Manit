import { useEffect, useState } from "react";
import axios from "axios";

import {
  MapPin,
  Phone,
  PackageSearch,
  AlertCircle,
  Calendar,
} from "lucide-react";

import ClaimModal from "../components/ClaimModal";

function LostItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const fetchLostItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/lost-items"
      );

      setItems(
        res.data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
      );
    } catch (error) {
      console.error(
        "Failed to fetch lost items:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  const handleClaim = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-700 dark:text-white">
          Loading Lost Items...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 transition-colors">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-3 mb-8">

          <PackageSearch
            size={40}
            className="text-red-600"
          />

          <div>

            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              Lost Items Feed
            </h1>

            <p className="text-slate-500 dark:text-slate-400">
              Browse all reported lost items.
            </p>

          </div>

        </div>

        {/* Empty State */}

        {items.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-md text-center">

            <AlertCircle
              size={60}
              className="mx-auto text-red-500 mb-4"
            />

            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              No Lost Items Found
            </h2>

            <p className="text-gray-500 dark:text-slate-400 mt-2">
              No student has reported a
              lost item yet.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* Image */}

                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                {/* Content */}

                <div className="p-5">

                  {/* Category */}

                  <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                    {item.category}
                  </span>

                  {/* Title */}

                  <h2 className="text-2xl font-bold mt-3 text-slate-800 dark:text-white">
                    {item.title}
                  </h2>

                  {/* Description */}

                  <p className="text-gray-600 dark:text-slate-300 mt-2 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Location */}

                  <div className="flex items-center gap-2 mt-4 text-gray-500 dark:text-slate-400">

                    <MapPin size={16} />

                    <span>
                      {item.location}
                    </span>

                  </div>

                  {/* Phone */}

                  {item.phoneNumber && (
                    <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-slate-400">

                      <Phone size={16} />

                      <span>
                        {item.phoneNumber}
                      </span>

                    </div>
                  )}

                  {/* Date */}

                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 dark:text-slate-500">

                    <Calendar size={14} />

                    <span>
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  {/* Button */}

                  <button
                    onClick={() =>
                      handleClaim(item)
                    }
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                  >
                    I Found This Item
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Claim Modal */}

        <ClaimModal
          isOpen={isModalOpen}
          onClose={() =>
            setIsModalOpen(false)
          }
          item={selectedItem}
          itemType="lost"
        />

      </div>

    </div>
  );
}

export default LostItems;