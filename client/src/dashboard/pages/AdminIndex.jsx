import React from "react";
import profile from "../../assets/images/profile.jpg";
import { Link, Links } from "react-router";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
const AdminIndex = () => {
  return (
    <div className="">
      <div className="grid grid-cols-5 gap-4">
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">50</span>
          <span className="text-xl text-gray-500 capitalize">Total News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">50</span>
          <span className="text-xl text-gray-500 capitalize">Pending News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">50</span>
          <span className="text-xl text-gray-500 capitalize">active News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">50</span>
          <span className="text-xl text-gray-500 capitalize">
            deactive News
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">50</span>
          <span className="text-xl text-gray-500 capitalize">writers News</span>
        </div>
      </div>

      <div className="bg-white p-4 mt-4">
        <div className="flex justify-between">
          <span className="text-xl font-semibold">Recent News</span>
          <span className="text-xl font-semibold">View all</span>
        </div>
        <div className="py-8 text-start">
          <table className="w-full text-start">
            <thead className="">
              <tr className="uppercase">
                <th className="text-start px-3">Title</th>
                <th className="text-start">Image</th>
                <th className="text-start">category</th>
                <th className="text-start">description</th>
                <th className="text-start">date</th>
                <th className="text-start">status</th>
                <th className="text-start">action</th>
              </tr>
            </thead>

            <tbody className="p-[100px]">
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20,
              ].map((n, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-6 px-3">
                    <span>Top Web Design Trends of 2025:</span>
                  </td>
                  <td className="py-6">
                    <img
                      className="w-[50px] h-[50px] object-cover object-top"
                      src={profile}
                      alt=""
                    />
                  </td>
                  <td className="py-6">
                    <span className="capitalize">traval</span>
                  </td>
                  <td className="py-6">
                    <span>You all must have wa...</span>
                  </td>
                  <td className="py-6">
                    <span>Octover 10, 2023</span>
                  </td>
                  <td className="py-6">
                    <span className="bg-green-100 px-[4px] py-[2px] rounded-2xl">
                      active
                    </span>
                  </td>
                  <td className="py-6">
                    <Link className="bg-green-500 float-left text-white p-1.5 rounded-md hover:bg-green-600">
                      <IoMdEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
