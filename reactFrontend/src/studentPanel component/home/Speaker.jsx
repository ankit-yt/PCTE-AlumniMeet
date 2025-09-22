import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSomeRandomAlumni } from "../../api/alumni.api";

function Speaker() {
  const [alumnis, setAlumnis] = useState([]);

  useEffect(() => {
    const fetchAlumnis = async () => {
      try {
        const data = await getSomeRandomAlumni();
        setAlumnis(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlumnis();
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-r from-white via-gray-50 to-white overflow-hidden py-20 px-6 h-screen flex flex-col justify-center   sm:px-12">
      {/* <div className="absolute w-full bg-gray-400 blur-2xl h-5 top-0"></div> */}
      <div className="absolute w-full bg-gray-400 blur-2xl h-5 bottom-0"></div>
      <div className="absolute -top-40 -right-40 w-[32rem] h-[32rem] bg-red-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-20 w-[28rem] h-[28rem] bg-pink-200/30 rounded-full blur-2xl" />
      <img loading="lazy" className="absolute top-0 grayscale-10 opacity-80 left-0 " src="src/assets/135857392_10309229.png" alt="" />
      <img loading="lazy" className="absolute top-5 grayscale-10 opacity-10 left-10 " src="src/assets/135857392_10309229.png" alt="" />
     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Meet Our{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            Speakers
          </span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
          Inspiring talks by alumni shaping industries worldwide.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-7xl  mx-auto px-6 ">
        {alumnis.map((sp, i) => (
          <div
            key={i}
            loading="lazy"
            className="group relative bg-white/70 border border-red-100 backdrop-blur-sm rounded-3xl shadow-[0_10px_40px_rgba(255,0,0,0.1)] overflow-hidden transition-all hover:scale-102 duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

            <div className="flex flex-col items-center text-center px-8 pt-10 pb-2 relative z-10">
              <div className="w-38 h-38 rounded-full overflow-hidden border-4 border-red-500 shadow-lg">
                <img
                  src={sp.profilePic}
                  alt={sp.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <h3 className="mt-6 text-[1.35rem] font-extrabold text-red-700 tracking-tight leading-snug">
                {sp.name}
              </h3>
              <p className="text-[1rem] font-medium text-gray-700 mt-1">
                {sp.currentRole}
              </p>
              <p className="text-[0.95rem] text-red-500 font-semibold mt-1 uppercase tracking-wide">
                {sp.currentCompany}
              </p>
            </div>

            <div className="px-8 pb-6 flex justify-center">
              <div className="w-30 h-[3px] bg-gradient-to-r from-red-600 to-red-400 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Speaker;
