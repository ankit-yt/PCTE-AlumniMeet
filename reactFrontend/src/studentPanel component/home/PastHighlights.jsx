import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fetchTalksOnFrontend } from "../../api/meet.api";
import { FaPlay } from "react-icons/fa6";

function PastHighlights() {
  const [talks, setTalks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(-1);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchPastMeets = async () => {
      try {
        const data = await fetchTalksOnFrontend("randomPast");
        setTalks(data.data);
      } catch (err) {
        console.error("err in fetching random past meets : ", err.message);
      }
    };
    fetchPastMeets();
  }, []);

  return (
    <section className="w-full bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 overflow-hidden py-16 sm:py-24 px-6 sm:px-12 relative">
      
      <div className="absolute -top-40 -right-40 w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />

      
      <div className="text-center mb-12 sm:mb-16">
       <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Past{" "}
          <span className="md:bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-red-600 bg-clip-text text-transparent">
            Highlights
          </span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            A glimpse into the inspiring alumni sessions we've hosted before.
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
        {talks.map((h, i) => (
          <motion.div
            key={i}
            onClick={() => {
              if (index !== i) {
                setIsPlaying(true);
                setIndex(i);
                setTimeout(() => {
                  videoRef.current.play();
                }, 100);
              }
            }}
            className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            
            <img
              src={h.alumni[0].profilePic}
              alt={h.alumni[0].name}
              className="w-full h-48 sm:h-64 object-cover object-top"
            />

            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>

            
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
              <h3 className="text-base sm:text-lg font-bold">{h.topic}</h3>
              <p className="text-xs sm:text-sm">
                {h.alumni[0].name} — {h.alumni[0].currentCompany}
              </p>
            </div>

            
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
              <button
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-lg 
                  flex items-center justify-center shadow-xl border border-white/30
                  hover:scale-110 transition transform"
              >
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-red-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-red-600 to-blue-600 shadow-inner"></div>
                <FaPlay className="relative text-white text-sm sm:text-lg ml-1" />
              </button>
            </div>

            
            {index === i && isPlaying && (
              <video
                ref={videoRef}
                className="w-full h-full absolute bottom-0 left-0 object-cover"
                controls
                src={h.media.videoLink || ""}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default PastHighlights;
