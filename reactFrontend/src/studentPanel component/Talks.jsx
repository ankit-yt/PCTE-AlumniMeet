import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { talkPagination } from "../api/meet.api";
import { FaVideoSlash } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { useInfiniteQuery,  } from "@tanstack/react-query";

function Talks() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(-1);
  const videoRef = useRef(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchTalks = async (page, limit) => {
  //     try {
  //       const data = await talkPagination(page, limit);
  //       console.log(data.data);
  //       if (data.data.status === "success") {
  //         setTalks((prev) => [...prev, ...data.data.talks]);
  //         if (!data.data.hasMore) {
  //           setIsMore(false);
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   fetchTalks(page, 3);
  // }, [page]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["talks"],
      queryFn: ({ pageParam = 1 }) => talkPagination(pageParam, 3),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.hasMore ? allPages.length + 1 : undefined;
      },
      staleTime: 1000 * 60 * 5,
    });

  const talksArray = data?.pages.flatMap((p) => p.data.talks) || [];

  return (
    <section className="relative w-full py-12 bg-gray-50 overflow-hidden">
{/* 
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl"></div> */}

      <div className="absolute w-72 h-72 z-1  bg-red-500/30 rounded-full blur-3xl bottom-30 right-10"></div>
      <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full blur-3xl top-30 left-10"></div>
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900">
            Alumni <span className="text-red-600">Talks</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Watch inspiring sessions from alumni across industries. Learn from
            their journeys, mistakes, and successes.
          </p>
        </div>

        {/* Talks Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {talksArray.map((talk, i) => (
            <div
              key={talk._id}
              className="bg-white z-10 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition"
            >
              <div className="relative w-full h-56">
                <img
                  className="w-full h-full object-cover"
                  src={talk.media.images[0].image}
                  alt={talk.title}
                />
                {index === i && isPlaying && (
                  <>
                    {talk.media.videoLink ? (
                      <video
                        ref={videoRef}
                        controls
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={talk.media.videoLink}
                      ></video>
                    ) : (
                      <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center bg-gradient-to-r from-red-100 to-blue-100 text-gray-700 rounded-lg shadow-inner">
                        <FaVideoSlash className="text-4xl text-red-500 mb-2" />
                        <span className="text-sm font-medium">
                          No Video Available
                        </span>
                      </div>
                    )}
                  </>
                )}
                {index != i && (
                  <button
                    onClick={() => {
                      if (index != i) {
                        setIsPlaying(true);
                        setIndex(i);
                        setTimeout(() => {
                          videoRef.current.play();
                        }, 100);
                      }
                    }}
                    className="absolute  inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                  >
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition">
                      <FaPlay className="text-red-600 ml-1" />
                    </div>
                  </button>
                )}
              </div>

              {/* Content */}
              <div
                onClick={() => navigate("/talkInsight", { state: { talk } })}
                className="p-6 z-20  space-y-3"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {talk.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {talk.description}
                </p>

                {/* Alumni Info */}
                <div className="flex items-center justify-between mt-4 ">
                  <div className="flex gap-4">
                    <img
                      src={talk.alumni[0].profilePic}
                      alt={talk.alumni[0].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {talk.alumni[0].name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {talk.alumni[0].currentCompany}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                    <span>
                      📅{" "}
                      {new Date(talk.time).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
          <div className="text-center mt-16">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading..."
                : hasNextPage
                ? "Load More"
                : "No More Talks"}
            </button>
          </div>
        
      </div>
    </section>
  );
}

export default Talks;
