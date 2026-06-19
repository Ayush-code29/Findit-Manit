import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { SignUpButton } from "@clerk/clerk-react";

function LandingPage() {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">

      <Navbar />

      <Hero />

      <HowItWorks />

      {/* CTA Section */}

      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-24 text-center">

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready To Find What You've Lost?
        </h2>

        <p className="text-lg text-indigo-100 mb-8">
          Join the MANIT Lost & Found Community.
        </p>

        <SignUpButton mode="modal">

          <button
            className="
              bg-white
              dark:bg-slate-800
              text-indigo-600
              dark:text-white
              px-8
              py-4
              rounded-2xl
              font-semibold
              shadow-lg
              hover:scale-105
              hover:shadow-2xl
              transition-all
              duration-300
            "
          >
            Get Started
          </button>

        </SignUpButton>

      </section>

      <Footer />

    </div>
  );
}

export default LandingPage;