import React from "react";
import profile from "../../assets/images/profile.jpg";
import { Link } from "react-router";
import { IoMdEye } from "react-icons/io";
const Writers = () => {
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between">
        <span className="text-xl font-semibold">Writers</span>
        <Link
          to="/dashboard/writer/add"
          className="text-xl font-semibold bg-fuchsia-700 hover:bg-fuchsia-800 py-1.5 px-2 rounded-md text-white"
        >
          Add writers
        </Link>
      </div>

      <div className="py-8 text-start">
        <table className="w-full text-start">
          <thead className="">
            <tr className="uppercase">
              <th className="text-start px-3">No</th>
              <th className="text-start px-3">Reporter Name</th>
              <th className="text-start">category</th>
              <th className="text-start">role</th>
              <th className="text-start">image</th>
              <th className="text-start">email</th>
              <th className="text-start">action</th>
            </tr>
          </thead>

          <tbody className="p-[100px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-6 px-3">
                  <span>{i + 1}</span>
                </td>
                <td className="py-6 px-3">
                  <span>Mohibullah</span>
                </td>
                <td className="py-6">
                  <span>Education</span>
                </td>
                <td className="py-6">
                  <span className="capitalize">Writer</span>
                </td>
                <td className="py-6">
                  <img
                    className="w-[50px] h-[50px] object-cover object-top"
                    src={profile}
                    alt=""
                  />
                </td>
                <td className="py-6">
                  <span>mohibbullahn@gmail.com</span>
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
  );
};

export default Writers;
