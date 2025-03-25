import React, { useEffect, useState } from "react";
import { FaHome, FaPhone, FaCar } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { CgDollar } from "react-icons/cg";
import { GrGallery } from "react-icons/gr";
import { Link } from "react-router-dom";

function Sidebar({ active }) {
  const [activeScreen, setActiveScreen] = useState();
  const location = window.location.pathname;
  useEffect(() => {
    setActiveScreen(location);
  }, [location]);
  return (
    <div
      className={`${
        active ? "w-72" : "w-16"
      } bg-white border-r duration-300 border-gray-100`}
    >
      <img
        src={require("../images/logo.png")}
        className="mx-auto mt-3 w-auto h-16"
        alt=""
      />

      <div className="flex flex-col space-y-1 mt-12">
        <Link
          to="/admin/dashboard"
          className={`${
            activeScreen === "/admin/dashboard"
              ? "text-white bg-purple-700"
              : "text-gray-500"
          } flex items-center p-4 `}
        >
          <FaHome className="mr-3" size={22} />
          <span className={`font-semibold ${active ? "block" : "hidden"}`}>
            Home
          </span>
        </Link>

        {/* <Link
          to="/admin/leads"
          className={`${
            activeScreen === "/admin/leads"
              ? "text-white bg-purple-700"
              : "text-gray-500"
          } flex items-center p-4 `}
        >
          <FaPhone className="mr-3 rotate-90" size={22} />
          <span className={`font-semibold ${active ? "block" : "hidden"}`}>
            All Leads
          </span>
        </Link> */}
      </div>
    </div>
  );
}

export default Sidebar;
