import React from "react";
import profile from "../../assets/images/profile.jpg";
import { Link } from "react-router";
import { IoMdEye } from "react-icons/io";
import axios from "axios";
import { base_url } from "../../config/config";
import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import { useEffect } from "react";
import { useState } from "react";

const Writers = () => {
  const { store } = useContext(storeContext);
  const [writers, setWriters] = useState([]);
  console.log(typeof writers);
  console.log(writers);

  const getWriters = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/writer`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });

      setWriters(data.writers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWriters();
  }, []);

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
            {writers.map((writer, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-6 px-3">
                  <span>{i + 1}</span>
                </td>
                <td className="py-6 px-3">
                  <span>{writer.name}</span>
                </td>
                <td className="py-6">
                  <span>{writer.category}</span>
                </td>
                <td className="py-6">
                  <span className="capitalize">{writer.role}</span>
                </td>
                <td className="py-6">
                  <img
                    className="w-[50px] h-[50px] object-cover object-top"
                    src={profile}
                    alt=""
                  />
                </td>
                <td className="py-6">
                  <span>{writer.email}</span>
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
