import React, { useState } from "react";

function AlumniListMobile({ props }) {
  const {
    section="meet",
     list,
            setClickedItem,
            clickedItem,
            isAction,
            setIsAction,
            setters,
            setRpProfile,
            setRpAchievement,
            setRpBatch,
            setRpCareerTimeline,
            setRpCurrentCompany,
            setRpCurrentRole,
            setRpEmail,
            setIsAdding,
            setIsRightPanelOpen,
            setRpLinkedIn,
            setRpName,
            setRpQuote,
            setSearch,
            isAdding,
            search,
            setShowDeleteConfirm,
            setDeletingAlumniId,
  } = props;

  const [actionIndex, setActionIndex] = useState(-1);

  return (
    <div className="w-full flex-1 overflow-auto px-4 pb-6 space-y-4">
      {list
        .filter((query) => {
          if (search.trim().length === 0) return true;
          const lowerSearch = search.toLowerCase();
          return (
            query.name.toLowerCase().includes(lowerSearch) ||
            query.batch.toLowerCase().includes(lowerSearch) ||
            query.currentCompany.toLowerCase().includes(lowerSearch) ||
            query.currentRole.toLowerCase().includes(lowerSearch)
          );
        })
        .map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setRpProfile(item.profilePic);
              setRpName(item.name);
              setRpQuote(item.quote);
              setRpBatch(item.batch);
              setRpCurrentRole(item.currentRole);
              setRpCurrentCompany(item.currentCompany);
              setRpEmail(item.email);
              setRpLinkedIn(item.linkedIn);
              setRpAchievement(item.achievements);
              setRpCareerTimeline(item.careerTimeline);
              setIsRightPanelOpen(true);
              setActionIndex(-1);
              setIsAction(false);
            }}
            className={`bg-white/95 ${
              index === actionIndex ? "z-60" : "z-0"
            } backdrop-blur-md rounded-xl shadow-md border border-red-100 p-4 flex items-center gap-4 relative hover:shadow-lg transition-all duration-200`}
          >
            {/* Profile Image */}
            <img
              src={item.profilePic || item.alumni[0].profilePic}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-red-300 object-cover"
            />

            {/* Alumni Info */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500">
                🎓 Batch: <span className="font-medium">{item.batch}</span>
              </p>
              <p className="text-xs text-gray-500 truncate">
                💼 {item.currentRole} @ {item.currentCompany}
              </p>
            </div>

            {/* Actions Menu */}
            <div className="relative ">
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
                className="p-1 rounded-md hover:bg-red-100 transition"
              >
                ⋮
              </button>

              {isAction && clickedItem === index && (
                <div className="absolute right-0  top-8 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setters.setname(item.name);
                      setters.setBatch(item.batch);
                      setters.setCurrentCompany(item.currentCompany);
                      setters.setCurrentRole(item.currentRole);
                      setters.setLinkedIn(item.linkedIn);
                      setters.setEmail(item.email || "");
                      setters.setQuote(item.quote);
                      setters.setCareerTimeline(item.careerTimeline);
                      setters.setAchievement(item.achievements);
                      setters.setUpdatingAlumniId(item._id);
                      setters.setIsEditing(true);
                      setClickedItem(-1);
                      setIsAction(false);
                      setIsAdding(!isAdding);
                      setSearch("");
                    }}
                    className="block w-full  text-left px-3 py-2 text-sm hover:bg-red-50 text-gray-700"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(true);
                      setDeletingAlumniId(item._id);
                      setClickedItem(-1);
                      setIsAction(false);
                    }}
                    className="block w-full text-left px-3  py-2 text-sm hover:bg-red-50 text-red-600"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default AlumniListMobile;
