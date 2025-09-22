import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function TalkInsight() {
  const location = useLocation();
  const { talk } = location.state || {};
  const [isTalkInfo, setIsTalkInfo] = useState(true);

  return (
    <div className="w-full min-h-screen py-5 relative overflow-hidden bg-gray-50">
         <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="w-full h-48 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="text-black">Talk</span>{" "}
          <span className="text-red-600">Insights</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Get All Info and Memories captured in Talk
        </p>
      </div>

      <div className="alumni-info w-full h-96 justify-center  flex py-10">
        <div className="profilePic w-1/2  h-full flex flex-col justify-center items-end px-5">
          <div className="w-64 relative h-64 rounded-full border-red-600 border-4 ">
            <div className="absolute inset-0 bg-gradient-to-bl animate-spin [animation-duration:6s] rounded-full from-red-500 to-blue-600 blur-xl"></div>
            <img
              className="w-full h-full rounded-full relative object-cover z-10"
              src={talk.alumni[0].profilePic}
              alt=""
            />
          </div>
        </div>

        <div className=" h-full flex-col flex  w-1/2 py-5 px-5 ">
          <div className="flex gap-5 mb-6">
            <button
              onClick={() => setIsTalkInfo(true)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                isTalkInfo
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Talk
            </button>
            <button
              onClick={() => setIsTalkInfo(false)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                !isTalkInfo
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Alumni
            </button>
          </div>

          <div className="  rounded-xl p-6  overflow-auto">
            {isTalkInfo ? (
              <div className="space-y-3 text-gray-700">
                <InfoRow label="Title" value={talk.title} />
                <InfoRow label="Description" value={talk.description} />
                <InfoRow label="Organized by" value={talk.organizedBy} />
                <InfoRow
                  label="Time"
                  value={new Date(talk.time).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                />
                <InfoRow label="Venue" value={talk.location} />
                <InfoRow
                  label="Classes Joined"
                  value={talk.classJoined.join(",") || "loading..."}
                />
              </div>
            ) : (
              <div className="space-y-3 text-gray-700">
                <InfoRow label="Alumni Name" value={talk.alumni[0].name} />
                <InfoRow
                  label="Profession"
                  value={talk.alumni[0].currentRole}
                />
                <InfoRow
                  label="Company"
                  value={talk.alumni[0].currentCompany}
                />
                <InfoRow label="Batch" value={talk.alumni[0].batch} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Section Redesigned */}
      <div className="w-full md:w-4/5 mx-auto mb-16 relative">
      
     {talk.media.videoLink &&  <div className="absolute w-72 h-72 bg-red-500/30 rounded-full blur-3xl -bottom-20 -right-20"></div>}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          {talk.media.videoLink && (
            <video
              className="w-full h-96 object-cover object-top"
              src={talk.media.videoLink}
              controls
            />
          )}
          <div className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
            🎥 Alumni Talk
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          <span> Memories from the</span>{" "}
          <span className="text-red-600">Talk </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {talk.media.images.map((src, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={src.image}
                alt={`Memory ${i}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-semibold text-lg">
                Memory {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-4">
      <span className="font-semibold text-gray-900 w-40">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default TalkInsight;
