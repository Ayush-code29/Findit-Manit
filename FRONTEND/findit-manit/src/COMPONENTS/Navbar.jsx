import { useEffect, useState } from "react";
import { SignInButton } from "@clerk/clerk-react";
import {
  SearchCheck,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

function Navbar() {
  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    } else {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    }

    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">

      <nav className="backdrop-blur-2xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-700 shadow-xl rounded-3xl px-6 md:px-8 py-4 flex items-center justify-between transition-colors">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">

            <SearchCheck
              size={24}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">

              <span className="text-slate-900 dark:text-white">
                FindIt
              </span>

              <span className="text-indigo-600">
                {" "}MANIT
              </span>

            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
              Campus Lost & Found Platform
            </p>

          </div>

        </div>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-10">

          <a
            href="#"
            className="relative text-slate-700 dark:text-slate-200 font-medium hover:text-indigo-600 transition group"
          >
            Home

            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>

          </a>

          <a
            href="#how-it-works"
            className="relative text-slate-700 dark:text-slate-200 font-medium hover:text-indigo-600 transition group"
          >
            How It Works

            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>

          </a>

          <a
            href="#about"
            className="relative text-slate-700 dark:text-slate-200 font-medium hover:text-indigo-600 transition group"
          >
            About

            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>

          </a>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Dark Mode Toggle */}

          <button
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:scale-105 transition"
          >
            {darkMode ? (
              <Sun
                size={20}
                className="text-yellow-400"
              />
            ) : (
              <Moon
                size={20}
                className="text-slate-700"
              />
            )}
          </button>

          {/* Sign In */}

          <SignInButton mode="modal">

            <button
              className="
                bg-gradient-to-r
                from-indigo-600
                via-blue-600
                to-violet-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
                shadow-lg
                hover:shadow-2xl
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Sign In
            </button>

          </SignInButton>

          {/* Mobile Menu */}

          <button className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition">

            <Menu
              size={24}
              className="dark:text-white"
            />

          </button>

        </div>

      </nav>

    </header>
  );
}

export default Navbar;