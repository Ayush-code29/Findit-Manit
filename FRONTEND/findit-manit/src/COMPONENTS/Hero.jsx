import {
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";

import {
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
  CheckCircle,
  Bell,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center transition-colors">

      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-[140px] opacity-20"></div>

      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-[140px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SECTION */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md rounded-full px-5 py-2 mb-8">

              <ShieldCheck
                size={18}
                className="text-green-500"
              />

              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Trusted by MANIT Students
              </span>

            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">

              Lost Something

              <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                On Campus?
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">

              Report lost belongings, discover found items,
              submit ownership claims, and reconnect students
              with their valuables through a secure platform
              built exclusively for MANIT.

            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">

              <SignUpButton mode="modal">

                <button className="group bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">

                  Get Started

                  <ArrowRight
                    className="inline ml-2 group-hover:translate-x-1 transition"
                    size={18}
                  />

                </button>

              </SignUpButton>

              <SignInButton mode="modal">

                <button className="px-8 py-4 rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold shadow-md transition-all duration-300 text-slate-800 dark:text-white">

                  Explore Platform

                </button>

              </SignInButton>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-14">

              <div>

                <h2 className="text-3xl font-bold text-indigo-600">
                  24/7
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Available
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-indigo-600">
                  100%
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Campus Focused
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-indigo-600">
                  Secure
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Authentication
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="relative">

            {/* Main Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8">

              <div className="flex items-center gap-3 mb-6">

                <Search
                  className="text-indigo-600"
                  size={22}
                />

                <input
                  type="text"
                  placeholder="Search wallet, ID card, phone..."
                  className="w-full outline-none bg-transparent text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />

              </div>

              <div className="space-y-4">

                <div className="bg-slate-50 dark:bg-slate-700 p-5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-600 transition">

                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Black Wallet
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-300">
                    Found near SAC Building
                  </p>

                </div>

                <div className="bg-slate-50 dark:bg-slate-700 p-5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-600 transition">

                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Student ID Card
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-300">
                    Found near Library
                  </p>

                </div>

                <div className="bg-slate-50 dark:bg-slate-700 p-5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-600 transition">

                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Fastrack Watch
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-300">
                    Found near Hostel H4
                  </p>

                </div>

              </div>

            </div>

            {/* Floating Card 1 */}
            <div className="hidden lg:flex absolute -left-14 top-10 bg-white dark:bg-slate-800 shadow-xl rounded-2xl px-5 py-4 items-center gap-3 border dark:border-slate-700">

              <CheckCircle
                className="text-green-500"
                size={22}
              />

              <div>

                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                  Item Recovered
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Owner verified successfully
                </p>

              </div>

            </div>

            {/* Floating Card 2 */}
            <div className="hidden lg:flex absolute -right-12 bottom-10 bg-white dark:bg-slate-800 shadow-xl rounded-2xl px-5 py-4 items-center gap-3 border dark:border-slate-700">

              <Bell
                className="text-orange-500"
                size={22}
              />

              <div>

                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                  Claim Request
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-300">
                  New notification received
                </p>

              </div>

            </div>

            {/* Floating Card 3 */}
            <div className="hidden lg:flex absolute right-20 -top-10 bg-white dark:bg-slate-800 shadow-xl rounded-2xl px-5 py-4 items-center gap-3 border dark:border-slate-700">

              <Users
                className="text-indigo-500"
                size={22}
              />

              <div>

                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                  MANIT Community
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Helping students daily
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;