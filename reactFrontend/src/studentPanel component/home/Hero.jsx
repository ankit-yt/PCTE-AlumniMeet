import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa6";

function Hero({ values }) {
  const { meet, timeLeft } = values;

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 flex items-center px-16 overflow-hidden">
      <div className="absolute w-full bg-gray-400 blur-2xl h-5 bottom-0"></div>
      <FaGraduationCap
        size={200}
        className="z-20 absolute top-25 left-10 -rotate-12"
      />
      <img
        className=" absolute -bottom-30 w-full opacity-70  left-10"
        src="src/assets/28468.png"
        alt=""
      />

      <div className="absolute w-[600px] h-[600px] bg-pink-200 rounded-full blur-3xl opacity-40 -top-40 -left-40 animate-pulse"></div>

      <div className="w-1/2 flex flex-col pl-20 pt-30 z-10 space-y-8">
        <h1 className="text-6xl font-extrabold leading-tight">
          Connect. <span className="text-red-600">Inspire.</span> <br />
          <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Grow Together 🚀
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-md leading-relaxed">
          A next-generation alumni meet platform where connections turn into
          opportunities. Learn from mentors, explore global networks, and be
          part of something bigger.
        </p>

        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold text-white shadow-lg">
            Join the Meet
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 hover:shadow-md transition rounded-lg font-semibold text-gray-700">
            Explore Alumni
          </button>
        </div>
      </div>

      <div className="w-1/2 relative flex justify-center items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 blur-2xl opacity-50 animate-pulse"></div>
          <div className="w-80 h-80 rounded-full overflow-hidden relative shadow-2xl border-[6px] border-white">
            <img
              src={meet?.alumni[0]?.profilePic }
              alt={meet?.alumni?.name || "Alumni"}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-12 -left-14 bg-white/30 backdrop-blur-xl px-6 py-3 rounded-xl shadow-xl border border-white/40"
          >
            <p className="font-bold text-gray-900 text-lg drop-shadow">
              {meet?.alumni[0]?.name || "Alumni Name"}
            </p>
          </motion.div>

          <motion.div className="absolute top-16 -right-10 bg-white/30 backdrop-blur-xl px-6 py-2 rounded-xl shadow-xl border border-white/40">
            <p className="text-sm text-gray-800 font-medium">
              {meet?.alumni[0]?.currentCompany || "Company"}
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10  -rotate-10 bg-white px-5 py-3 
             rounded-2xl shadow-2xl border-2 border-red-500 font-semibold 
             text-red-600 text-sm"
          >
            🌟 Upcoming Meet
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -bottom-33  px-10 py-6 
             rounded-2xl "
        >
          <p className="text-5xl font-mono text-black tracking-widest">
            {timeLeft || "--:--:--"}
          </p>

          <hr />
          <p className="text-xs text-gray-400 text-center mt-2 uppercase tracking-widest">
            Until Event Starts
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
