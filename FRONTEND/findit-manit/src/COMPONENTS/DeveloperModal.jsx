import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import {X} from 'lucide-react';

function DeveloperModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex justify-center items-center px-4">

      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl">

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Heading */}

        <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">

          Meet The Developer

        </h2>

        {/* Card */}

        <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-xl">

          <img
            src="/developer8.jpeg"
            alt="Ayush Pal"
            className="w-full h-80 object-cover"
          />

          <div className="p-6">

            <h3 className="text-3xl font-bold text-white">

              Ayush Pal

            </h3>

            <p className="text-emerald-400 font-medium text-lg">

              Full Stack Developer

            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">

              <a
                href="https://www.linkedin.com/in/ayush-pal-637408382?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="
                  bg-blue-900/40
                  hover:bg-blue-800
                  rounded-xl
                  p-3
                  flex
                  flex-col
                  items-center
                  gap-2
                  transition
                "
              >
                <FaLinkedin size={22} />
                <span className="text-sm">
                  LinkedIn
                </span>
              </a>

              <a
                href="https://www.instagram.com/its_ayush8712?igsh=Z2NncmpiZjZzNjB0"
                target="_blank"
                rel="noreferrer"
                className="
                  bg-pink-900/40
                  hover:bg-pink-800
                  rounded-xl
                  p-3
                  flex
                  flex-col
                  items-center
                  gap-2
                  transition
                "
              >
                <FaInstagram size={22} />
                <span className="text-sm">
                  Instagram
                </span>
              </a>

              <a
                href="https://github.com/Ayush-code29"
                target="_blank"
                rel="noreferrer"
                className="
                  bg-green-900/40
                  hover:bg-green-800
                  rounded-xl
                  p-3
                  flex
                  flex-col
                  items-center
                  gap-2
                  transition
                "
              >
                <FaGithub size={22} />
                <span className="text-sm">
                  GitHub
                </span>
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DeveloperModal;