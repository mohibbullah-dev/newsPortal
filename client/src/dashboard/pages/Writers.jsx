import React from "react";
import profile from "../../assets/images/profile.jpg";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { IoMdEye } from "react-icons/io";
import axios from "axios";
import { base_url } from "../../config/config";
import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import { useEffect } from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";

const Writers = () => {
  const { store } = useContext(storeContext);
  const [writers, setWriters] = useState([]);
  const { writer_id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getWriters = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/writer`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      console.log("writers:", data);

      setWriters(data.writers);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWriter = async () => {
    try {
      const deletedWriter = await axios.delete(
        `${base_url}/api/v1/delete-writer/${writer_id}`,
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );
      toast.success("writer deleted succefully");
      console.log("deletedWriter", deletedWriter);
      navigate("/dashboard/writers");
      getWriters();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const path = `/dashboard/writer/delete/${writer_id}`;

  console.log("path", path);
  console.log("pathname", pathname);

  useEffect(() => {
    if (pathname === path) {
      deleteWriter();
    }
  }, [pathname, path]);

  useEffect(() => {
    getWriters();
  }, []);

  const r_statusHandler = async (status, writer_id) => {
    try {
      const statusUpdated = await axios.post(
        `${base_url}/api/v1/status-update/${writer_id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );
      console.log("statusUpdated", statusUpdated);
      toast.success("status updated succefully");
      getWriters();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
              <th className="text-start px-3 capitalize">No</th>
              <th className="text-start px-3 capitalize">Reporter Name</th>
              <th className="text-start capitalize">category</th>
              <th className="text-start capitalize">role</th>
              <th className="text-start capitalize">image</th>
              <th className="text-start capitalize">email</th>
              <th className="text-start capitalize">status</th>
              <th className="text-start capitalize">action</th>
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
                    src={writer.image?.url}
                    alt=""
                  />
                </td>
                <td className="py-6">
                  <span>{writer.email}</span>
                </td>

                <td className="text-start">
                  {writer.status === "pending" && (
                    <span
                      onClick={() => r_statusHandler("active", writer._id)}
                      className="bg-blue-500 cursor-pointer text-start float-left text-white p-1.5 rounded-md hover:bg-red-600"
                    >
                      {writer.status}
                    </span>
                  )}

                  {writer.status === "active" && (
                    <span
                      onClick={() => r_statusHandler("deactive", writer._id)}
                      className="bg-green-600 cursor-pointer text-start float-left text-white p-1.5 rounded-md hover:bg-red-600"
                    >
                      {writer.status}
                    </span>
                  )}

                  {writer.status === "deactive" && (
                    <span
                      onClick={() => r_statusHandler("active", writer._id)}
                      className="bg-red-600 cursor-pointer text-start float-left text-white p-1.5 rounded-md hover:bg-red-600"
                    >
                      {writer.status}
                    </span>
                  )}
                </td>

                <td className="py-6">
                  <Link
                    to={`/dashboard/writer/edit/${writer._id}`}
                    className="bg-yellow-500 cursor-pointer float-left text-white p-1.5 rounded-md hover:bg-yellow-600"
                  >
                    <FiEdit />
                  </Link>
                  <Link
                    to={`/dashboard/writer/delete/${writer._id}`}
                    className="bg-red-500 ml-3 cursor-pointer float-left text-white p-1.5 rounded-md hover:bg-red-600"
                  >
                    <MdDelete />
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
