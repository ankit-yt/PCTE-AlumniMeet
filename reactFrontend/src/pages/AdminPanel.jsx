import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarItem from "../components/SideBarItems";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setScreenWidth } from "../redux/slices/uiSlice";
import { getAllAlumni } from "../api/alumni.api";
import { addAlumni } from "../redux/slices/alumniSlice";
import { toast } from "react-toastify";
import { getAllMeets } from "../api/meet.api";
import { addMeets } from "../redux/slices/meetSlice";

function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    try {
      console.log("fetching alumnia data")
      const fetchAllAlumni = async () => {
        const response = await getAllAlumni();
        dispatch(addAlumni(response.data));
      };
      fetchAllAlumni();
      const fetchAllMeets = async()=>{
        const response = await getAllMeets();
        dispatch(addMeets(response.data.data))
      }
      fetchAllMeets()
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while fetching alumni data");
    }
  },[dispatch , reFetch]);


  return (
    <div className="flex w-full h-screen relative">
   
      <button
        onClick={() => setSidebarOpen(false)}
        className={`absolute top-10 ${
          sidebarOpen ? "left-66" : "-left-7"
        } transition-all duration-300 z-99 text-red-500 lg:hidden`}
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
  
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-30 flex items-center p-4">
        <button onClick={() => setSidebarOpen(true)}>
          <Bars3Icon className="w-7 h-7 text-red-600" />
        </button>
        <h1 className="ml-4 font-bold text-lg text-red-600">Alumni MEET</h1>
      </div>

      <div
        className={`fixed lg:static top-0 left-0 h-screen overflow-hidden flex flex-col items-center 
        bg-gradient-to-b from-[#FF5252] via-[#C62828] to-[#B71C1C] px-3 py-5 transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
        w-64 lg:w-1/6`}
      >
 
        <div
          style={{
            boxShadow: "inset 4px 4px 8px #e0e0e0, inset -4px -4px 8px #ffffff",
          }}
          className="flex w-full bg-[#F2F7FB] h-16 mx-auto mb-8 rounded-full items-center px-2"
        >
          <div className="w-1/4 flex justify-center items-center ml-3">
            <img
              className="w-full h-full object-cover"
              src="https://pcte.edu.in/wp-content/uploads/2025/04/PCTE-Logo-Color-Depth-1.png"
              alt="Logo"
            />
          </div>
          <div className="h-full flex justify-center items-center ml-3">
            <h1 className="font-bold text-md text-[#1e1e1e]">Alumni MEET</h1>
          </div>
        </div>

      
        <SidebarItem setSidebarOpen={setSidebarOpen} />
      </div>

  
      <div className="flex-1 bg-[#f5f6fa] overflow-y-auto lg:ml-0 pt-14 lg:pt-0">
        <Outlet context={{ reFetch, setReFetch }} />
      </div>
    </div>
  );
}

export default AdminPanel;
