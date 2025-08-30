import { Link, useLocation } from "react-router-dom";
import { HomeIcon, UserPlusIcon, CalendarDaysIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";

const navItems = [
  { icon: HomeIcon, href: '/admin', label: 'Dashboard' },
  { icon: UserPlusIcon, href: '/admin/add-alumni', label: 'Add Alumni' },
  { icon: CalendarDaysIcon, href: '/admin/plan-meet', label: 'Plan Meet' },
  { icon: ChartBarIcon, href: '/admin/stats', label: 'Reports' },
];

const SidebarItem = ({setSidebarOpen}) => {
  const location = useLocation();
  const pathname = location.pathname;

  useGSAP(() => {
    gsap.to('.link', {
      right: 0,
      width: '100%',
      duration: 0.01,
      ease: 'power1.in',
    });

    gsap.to('.no', {
      right: 10,
      width: '75%',
      duration: 0.01,
      ease: 'power1.in',
    });
  }, [pathname]);

  return (
    <div className="space-y-3 w-full ml-15">
      {navItems.map(({ icon: Icon, href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
         
            key={href}
            to={href}
            onClick={() => setSidebarOpen(false)} 
            className={`flex items-center gap-3 p-3 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-[#F2F7FB] link text-red-600 font-semibold relative shadow-md'
                : 'text-white group hover:text-red-600 no w-52 right-10 hover:bg-white relative hover:shadow-md z-20'
            }`}
          >
            {/* 👇 Properly rendered icon */}
            <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-white group-hover:text-red-600 transition-all duration-300'}`} />
            
            <span className="text-sm font-medium">{label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarItem;
