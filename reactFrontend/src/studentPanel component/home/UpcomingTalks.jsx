import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchTalksOnFrontend, } from "../../api/meet.api";

function UpcomingTalks() {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    const fetchMeet = async () => {
      try {
        const data = await fetchTalksOnFrontend("allUpcomings");
        setTalks(data.data || []);
      } catch (err) {
        console.error("Failed to fetch talks:", err.message);
      }
    };

    fetchMeet();
  }, []);

  const AlumniAvatar = ({ alumni }) => {
    if (!alumni) return null;
    return (
      <div className="relative w-42 h-42 rounded-full">
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-red-500 to-blue-500 blur-2xl opacity-70"></div>
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img
            src={alumni.profilePic}
            alt={alumni.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 overflow-hidden py-24 px-12 relative">
              {/* <div className="absolute w-full bg-gray-400 blur-2xl h-5 bottom-0"></div> */}
          <div className="absolute w-full bg-gray-400 blur-2xl h-5 top-0"></div>

      <div className="absolute -top-40 -left-20 w-[28rem] h-[28rem] bg-pink-200/30 rounded-full blur-2xl" />
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-red-300/30 rounded-full blur-3xl" />

      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold">
          Upcoming <span className="text-red-600">Talks</span>
        </h2>
        <p className="text-gray-600 mt-4">
          Discover the next inspiring alumni sessions.
        </p>
      </div>
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-blue-500"></div>

        <div className="space-y-16">
          {talks.map((talk, i) => {
            const alumni = talk.alumni?.[0]; 

            return (
              <motion.div
                key={talk._id || i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  i % 2 === 0 ? "pr-5" : "pl-5"
                }`}
              >
                <div className="w-6 h-6 bg-blue-900 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 shadow-lg"></div>

                {i % 2 !== 0 && (
                  <div className="ml-auto">
                    <AlumniAvatar alumni={alumni} />
                  </div>
                )}

                <div
                  className={`w-1/2 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white via-red-50 to-blue-50 border border-red-100 ${
                    i % 2 === 0 ? "mr-6" : "ml-6"
                  }`}
                >
                  <p className="text-sm font-semibold text-blue-600">
                    {new Date(talk.time).toLocaleDateString("en-US", {
                      month: "short", 
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    ·{" "}
                    {new Date(talk.time).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <h3 className="text-xl font-bold mt-2 text-red-600">
                    {talk.description || talk.title}
                  </h3>
                  {alumni && (
                    <p className="text-gray-700 mt-1">
                      {alumni.name} — {alumni.currentCompany || "Independent"}
                    </p>
                  )}
                </div>

                {i % 2 === 0 && (
                  <div className="mr-auto">
                    <AlumniAvatar alumni={alumni} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default UpcomingTalks;
