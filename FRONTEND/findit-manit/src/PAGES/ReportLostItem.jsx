import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { Upload, MapPin } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function ReportLostItem() {
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
  const [compressing, setCompressing] = useState(false);

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
      setCompressing(true);

      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1000,
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

      console.log(
        "Original:",
        (file.size / 1024 / 1024).toFixed(2),
        "MB"
      );

      console.log(
        "Compressed:",
        (
          compressedFile.size /
          1024 /
          1024
        ).toFixed(2),
        "MB"
      );

    } catch (error) {
      console.error(
        "Compression Error:",
        error
      );

      alert("Image compression failed");
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append(
        "description",
        formData.description
      );
      payload.append(
        "category",
        formData.category
      );
      payload.append(
        "location",
        formData.location
      );
      payload.append(
        "phoneNumber",
        formData.phoneNumber
      );
      payload.append(
        "userId",
        user.id
      );

      if (image) {
        payload.append(
          "image",
          image
        );
      }

      const response = await axios.post(
        "https://findit-manit-backend-ab8s.onrender.com/api/lost-items",
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert(
        "Lost Item Reported Successfully!"
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

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Report Lost Item
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-2">
            Lost something on campus? Submit the
            details below.
          </p>

        </div>

        {/* Form Card */}

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
                className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                placeholder="Describe the lost item..."
                required
                className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                Last Seen Location
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
                  className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>

            </div>

            {/* Contact Number */}

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
                className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Upload */}

            <div>

              <label className="block mb-2 font-medium text-slate-700 dark:text-slate-200">
                Upload Image (Optional)
              </label>

              <label className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition">

                <Upload
                  size={32}
                  className="text-indigo-500 mb-2"
                />

                <p className="text-slate-500 dark:text-slate-300">
                  {compressing
                    ? "Compressing Image..."
                    : "Click to upload image"}
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
              disabled={
                loading || compressing
              }
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Report Lost Item"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ReportLostItem;