import React from 'react'
import { IoMdArrowRoundBack, IoMdTime } from 'react-icons/io'
import { IoClose, IoPerson } from 'react-icons/io5'
import InfoItem from './InfoItem'
import { FaLocationDot } from 'react-icons/fa6'
import { MdDateRange } from "react-icons/md";
import { IoIosTime } from "react-icons/io";

function Meet({values, setters}) {
    const {isTimelineOpen , selectedMeetArray , } = values
    const {setIsGalleryOpen , setIsRightPanelOpen , setIsTimelineOpen} = setters
  return (
    <>
          {/* Header */}
          <div className="flex items-center mb-4">
            {isTimelineOpen && (
              <IoMdArrowRoundBack
                className="text-red-500 text-xl cursor-pointer hover:scale-110 transition"
                onClick={() => setIsTimelineOpen(false)}
              />
            )}
            <IoClose
              onClick={() => setIsRightPanelOpen(false)}
              className="ml-auto text-red-500 text-xl cursor-pointer hover:rotate-90 transition"
            />
          </div>

          {/* Meet Info */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={
                  selectedMeetArray._id
                    ? selectedMeetArray?.alumni[0].profilePic
                    : null
                }
                alt={selectedMeetArray.title}
                className="w-28 h-28 object-cover rounded-full border-4 border-red-500 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-red-500/20 to-transparent"></div>
            </div>

            {/* Meet Title */}
            <h1 className="mt-4 text-xl font-bold text-red-600">
              {selectedMeetArray.title}
            </h1>

            {/* Status Badge */}
            <span
              className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full 
        ${
          selectedMeetArray.status === "Upcoming" &&
          "bg-yellow-100 text-yellow-700 border border-yellow-300"
        } 
        ${
          selectedMeetArray.status === "Ongoing" &&
          "bg-blue-100 text-blue-700 border border-blue-300"
        } 
        ${
          selectedMeetArray.status === "Completed" &&
          "bg-green-100 text-green-700 border border-green-300"
        } 
        ${
          selectedMeetArray.status === "Cancelled" &&
          "bg-red-100 text-red-700 border border-red-300"
        } 
      `}
            >
              {selectedMeetArray.status}
            </span>
          </div>

          <div className="mt-6 flex no-scrollbar flex-col gap-6 flex-1 overflow-y-auto pr-1 ">
            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-4">
              <InfoItem
                icon={<FaLocationDot />}
                label="Location"
                value={selectedMeetArray.location}
              />
              <InfoItem
                icon={<MdDateRange />}
                label="Date"
                value={new Date(selectedMeetArray.time).toLocaleDateString()}
              />
              <InfoItem icon={<IoMdTime />} label="Time" value={new Date(selectedMeetArray.time).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})} />
              <InfoItem
                icon={<IoPerson />}
                label="Organized By"
                value={selectedMeetArray.organizedBy}
              />
              <InfoItem
                icon={<IoPerson />}
                label="Classes Joined"
                value={selectedMeetArray.classJoined?.map((item) => item)}
              />

                
              {/* Media Preview */}
              {(selectedMeetArray.media?.videoLink || selectedMeetArray.media?.images?.length > 0) && (
                <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="flex items-center gap-4 px-6 py-3 rounded-xl 
               bg-gradient-to-r from-red-50 to-white 
               border group border-red-100 backdrop-blur-md 
               w-full
               transition-all duration-300"
                >

                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      Media Collection
                    </span>
                    <div className="flex items-center mt-3 gap-3">
                      {/* Images */}
                      {selectedMeetArray.media?.images?.length > 0 && (
                        <span className="flex items-center gap-1 text-red-600 font-medium text-sm">
                          📸 {selectedMeetArray.media.images.length} Images
                        </span>
                      )}

                      {/* Divider */}
                      {selectedMeetArray.media?.images?.length > 0 &&
                        selectedMeetArray.media?.videoLink && (
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        )}
                        
                      {/* Video */}
                      {selectedMeetArray.media?.videoLink && (
                        <span className="flex items-center gap-1 text-red-600 font-medium text-sm">
                          🎥 1 Video
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Decorative Icon Bubble */}
                  <div className="w-10 h-10 rounded-full ml-auto group-hover:bg-red-500 transtion-all duration-300 text-white flex items-center justify-center shadow-md">
                    📂
                  </div>
                </button>
              </div>
              )} 

              
            </div>

            {/* Description */}
            {selectedMeetArray.description && (
              <div className=" bg-gradient-to-r from-red-50 to-white border group border-red-100 backdrop-blur-md  p-4 rounded-lg shadow-md ">
                <h2 className="text-sm  font-semibold text-red-600 uppercase tracking-wide">
                  About This Meet
                </h2>
                <p className="mt-2 italic text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedMeetArray.description}
                </p>
              </div>
            )}
          </div>
        </>
  )
}

export default Meet
