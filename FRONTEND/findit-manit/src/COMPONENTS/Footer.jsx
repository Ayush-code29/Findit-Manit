import {
  Mail,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer
      id="about"
      className="
        relative
        bg-white
        dark:bg-slate-950
        text-slate-900
        dark:text-white
        overflow-hidden
        transition-colors
      "
    >
      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-[180px] opacity-10"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-[180px] opacity-10"></div>

      {/* Top Border */}

      <div className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 relative z-10">

        <div className="grid lg:grid-cols-4 gap-12">

          {/* Brand Section */}

          <div className="lg:col-span-2">

            <h2 className="text-4xl font-black">

              <span className="text-slate-900 dark:text-white">
                FindIt
              </span>

              <span className="text-indigo-500">
                {" "}MANIT
              </span>

            </h2>

            <p className="text-slate-600 dark:text-slate-400 mt-5 max-w-lg leading-relaxed">

              FindIt MANIT is a campus-wide lost and found platform
              designed to help students quickly reconnect with
              their belongings through secure reporting,
              claim requests, and verified communication.

            </p>

            <div className="flex flex-wrap gap-3 mt-8">

              <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                Secure Authentication
              </span>

              <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                Claim System
              </span>

              <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                Built for MANIT
              </span>

            </div>

          </div>

          {/* Platform */}

          <div>

            <h3 className="text-lg font-bold mb-6">
              Platform
            </h3>

            <ul className="space-y-4 text-slate-600 dark:text-slate-400">

              <li>
                <a
                  href="#"
                  className="hover:text-indigo-600 dark:hover:text-white transition flex items-center gap-2"
                >
                  Home
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-indigo-600 dark:hover:text-white transition flex items-center gap-2"
                >
                  How It Works
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="hover:text-indigo-600 dark:hover:text-white transition flex items-center gap-2"
                >
                  About Platform
                  <ArrowUpRight size={14} />
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-slate-600 dark:text-slate-400">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-indigo-500"
                />

                <span>
                  support@finditmanit.in
                </span>

              </div>

              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-cyan-500"
                />

                <span>
                  MANIT, Bhopal
                </span>

              </div>

              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={18}
                  className="text-green-500"
                />

                <span>
                  Verified Campus Platform
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="border-t border-slate-200 dark:border-slate-800 mt-16 pt-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-slate-500 text-sm">

              © {new Date().getFullYear()} FindIt MANIT.
              All rights reserved.

            </p>

            <div className="flex gap-6 text-sm">

              <a
                href="#"
                className="text-slate-500 hover:text-indigo-600 dark:hover:text-white transition"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-slate-500 hover:text-indigo-600 dark:hover:text-white transition"
              >
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;