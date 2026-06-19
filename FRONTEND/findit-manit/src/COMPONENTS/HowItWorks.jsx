import {
  FileText,
  Search,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section Header */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium text-sm mb-4">
            Simple Process
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">

            How FindIt MANIT

            <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Helps You Recover Items
            </span>

          </h2>

          <p className="text-slate-600 dark:text-slate-300 mt-6 text-lg">
            Report, search, and reconnect with your belongings
            through a secure and student-friendly platform.
          </p>

        </div>

        {/* Steps */}

        <div className="relative mt-20">

          {/* Desktop Connecting Line */}

          <div className="hidden lg:block absolute top-20 left-1/2 -translate-x-1/2 w-[70%] h-1 bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200 dark:from-indigo-800 dark:via-violet-800 dark:to-cyan-800"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">

            {/* Step 1 */}

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center border border-transparent dark:border-slate-700">

              <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-6">

                <FileText
                  size={34}
                  className="text-indigo-600 dark:text-indigo-400"
                />

              </div>

              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold mb-4">
                1
              </div>

              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                Report Item
              </h3>

              <p className="text-slate-500 dark:text-slate-300 leading-relaxed">
                Submit details about a lost or found item,
                including images, location, and contact
                information.
              </p>

            </div>

            {/* Step 2 */}

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center border border-transparent dark:border-slate-700">

              <div className="w-20 h-20 mx-auto rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center mb-6">

                <Search
                  size={34}
                  className="text-cyan-600 dark:text-cyan-400"
                />

              </div>

              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white text-sm font-bold mb-4">
                2
              </div>

              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                Search & Match
              </h3>

              <p className="text-slate-500 dark:text-slate-300 leading-relaxed">
                Browse lost and found listings across campus
                and discover potential matches instantly.
              </p>

            </div>

            {/* Step 3 */}

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center border border-transparent dark:border-slate-700">

              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-6">

                <ShieldCheck
                  size={34}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold mb-4">
                3
              </div>

              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                Claim & Recover
              </h3>

              <p className="text-slate-500 dark:text-slate-300 leading-relaxed">
                Submit a claim request, verify ownership,
                and safely reconnect with your belongings.
              </p>

            </div>

          </div>

        </div>

        {/* Bottom CTA */}

        <div className="mt-20 text-center">

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700">

            <span className="font-medium text-slate-700 dark:text-slate-200">
              Secure • Fast • Built for MANIT Students
            </span>

            <ArrowRight
              size={18}
              className="text-indigo-600"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;