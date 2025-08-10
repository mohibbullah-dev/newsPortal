import React from "react";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router";
const Profile = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex bg-white rounded-md justify-center items-center">
        <div className="flex items-start justify-center p-7 flex-col">
          <label
            htmlFor="img"
            className="border  border-gray-200 border-dashed w-[150px] h-[150px] flex flex-col items-center justify-center cursor-pointer gap-3"
          >
            <span>
              <CiImageOn className="text-2xl" />
            </span>
            <span className="text-lg">Select Image</span>
          </label>
          <input className="hidden" type="file" name="img" id="img" />
        </div>

        <div className="flex flex-col items-start justify-start">
          <span className="">Name: Mohibbullah</span>
          <span className="">Email: mohibbullah@gmail.com</span>
          <span className="">Category: all</span>
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-md justify-center items-center">
        <p className="text-center text-xl pt-4">Change password</p>
        <form className="flex flex-col gap-4 w-full p-5" action="">
          <div className="grid gap-4">
            <div className="flex min-w-full flex-col items-start gap-1">
              <label className="text-xl text-gray-500" htmlFor="oldpassword">
                Old password
              </label>
              <input
                className="outline-none border min-w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="text"
                name="oldpassword"
                id="oldpassword"
                placeholder="Old-password"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl text-gray-500" htmlFor="newpassword">
                New password
              </label>
              <input
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="newpassword"
                name="newpassword"
                id="newpassword"
                placeholder="New-password"
              />
            </div>
          </div>

          <div>
            <Link className="text-xl py-1.5 bg-indigo-500 hover:bg-indigo-600 px-2 rounded-md text-white">
              change
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
