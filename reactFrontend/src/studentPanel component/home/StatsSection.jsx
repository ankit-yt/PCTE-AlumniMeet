import { motion } from "framer-motion";

function StatsSection() {
  const stats = [
    { number: "5000+", label: "Students Connected" },
    { number: "200+", label: "Alumni Talks" },
    { number: "100+", label: "Companies Represented" },
    { number: "200+", label: "FeedBacks" },
  ];

  return (
    <section className="relative w-full py-28 bg-gradient-to-r from-white via-gray-50 to-white overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-red-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-blue-800/30 rounded-full blur-3xl" />
      <img
        className="w-full  h-full object-cover absolute -bottom-10 opacity-95"
        src="src/assets/02b1ef2a-96e2-4c8e-ae5c-978fc18a88e3.png"
        alt=""
      />
      <img
        className="w-full  h-full object-cover absolute bottom-10 opacity-10 left-5"
        src="src/assets/02b1ef2a-96e2-4c8e-ae5c-978fc18a88e3.png"
        alt=""
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-red-600 via-blue-600 to-red-600 text-transparent bg-clip-text drop-shadow-lg">
              Alumni Impact
            </span>
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            A community growing stronger every day 🚀
          </p>
        </div>

        <div className="absolute left-1/2 h-60 rounded-full opacity-60  w-1 bg-gradient-to-b from-red-500 via-blue-500 to-red-500 "></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative bg-white/60 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/40 flex flex-col items-center"
            >
              <h3 className="text-6xl font-extrabold bg-gradient-to-r from-red-600 to-blue-600 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(255,0,0,0.6)]">
                {stat.number}
              </h3>
              <p className="mt-4 text-gray-800 text-nowrap font-semibold text-lg">
                {stat.label}
              </p>

              <div className="absolute -bottom-2 w-2/3 h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-sm"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
