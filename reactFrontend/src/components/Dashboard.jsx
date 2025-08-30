import React from 'react'

function Dashboard() {
  return (
    <div className="h-screen w-full py-5 px-4 sm:px-6 lg:px-10">
      {/* Top Bar */}
      <div className="w-full px-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-semibold text-gray-400">DASHBOARD</h1>
        
        <div className="flex gap-3 items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-red-600 tracking-wide text-center sm:text-left">
            Welcome back, <span className="font-extrabold text-red-700">Admin</span>
          </h1>

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full relative bg-red-500 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=60"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="w-full flex flex-col lg:flex-row justify-between gap-6 px-5 py-4 bg-[#f5f6fa] mt-4 rounded-lg">
        <div className="flex-1 p-6 bg-white border border-red-100 rounded-2xl shadow-lg">
          <h1 className="text-sm text-red-600 font-semibold tracking-wide uppercase mb-2">🎓 Total Alumni</h1>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">56</h2>
          <p className="text-xs text-gray-500 mt-2">Updated just now</p>
        </div>

        <div className="flex-1 p-6 bg-white border border-red-100 rounded-2xl shadow-lg">
          <h1 className="text-sm text-red-600 font-semibold tracking-wide uppercase mb-2">📅 Total Meets</h1>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">12</h2>
          <p className="text-xs text-gray-500 mt-2">Updated just now</p>
        </div>

        <div className="flex-1 p-6 bg-white border border-red-100 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-red-600 font-semibold tracking-wide uppercase">⏳ Upcoming Meet</h1>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-red-400">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            <p>📍 PCTE Main Auditorium</p>
            <p>🗓️ Aug 25, 2025</p>
          </div>
          <div className="mt-2 text-sm font-semibold text-red-500 tracking-wide">
            ⌛ Countdown: <span className="text-gray-700">21 days</span>
          </div>
        </div>
      </div>

      {/* Bottom Graph/Boxes */}
      <div className="w-full flex flex-col lg:flex-row gap-6 mt-10 px-5">
        <div className="w-full lg:w-2/5 h-60 rounded-2xl bg-white"></div>
        <div className="w-full lg:w-3/5 h-60 rounded-2xl bg-white"></div>
      </div>
    </div>
  )
}

export default Dashboard
