import React from "react";
import profile from "../../assets/images/profile.jpg";
const Header = () => {
  return (
    <div className="w-[calc(100vw-250px)] fixed top-3 rounded-sm ml-4 z-50">
      <div className="flex justify-between items-center w-full h-[70px] pl-4 bg-white rounded-sm">
        <input
          className="outline-none border px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
          type="text"
          name=""
          id=""
          placeholder="search"
        />

        <div className="pr-10 flex justify-center items-center gap-3">
          <div className="flex flex-col justify-center items-center">
            <span className="font-semibold">Mohibbullah</span>
            <span>admin</span>
          </div>
          <img
            className="w-[40px] h-[40px] rounded-[50%] object-cover object-top"
            src={profile}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
