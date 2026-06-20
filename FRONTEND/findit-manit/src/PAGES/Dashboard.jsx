import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import DeveloperModal from "../COMPONENTS/DeveloperModal";

import {
  Search,
  PackageSearch,
  AlertTriangle,
  CheckCircle,
  Shield,
  FileText,
  Bell,
  Users,
  Trophy,
  Moon,
  Sun,
} from "lucide-react";

import NotificationBell from "../components/NotificationBell";


function Dashboard() {
  const { user } = useUser();
  const [showDeveloperModal, setShowDeveloperModal] =
  useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">

        <h1 className="text-2xl font-bold text-indigo-600 dark:text-white">
          FindIt MANIT
        </h1>

        <div className="flex items-center gap-5">

          <Link
            to="/my-reports"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 font-medium transition"
          >
            <FileText size={18} />
            My Reports
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 transition"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-slate-700" />
            )}
          </button>

          <NotificationBell />

          <UserButton afterSignOutUrl="/" />
        </div>

      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-10 text-white shadow-xl">

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Welcome, {user?.firstName || "Student"} 👋
          </h1>

          <p className="text-lg text-indigo-100 max-w-2xl">
            Report lost items, help others recover theirs,
            and make MANIT campus a better place.
          </p>

        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <Link to="/report-lost">
            <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">

              <AlertTriangle
                size={42}
                className="text-red-500 mb-4"
              />

              <h2 className="text-xl font-bold">
                Report Lost Item
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Lost something? Create a report now.
              </p>

            </div>
          </Link>

          <Link to="/report-found">
            <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">

              <CheckCircle
                size={42}
                className="text-green-500 mb-4"
              />

              <h2 className="text-xl font-bold">
                Report Found Item
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Help someone recover their belongings.
              </p>

            </div>
          </Link>

          <Link to="/lost-items">
            <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">

              <PackageSearch
                size={42}
                className="text-indigo-500 mb-4"
              />

              <h2 className="text-xl font-bold">
                Lost Items Feed
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Browse all reported lost items.
              </p>

            </div>
          </Link>

          <Link to="/found-items">
            <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">

              <Search
                size={42}
                className="text-blue-500 mb-4"
              />

              <h2 className="text-xl font-bold">
                Found Items Feed
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Browse all found items.
              </p>

            </div>
          </Link>

        </div>

        {/* Claim Requests */}
        <div className="mt-10">

          <Link to="/claim-requests">

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">

              <h2 className="text-3xl font-bold">
                Claim Requests
              </h2>

              <p className="mt-3 text-purple-100">
                Manage ownership requests submitted for your items.
              </p>

            </div>

          </Link>

        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-3xl shadow-md">

            <Users
              size={32}
              className="text-indigo-600 mb-3"
            />

            <h3 className="text-2xl font-bold">
              Community Driven
            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Students helping students recover belongings.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-3xl shadow-md">

            <Bell
              size={32}
              className="text-orange-500 mb-3"
            />

            <h3 className="text-2xl font-bold">
              Smart Notifications
            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Get claim requests and updates instantly.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-3xl shadow-md">

            <Trophy
              size={32}
              className="text-green-600 mb-3"
            />

            <h3 className="text-2xl font-bold">
              Trusted Platform
            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Designed specifically for MANIT students.
            </p>

          </div>

        </div>

        {/* Safety */}
        <div className="mt-10 bg-white dark:bg-slate-800 dark:text-white rounded-3xl shadow-md p-8">

          <div className="flex items-center gap-4 mb-4">

            <Shield
              size={36}
              className="text-green-600"
            />

            <h2 className="text-2xl font-bold">
              Safe & Verified Recovery
            </h2>

          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Use the claim system to verify ownership before
            returning an item. This ensures belongings reach
            their rightful owners securely and safely.
          </p>

        </div>

        {/* Footer */}
        <footer className="mt-14 py-8 border-t border-slate-300 dark:border-slate-700">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <div>

              <h2 className="font-bold text-indigo-600 text-xl">
                FindIt MANIT
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Campus Lost & Found Platform
              </p>

            </div>


            <div className="flex gap-6 text-gray-500 dark:text-gray-400">

              <Link to="/lost-items">
                Lost Items
              </Link>

              <Link to="/found-items">
                Found Items
              </Link>

              <Link to="/my-reports">
                My Reports
              </Link>

            </div>

          </div>


          <div className="text-center text-gray-400 text-sm mt-6">
            © 2026 FindIt MANIT. All Rights Reserved.
          </div>


          <div className="flex justify-center mt-6">

            <button
              onClick={() => setShowDeveloperModal(true)}
              className="
                px-6
                py-3
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-cyan-500
                text-white
                font-semibold
                shadow-lg
                hover:scale-105
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              Know About Developer
            </button>

          </div>


        </footer>


        <DeveloperModal
          isOpen={showDeveloperModal}
          onClose={() =>
            setShowDeveloperModal(false)
          }
        />


      </div>

    </div>
  );
}

export default Dashboard;