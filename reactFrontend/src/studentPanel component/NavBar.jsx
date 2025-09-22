import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-white fixed w-full z-50 shadow-md border-b border-gray-200">
      <div className="max-w-7xl h-20 mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide text-gray-900">
          Alumni<span className="text-red-600">Meet</span>
        </div>
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          {["Home", "Talks", "Memories", "Alumni", "Classes", "About"].map(
            (item) => (
              <li key={item}>
                <NavLink to={`/${item.toLowerCase()}`}>{item}</NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
