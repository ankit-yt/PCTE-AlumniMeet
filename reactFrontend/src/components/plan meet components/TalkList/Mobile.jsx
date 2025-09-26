import React from "react";

function Mobile({props}) {
    const {
    list,
    setSelectedMeetArray,
    setClickedItem,
    clickedItem,
    isAction,
    setIsAction,
    setters,
    setIsAdding,
    setIsRightPanelOpen,
    setSearch,
    isAdding,
    search,
    setShowDeleteConfirm,
    setDeletingMeetId,
    setStep,
    Step,  
    actionIndex,
    setActionIndex
    } = props
  return list
    .filter((query) => {
      if (search.trim().length === 0) return true;
      const lowerSearch = search.toLowerCase();
      return (
        query.name.toLowerCase().includes(lowerSearch) ||
        query.batch.toLowerCase().includes(lowerSearch) ||
        query.organizedBy.toLowerCase().includes(lowerSearch) ||
        query.location.toLowerCase().includes(lowerSearch)
      );
    })
    .map((item, index) => (
      <div
        onClick={() => {
          setters.setMeetId(item._id);
          setSelectedMeetArray(item);
          setIsRightPanelOpen(true);
          setActionIndex(-1);
          setIsAction(false);
        }}
        key={index}
        className={`bg-white/95 ${
          index === actionIndex ? "z-60" : "z-0"
        } backdrop-blur-md rounded-xl shadow-md border border-red-100 p-4 flex items-center gap-4 relative hover:shadow-lg transition-all duration-200`}
      >
        <img
          src={item.alumni[0]?.profilePic}
          alt="Organizer"
          className="w-14 h-14 rounded-full border border-red-200 object-cover"
        />

        {/* Meet Info */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
            📌 {item.title}
          </h3>

          {/* Date & Location Row */}
          <p className="text-xs text-gray-500 flex items-center gap-2">
            🗓{" "}
            {new Date(item.time).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            <span className="text-gray-400">•</span>
            📍 {item.location}
          </p>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActionIndex(index);
              if (clickedItem === index && isAction) {
                setActionIndex(-1);
                setIsAction(false);
                setClickedItem(-1);
              } else {
                setIsAction(true);
                setClickedItem(index);
              }
            }}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            ⋮
          </button>

          {isAction && clickedItem === index && (
            <div className="absolute  right-0 top-8 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
              <button
                onClick={(e) => {
                              e.stopPropagation();
                              
                                setStep(1);
                              setters.setTitle(item.title);
                              setters.setAlumniName(item.alumni[0].name);
                              setters.setDate(
                                new Date(item.time).toISOString().slice(0, 16)
                              );
                              setters.setLocation(item.location);
                              setters.setMeetId(item._id);
                              setters.setClassJoined(item.classJoined);
                              setters.setOrganizedBy(item.organizedBy);
                              setters.setDescription(item.description);
                              setters.setAlumni(item.alumni[0]._id);
                              setters.setPreviewURL(item.alumni[0].profilePic);
                              setters.setUpdatingMeetId(item._id);
                              setters.setIsEditing(true);
                              setClickedItem(-1);
                              setIsAction(false);
                              if (item.media.images.length != 0) {
                                setters.setIsImagesUploaded(true);
                              } else {
                                setters.setIsImagesUploaded(false);
                              }
                              if (item.media.videoLink) {
                                setters.setIsVideoUploaded(true);
                              } else {
                                setters.setIsVideoUploaded(false);
                              }

                              setIsAdding(!isAdding);
                              setSearch("");
                            }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-gray-700"
              >
                ✏ Edit
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setDeletingMeetId(item._id);
                  setClickedItem(-1);
                  setIsAction(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>
    ));
}

export default Mobile;
