        <div className="flex w-full justify-between gap-4">
          <div>
            <h1 className="font-bold text-2xl text-red-700">
              {isEditing ? "Edit Alumni" : "Add Alumni"}
            </h1>
            <p className="text-xs text-gray-400 mt-2">
              {isEditing
                ? "Update the details below to edit this alumni's information in the database."
                : "Please fill in the form below to add an alumni to the database."}
            </p>
          </div>
          <div className=" flex items-center gap-5">
            <button
              onClick={() => {
                setname("");
                setProfilePic(null);
                setBatch("");
                setLinkedIn("");
                setEmail("");
                setCurrentCompany("");
                setCurrentRole("");
                setCareerTimeline([
                  { year: "", role: "", company: "", location: "" },
                ]);
                setAchievement([]);
                setQuote("");
                setStep(1);
                setNewAch("");
                setPreviewURL(null);
                setErrorMessage("");
              }}
              type="button"
              className="flex items-center justify-center gap-2 
             md:px-5 md:py-4 p-3 rounded-full  md:rounded-xl border border-gray-300 
             text-gray-600 bg-white 
             hover:bg-gray-100 hover:text-gray-800 
             transition-all shadow-sm"
            >
              <RiResetLeftFill />
              {width >= 1024 && width >= 768 ? (
                <span className="text-sm font-medium">Reset</span>
              ) : null}
            </button>

            <button
              onClick={() => setIsAddingAlumni(false)}
              className="group relative md:w-14 md:h-14 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-md hover:shadow-lg hover:shadow-red-200 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <span className="absolute inset-0 rounded-full bg-white/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>

              <FiSearch className="text-white text-xl transition-transform duration-300 group-hover:scale-110" />
            </button>
          </div>
        </div>
        <hr className="text-red-300 mt-3"></hr>
        {errorMessage && (
          <div className="mt-1 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md flex items-center justify-between gap-2">
            
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                />
              </svg>
              {errorMessage}
            </div>

            <button
              onClick={() => setErrorMessage("")}
              className="text-red-500 hover:text-red-700 transition"
            >
              ✕
            </button>
          </div>
        )}