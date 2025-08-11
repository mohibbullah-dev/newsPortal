import React, { useContext } from "react";
import dash_logo from "../../assets/images/logo.png";

import { RxDashboard } from "react-icons/rx";
import { RiNewsLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router";
import { storeContext } from "../../context/storeContext";

const Sidebar = () => {
  const { store } = useContext(storeContext);

  const { pathname } = useLocation();
  return (
    <div className="w-[250px] px-3 h-screen bg-white fixed left-0 top-0">
      <div className="h-[70px] flex justify-center items-center">
        <Link to="/dashboard">
          <img className="w-[190px]" src={dash_logo} alt="logo" />
        </Link>
      </div>

      <ul className="flex flex-col gap-y-1 font-medium">
        {store.userInfo?.role === "admin" ? (
          <>
            <li>
              <Link
                to="/dashboard/admin"
                className={`px-3 ${
                  pathname === "/dashboard/admin"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-[#404040f6]"
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}
              >
                <span className="text-xl">
                  <RxDashboard />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/writer/add"
                className={`px-3 ${
                  pathname === "/dashboard/writer/add"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-[#404040f6]"
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}
              >
                <span className="text-xl">
                  <IoMdAdd />
                </span>
                <span>Add writer</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/writers"
                className={`px-3 ${
                  pathname === "/dashboard/writers"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-[#404040f6]"
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}
              >
                <span className="text-xl">
                  <TfiWrite />
                </span>
                <span>writers</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/dashboard/writer"
                className={`px-3 ${
                  pathname === "/dashboard/writer"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-[#404040f6]"
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center bg-indigo-500 hover:text-white`}
              >
                <span className="text-xl">
                  <RxDashboard />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>{" "}
            <li>
              <Link
                to="/dashboard/news/create"
                className={`px-3 ${
                  pathname === "/dashboard/news/create"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-[#404040f6]"
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}
              >
                <span className="text-xl">
                  <IoMdAdd />
                </span>
                <span>Add news</span>
              </Link>
            </li>
          </>
        )}

        <li>
          <Link
            to="/dashboard/news"
            className={`px-3 ${
              pathname === "/dashboard/news"
                ? "bg-indigo-500 text-white"
                : "bg-white text-[#404040f6]"
            } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}
          >
            <span className="text-xl">
              <RiNewsLine />
            </span>
            <span>News</span>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/profile"
            className={`px-3 ${
              pathname === "/dashboard/profile"
                ? "bg-indigo-500 text-white"
                : "bg-white text-[#404040f6]"
            } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}
          >
            <span className="text-xl">
              <CgProfile />
            </span>
            <span>profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
