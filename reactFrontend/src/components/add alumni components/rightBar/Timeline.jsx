import React, { useRef, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";


function Timeline({ careerTimeline }) {
  const containerRef = useRef(null);
  const lastItemRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current && lastItemRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const lastItemTop = lastItemRef.current.getBoundingClientRect().top;

      // Calculate line height from top of container to bottom of last card
      setLineHeight(lastItemTop - containerTop);
    }
  }, [careerTimeline]);

  return (
    <div className="mt-6 h-full w-full">
      <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.2em] mb-6">
        Career Timeline
      </h2>

      <div
        ref={containerRef}
        className="relative h-full no-scrollbar py-3 overflow-auto pl-8 space-y-10"
      >
        {/* Red Glowing Timeline Line */}
        <div
          className="absolute left-[15px] w-[2px] bg-gradient-to-b from-red-500 via-red-400 to-red-600 animate-pulse shadow-[0_0_8px_#ef4444]"
          style={{ height: `${lineHeight}px` }}
        ></div>

        {careerTimeline.map((timeline, idx) => (
          <div
            key={idx}
            ref={idx === careerTimeline.length - 1 ? lastItemRef : null}
            className="relative group"
          >
            {/* Glowing Red Dot */}
            <span className="absolute -left-[27px] top-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 border-4 border-white rounded-full shadow-lg animate-ping opacity-75"></span>
            <span className="absolute -left-[27px] top-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 border-4 border-white rounded-full shadow-lg"></span>

            {/* White Card with Subtle Red Gradient Overlay */}
            <div className="relative bg-white overflow-hidden backdrop-blur-xl border border-red-500/40 rounded-xl p-5 shadow-lg  transition-all transform hover:-translate-y-1  duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-red-100 opacity-70 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900">{timeline.year}</h3>
                <p className="text-sm font-medium text-red-500">{timeline.role}</p>
                <p className="text-xs text-gray-700">{timeline.company}</p>
                <p className="text-xs text-gray-500 italic">{timeline.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
