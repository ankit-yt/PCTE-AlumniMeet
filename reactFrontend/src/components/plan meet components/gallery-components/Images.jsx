import React from 'react'

function Images({values}) {
    const {images} = values
  return (
    <div className="w-full max-w-6xl px-4 mt-20">
  <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
    {images.map((image, index) => (
      <div
        key={index}
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      >
        {/* 📸 Image */}
        <img
          src={image.image}
          alt={`Alumni Memory ${index + 1}`}
          className="w-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* 🖼 Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* 📍 Caption */}
        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
          <h3 className="text-lg font-bold tracking-wide drop-shadow-lg">
            Alumni Meet {index + 1}
          </h3>
          <p className="text-sm text-gray-200 italic">
            Cherished memories captured forever
          </p>
        </div>

        {/* 🎨 Red Accent Border */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-red-500 transition duration-500 pointer-events-none"></div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Images
