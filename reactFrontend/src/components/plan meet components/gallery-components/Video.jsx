import React, { useState } from "react";

function Video({ values }) {
  const { bgcolor, videoLink, videoRef } = values;
  const [hover, setHover] = useState(true);
  const [isPaused, setIsPaused] = useState(true);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => {
    if (!isPaused) setHover(false);
  };

  return (
    <div className="w-full max-w-6xl mt-20 px-4">
      <div
        className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-red-100 transition-shadow duration-500"
        style={{ boxShadow: `0 0 50px -10px ${bgcolor}` }}
      >
        {videoLink ? (
          <video
            ref={videoRef}
            crossOrigin="anonymous"
            className="w-full h-full object-cover rounded-2xl"
            controls
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPause={() => {
              setIsPaused(true);
              setHover(true);
            }}
            onPlay={() => setIsPaused(false)}
          >
            <source src={videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="flex items-center justify-center h-full text-gray-600">
            No video available
          </p>
        )}

        {/* 🔴 Floating Label */}
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md tracking-wider uppercase">
          Live Highlight
        </div>

        {/* 🎬 Caption Overlay */}
        <div
          className={`absolute pointer-events-none w-full left-0 px-6 py-4 flex justify-between items-end transition-all duration-500 ${
            hover
              ? "bottom-16 opacity-100"
              : "bottom-0 opacity-90 bg-gradient-to-t from-black/70 to-transparent"
          }`}
        >
          <div>
            <p className="text-white font-semibold text-lg tracking-wide">
              Alumni Meet 2025
            </p>
            <p className="text-gray-200 text-sm italic">
              Captured moments that matter
            </p>
          </div>
          <div className="text-red-500 bg-white rounded-full px-3 py-1 text-xs font-semibold shadow">
            🎥 Video
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
