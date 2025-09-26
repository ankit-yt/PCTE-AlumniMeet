import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchTalksOnFrontend, } from "../../api/meet.api";
import { IoPinSharp } from "react-icons/io5";


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
      <div className="relative md:w-42 md:h-42 w-24 h-24 rounded-full">
        
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
    <section className="w-full z-10 bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 overflow-hidden py-24 px-12 relative">
              {/* <div className="absolute w-full bg-gray-400 blur-2xl h-5 bottom-0"></div> */}
          {/* <div className="absolute w-full bg-gray-400 blur-2xl h-5 top-0"></div> */}

      <div className="absolute -top-40 -left-20 w-[28rem] h-[28rem] bg-pink-200/30 z-[-1] rounded-full blur-2xl" />
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-red-300/30 z-[-1] rounded-full blur-3xl" />

      <div className="text-center z-10  mb-16">
       <h2 className="text-3xl sm:text-5xl relative lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Upcoming{" "}
          <span className="md:bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-red-600 bg-clip-text text-transparent">
            Talks
          </span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Thought leaders, innovators, and trailblazers sharing their journeys.
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
                  i % 2 === 0 ? "md:pr-5" : "md:pl-5"
                }`}
              >
                <div className="md:block hidden w-6 h-6 bg-blue-900 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 shadow-lg"></div>

                {i % 2 !== 0 && (
                  <div className="md:block hidden ml-auto">
                    <AlumniAvatar alumni={alumni} />
                  </div>
                )}

                <div
                  className={`md:w-1/2 w-full p-6 justify-between flex rounded-2xl shadow-xl bg-gradient-to-br from-white via-red-50 to-blue-50 border border-red-100 ${
                    i % 2 === 0 ? "md:mr-6" : "md:ml-6"
                  }`}
                >
                  <div className="">
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
                     {" "}<IoPinSharp  className="text-red-500 inline " size={20}/>{" "}<span className="text-green-500 font-bold italic underline">{talk.location} </span>
                  </p>
                  <h3 className="text-xl font-bold mt-2 text-red-600">
                    {talk.title || talk.description }
                  </h3>
                  {alumni && (
                    <p className="text-gray-700 mt-1">
                      {alumni.name} — {alumni.currentCompany || "Independent"}
                    </p>
                  )}
                  </div>
                   <div className=" md:hidden">
                    <AlumniAvatar alumni={alumni} />
                  </div>
                </div>

                {i % 2 === 0 && (
                  <div className="md:block hidden mr-auto">
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
