import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FastAverageColor } from "fast-average-color";
import Header from "./gallery-components/Header";
import Video from "./gallery-components/Video";
import Images from "./gallery-components/Images";

function GalleryModel({ values, setters }) {
  const { selectedMeetArray } = values;
  const { setIsGalleryOpen } = setters;

  const [bgcolor, setBgcolor] = useState("#ffffff");
  const [toggle, setToggle] = useState(false);
  const [isVideo, setIsVideo] = useState(true)

  const fac = new FastAverageColor();
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;
    let interval;

    const updateColor = () => {
      if (video.paused || video.ended) return;
      const color = fac.getColor(video);
      setBgcolor(color.hex);
    };

    video.addEventListener("play", () => {
      interval = setInterval(updateColor, 1000);
    });

    video.addEventListener("pause", () => {
      clearInterval(interval);
      setBgcolor("#ffffff");
    });
    video.addEventListener("ended", () => clearInterval(interval));

    return () => clearInterval(interval);
  }, [selectedMeetArray, fac]);
  const videoLink = selectedMeetArray?._id
    ? selectedMeetArray.media.videoLink
    : null;
  const images = selectedMeetArray?._id ? selectedMeetArray.media.images : [];
  return (
    <div
      className={`w- relative h-screen no-scrollbar overflow-auto px-20   bg-[#f5f6fa]
 flex flex-col items-center py-10 `}
    >
      {/* <div className="absolute top-10 text-2xl text-red-500 hover:text-red-700 hover:rotate-90 transform-all duration-200 right-10">
            <IoClose/>
        </div>
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-extrabold text-red-600 mb-6 text-center">
          🎥 Video Highlight
        </h2>

        <div
          className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-red-100"
          style={{
            boxShadow: `0 0 40px 10px ${bgcolor}`,
          }}
        >
          {videoLink ? (
            <video
              ref={videoRef}
              crossOrigin="anonymous"
              className="w-full h-full object-cover rounded-2xl"
              controls
            >
              <source src={videoLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="flex items-center justify-center h-full text-gray-600">
              No video available
            </p>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
        </div>
      </div>

      <div className="w-40 h-1 bg-red-600 rounded-full my-12"></div>

      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-extrabold text-red-600 mb-10 text-center">
          📸 Memories Captured
        </h2>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
            >
              <img
                src={image.image}
                alt={`Alumni Memory ${index + 1}`}
                className="w-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition-opacity duration-300">
                Alumni Meet {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <Header values={{ toggle  }} setters={{ setToggle , setIsGalleryOpen }} />
      <hr className="w-full border-red-700 mt-5" />
      {!toggle? <Video values={{ videoLink, bgcolor, toggle , videoRef }}/> : <Images values={{images}}/>}
    </div>
  );
}

export default GalleryModel;
