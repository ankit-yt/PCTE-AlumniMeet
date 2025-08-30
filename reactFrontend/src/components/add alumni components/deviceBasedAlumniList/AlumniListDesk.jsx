import React from "react";

function AlumniListDesk({ props }) {
  const {
    section,
    list,
    setSelectedMeetArray,
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
    setDeletingMeetId,
  } = props;
  return (
    <div className="w-full flex-1 overflow-auto px-10 pb-6">
      <div className=" rounded-xl shadow-xl border  border-red-100 bg-white/95 backdrop-blur-md">
        {section === "addAlumni" ? (
          <table className="w-full table-fixed text-sm  text-gray-700">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-red-500 to-red-600  text-white">
              <tr>
                <th className="px-4 py-3 text-left w-[5%]">#</th>
                <th className="px-4 py-3 text-left w-[12%]">Profile</th>
                <th className="px-4 py-3 text-left w-[20%]">Name</th>
                <th className="px-4 py-3 text-left w-[12%]">Batch</th>
                <th className="px-4 py-3 text-left w-[20%]">Company</th>
                <th className="px-4 py-3 text-left w-[15%]">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {list
                .filter((alumni) => {
                  if (search.trim().length === 0) {
                    return true;
                  }
                  const lowerSearch = search.toLowerCase();
                  return (
                    alumni.name.toLowerCase().includes(lowerSearch) ||
                    alumni.batch.toLowerCase().includes(lowerSearch) ||
                    alumni.currentCompany.toLowerCase().includes(lowerSearch) ||
                    alumni.currentRole.toLowerCase().includes(lowerSearch)
                  );
                })
                .map((alumni, index) => {
                  return (
                    <tr
                      onClick={() => {
                        setRpProfile(alumni.profilePic);
                        setRpName(alumni.name);
                        setRpQuote(alumni.quote);
                        setRpBatch(alumni.batch);
                        setRpCurrentRole(alumni.currentRole);
                        setRpCurrentCompany(alumni.currentCompany);
                        setRpEmail(alumni.email);
                        setRpLinkedIn(alumni.linkedIn);
                        setRpAchievement(alumni.achievements);
                        setRpCareerTimeline(alumni.careerTimeline);
                        setIsRightPanelOpen(true);
                      }}
                      key={index}
                      className="hover:bg-red-50 transition-all duration-200 border-b border-gray-200"
                    >
                      <td className="px-4 py-3 font-medium">{index + 1}</td>
                      <td className="px-4 py-3">
                        <img
                          src={alumni.profilePic}
                          alt="Profile"
                          className="w-12 h-12 object-top rounded-full border-2 border-red-300 object-cover shadow-sm"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {alumni.name}
                      </td>
                      <td className="px-4 py-3">2023</td>
                      <td className="px-4 py-3">Google</td>
                      <td className="px-4 py-3 relative">
                        {/* Action Menu Trigger */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (clickedItem === index && isAction) {
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

                        {/* Dropdown Menu - Fixed Width to Avoid Table Shift */}
                        {isAction && clickedItem === index && (
                          <div className="absolute right-2 top-10 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setters.setname(alumni.name);
                                setters.setBatch(alumni.batch);
                                setters.setCurrentCompany(
                                  alumni.currentCompany
                                );
                                setters.setCurrentRole(alumni.currentRole);
                                setters.setLinkedIn(alumni.linkedIn);
                                setters.setEmail(
                                  alumni.email ? alumni.email : ""
                                );
                                setters.setQuote(alumni.quote);
                                setters.setCareerTimeline(
                                  alumni.careerTimeline
                                );
                                setters.setAchievement(alumni.achievements);
                                setters.setUpdatingAlumniId(alumni._id);
                                setters.setIsEditing(true);
                                setClickedItem(-1);
                                setIsAction(false);
                                setIsAdding(!isAdding);
                                setSearch("");
                              }}
                              className="block w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-gray-700"
                            >
                              ✏ Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteConfirm(true);
                                setDeletingAlumniId(alumni._id);
                                setClickedItem(-1);
                                setIsAction(false);
                              }}
                              className="block w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600"
                            >
                              🗑 Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <table className="w-full  table-fixed text-sm text-gray-700">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left  w-[5%]">#</th>
                <th className="px-4 py-3  w-[15%]">Alumni Pic</th>
                <th className="px-4 py-3 text-left  w-[20%]">Alumni's Name</th>
                <th className="px-4 py-3 text-left  w-[15%]">Date</th>
                <th className="px-4 py-3 text-left  w-[15%]">Location</th>
                <th className="px-4 py-3 text-left  w-[15%]">Organized By</th>
                <th className="px-4 py-3    w-[15%]">status</th>
                <th className="px-4 py-3 text-left  w-[15%]">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {list
                .filter((meet) => {
                  if (search.trim().length === 0) return true;
                  const lowerSearch = search.toLowerCase();
                  return (
                    meet.title.toLowerCase().includes(lowerSearch) ||
                    meet.location.toLowerCase().includes(lowerSearch) ||
                    meet.organizedBy.toLowerCase().includes(lowerSearch)
                  );
                })
                .map((meet, index) => (
                  <tr
                    onClick={() => {
                      setSelectedMeetArray(meet);
                      setIsRightPanelOpen(true);
                    }}
                    key={index}
                    className="hover:bg-red-50 transition-all duration-200 border-b border-gray-200"
                  >
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="px-4 py-3  ">
                      <img
                        src={meet.alumni[0].profilePic}
                        alt="Profile"
                        className="w-12 h-12 mx-auto object-top rounded-full border-2 border-red-300 object-cover shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 truncate">
                      {meet.alumni[0].name}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(meet.time).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 truncate">{meet.location}</td>
                    <td className="px-4 py-3 truncate">{meet.organizedBy}</td>
                    <td className="px-4 py-3 w-full  ">
                      <span
                        className={`px-3 py-1  rounded-full w-fit mx-auto block  text-center  text-xs  font-semibold
      ${
        (meet.status === "Upcoming" || 1 === 1) &&
        "bg-yellow-100 text-yellow-700 border border-yellow-300"
      }
      ${
        meet.status === "Ongoing" &&
        "bg-blue-100 text-blue-700 border border-blue-300"
      }
      ${
        meet.status === "Completed" &&
        "bg-green-100 text-green-700 border border-green-300"
      }
      ${
        meet.status === "Cancelled" &&
        "bg-red-100 text-red-700 border border-red-300"
      }
    `}
                      >
                        {/* {meet.status} */} upcoming
                      </span>
                    </td>

                    <td className="px-4 py-3 relative">
                      {/* Action Menu Trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (clickedItem === index && isAction) {
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

                      {/* Dropdown Menu */}
                      {isAction && clickedItem === index && (
                        <div className="absolute right-2 top-10 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setters.setTitle(meet.title);
                              console.log(setters)
                              setters.setAlumniName(meet.alumni[0].name);
                              setters.setDate(new Date(meet.time).toISOString().slice(0,16));
                              setters.setLocation(meet.location);
                              setters.setMeetId(meet._id)
                              console.log(meet._id)
                              setters.setClassJoined(meet.classJoined)
                              setters.setOrganizedBy(meet.organizedBy);
                              setters.setDescription(meet.description);
                              setters.setAlumni(meet.alumni[0]._id);
                              console.log(meet.alumni)
                              setters.setPreviewURL(meet.alumni[0].profilePic)
                              setters.setUpdatingMeetId(meet._id);
                              setters.setIsEditing(true);
                              setClickedItem(-1);
                              setIsAction(false);
                              
                              setIsAdding(!isAdding);
                              setSearch("");
                            }}
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-gray-700"
                          >
                            ✏ Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("clicked")
                              setShowDeleteConfirm(true);
                              setDeletingMeetId(meet._id);
                              setClickedItem(-1);
                              setIsAction(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AlumniListDesk;
