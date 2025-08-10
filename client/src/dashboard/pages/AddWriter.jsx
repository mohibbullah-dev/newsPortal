import React from "react";
import { Link } from "react-router";

const AddWriter = () => {
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between">
        <span className="text-xl font-semibold">Add writers</span>
        <Link
          to="/dashboard/writers"
          className="text-xl font-semibold bg-fuchsia-700 hover:bg-fuchsia-800 py-1.5 px-2 rounded-md text-white"
        >
          Writers
        </Link>
      </div>

      <div className="mt-6">
        <form className="flex flex-col gap-4" action="">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="name">
                Name
              </label>
              <input
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="text"
                name=""
                id=""
                placeholder="search"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="category">
                Category
              </label>
              <select
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="text"
                name="category"
                id="category"
                placeholder="search"
              >
                <option value="">---Select type---</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="email">
                Email
              </label>
              <input
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="email"
                name="email"
                id="email"
                placeholder="email"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="password">
                Password
              </label>
              <input
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="password"
                name="Password"
                id="Password"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <Link className="text-xl font-semibold py-1.5 bg-indigo-500 hover:bg-indigo-600 px-2 rounded-md text-white">
              Add writers
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWriter;
