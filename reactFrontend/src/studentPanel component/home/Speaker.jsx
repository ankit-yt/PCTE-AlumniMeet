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
    <section className="relative w-full overflow-hidden py-16 sm:py-20 px-6 sm:px-10 bg-gradient-to-r from-white via-gray-50 to-white">
       <div className="absolute -top-40 -right-40 w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />
     <div className="absolute -bottom-40 -left-20 w-[28rem] h-[28rem] bg-pink-200/30 rounded-full blur-2xl" />
      {/* Section Header */}
      <div className="text-center relative z-10 mb-12">
        <h2 className="text-3xl sm:text-5xl relative lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Meet Our{" "}
          <span className="md:bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-red-600 bg-clip-text text-transparent">
            Star Speakers
          </span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">
          Leaders, innovators, and changemakers who inspire our community.
        </p>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto relative z-10">
        {alumnis.map((sp, i) => (
<motion.div
  key={i}
  whileHover={{ scale: 1.05, y: -6 }}
  transition={{ type: "spring", stiffness: 220, damping: 15 }}
  className="relative flex flex-col mt-10 items-center text-center cursor-pointer"
>
  {/* Speaker Image with Glow */}
  <div className="relative group ">
    <div className="absolute inset-0 animate-spin [animation-duration:10s] rounded-full bg-gradient-to-tr 
                    from-red-700 to-purple-700 
                    opacity-60 blur-lg group-hover:opacity-80  transition duration-500" />
    
    <div className="w-36 h-36 sm:w-46 sm:h-46 rounded-full border-red-600 border-3  overflow-hidden 
                    border border-gray-200 shadow-md relative z-10 bg-white">
      <img
        src={sp.profilePic}
        alt={sp.name}
        className="w-full h-full object-cover object-center"
      />

      {/* Overlay (shows on hover) */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center 
                      opacity-0 group-hover:opacity-100 transition duration-500 text-white">
        <h3 className="text-sm sm:text-base font-semibold">{sp.name}</h3>
        <p className="text-xs sm:text-sm text-gray-200 mt-1">{sp.currentRole}</p>
        <p className="text-[11px] sm:text-xs text-red-400 font-medium uppercase mt-1">
          {sp.currentCompany}
        </p>
      </div>
    </div>
  </div>
</motion.div>
        ))}
      </div>
    </section>
  );
}

export default Speaker;
