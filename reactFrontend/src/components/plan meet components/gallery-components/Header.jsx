import React from "react";
import { IoClose } from "react-icons/io5";
function Header({ values, setters }) {
  const { toggle } = values;
  const { setToggle, setIsGalleryOpen } = setters;
  return (
    <div className=" mr-auto flex justify-between px-5 w-full ">
      <div>
        <h1 className="font-bold text-2xl text-red-700">Meet's Memories</h1>
        <div>
          <p className="text-gray-500 mt-1 text-xs">
            {toggle
              ? "Experience the event through our captured videos and highlights."
              : "A collection of moments that connect hearts, friendships, and stories."}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div
          onClick={() => setToggle(!toggle)}
          className="relative flex items-center w-29 h-12 bg-white border-2 border-red-500 rounded-full cursor-pointer transition-colors duration-300 shadow-md"
        >
          {/* Sliding Ball */}
          <div
            className={`absolute  left-1 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-lg shadow-lg transform transition-all duration-300 ${
              toggle ? "translate-x-[4.05rem] bg-red-600" : "translate-x-0"
            }`}
          >
            {toggle ? "📸" : "🎥"}
          </div>

          {/* Labels */}
          <div className="flex justify-between w-full px-4 text-red-600 font-semibold text-sm select-none">
            <span
              className={`${
                !toggle ? "opacity-100" : "opacity-40"
              } transition-opacity duration-300`}
            >
              🎥
            </span>
            <span
              className={`${
                toggle ? "opacity-100" : "opacity-40"
              } transition-opacity duration-300`}
            >
              📸
            </span>
          </div>
        </div>
        <div onClick={()=>setIsGalleryOpen(false)} className="text-red-500 w-10 h-fit flex justify-center items-center hover:text-red-700 hover:rotate-90 transition-all duration-300">
          <IoClose size={20} className="" />
        </div>
      </div>
    </div>
  );
}

export default Header;
