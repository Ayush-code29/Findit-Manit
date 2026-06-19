import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { Upload, MapPin, SearchCheck } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function ReportFoundItem() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    phoneNumber: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(
        file,
        options
      );

      setImage(compressedFile);
      setPreview(
        URL.createObjectURL(compressedFile)
      );

    } catch (error) {
      console.error(
        "Compression Error:",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("userId", user.id);

      if (image) {
        data.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:5000/api/found-items",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert(
        "Found Item Report Submitted Successfully!"
      );

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        phoneNumber: "",
      });

      setImage(null);
      setPreview("");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 transition-colors">

      <div className="max-w-3xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <div className="flex items-center gap-3 mb-3">

            <SearchCheck
              size={32}
              className="text-emerald-600"
            />

            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              Report Found Item
            </h1>

          </div>

          <p className="text-slate-500 dark:text-slate-300">
            Found an item on campus? Help its owner find it.
          </p>

        </div>

        {/* Form */}

        <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}

            <div>

              <label className="block mb-2 font-medium text-slate-700 dark:text-slate-200">
                Item Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Black Wallet"
                required
                className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

            </div>

            {/* Description */}

            <div>

              <label className="block mb-2 font-medium text-slate-700 dark:text-slate-200">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the item you found..."
                required
                className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

            </div>

            {/* Category */}

            <div>

              <label className="block mb-2 font-medium text-slate-700 dark:text-slate-200">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">
                  Select Category
                </option>

                <option>Wallet</option>
                <option>ID Card</option>
                <option>Watch</option>
                <option>Mobile Phone</option>
                <option>Keys</option>
                <option>Bag</option>
                <option>Books</option>
                <option>Other</option>

              </select>

            </div>

            {/* Location */}

            <div>

              <label className="block mb-2 font-medium text-slate-700 dark:text-slate-200">
                Found Location
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-3 top-4 text-slate-400"
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Library, SAC, Hostel..."
                  required
                  className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

            </div>

            {/* Phone */}

            <div>

              <label className="block mb-2 font-medium text-slate-700 dark:text-slate-200">
                Contact Number
              </label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

            </div>

            {/* Upload */}

            <div>

              <label className="block mb-2 font-medium text-slate-700 dark:text-slate-200">
                Upload Image
              </label>

              <label className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition">

                <Upload
                  size={32}
                  className="text-emerald-600 mb-2"
                />

                <p className="text-slate-500 dark:text-slate-300">
                  Click to upload image
                </p>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />

              </label>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 rounded-2xl h-48 w-full object-cover"
                />
              )}

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Report Found Item"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ReportFoundItem;