import React, { useContext, useEffect, useState } from "react";
import profile from "../../assets/images/profile.jpg";
import { data, Link, Links } from "react-router";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { base_url } from "../../config/config";
import { storeContext } from "../../context/storeContext";
import { convert } from "html-to-text";
import toast from "react-hot-toast";
const AdminIndex = () => {
  const { store } = useContext(storeContext);

  const [total_news, setTotal_news] = useState([]);
  const [view_news, setView_news] = useState([]);
  const [state, setState] = useState(false);
  const [pending_news, setPending_news] = useState(null);
  const [active_news, setActive_news] = useState(null);
  const [deactive_news, setDeactive_news] = useState(null);
  const [writers, setWriters] = useState(null);

  const getNews = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/get-all-news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });

      const pending_news = data.data.filter((n, i) => n.status === "pending");
      if (pending_news < 0) {
        setPending_news(0);
      } else {
        setPending_news(pending_news.length);
      }

      const active_news = data.data.filter((n, i) => n.status === "active");
      if (active_news < 0) {
        setActive_news(0);
      } else {
        setActive_news(active_news.length);
      }

      const deactive_news = data.data.filter((n, i) => n.status === "deactive");
      if (deactive_news < 0) {
        setDeactive_news(0);
      } else {
        setDeactive_news(active_news.length);
      }

      if (data.data.length < 0) {
      } else {
        setTotal_news(data.data);
        if (state === true) {
          setView_news(data.data.slice(0));
        } else {
          setView_news(data.data.slice(0, 1));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, [state]);

  // get writers start here
  const getWriters = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/writer`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });

      console.log(" witersdata.length: ", data.writers.length);

      if (data.writers.length < 0) {
        console.log("Writers not found", data);
      } else {
        setWriters(data.writers.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWriters();
  }, []);

  const updateStatus = async (status, newsId) => {
    try {
      const { data } = await axios.put(
        `${base_url}/api/v1/update-status/${newsId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );
      if (!data) {
        toast.error("status not updated");
      } else {
        toast.success(`status updated sccessfully`);
      }

      getNews();
    } catch (error) {
      toast.error("server error");
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-5 gap-4">
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{total_news.length}</span>
          <span className="text-xl text-gray-500 capitalize">Total News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{pending_news}</span>
          <span className="text-xl text-gray-500 capitalize">Pending News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{active_news}</span>
          <span className="text-xl text-gray-500 capitalize">Active News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{deactive_news}</span>
          <span className="text-xl text-gray-500 capitalize">
            Deactive News
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{writers}</span>
          <span className="text-xl text-gray-500 capitalize">Writers</span>
        </div>
      </div>

      <div className="bg-white p-4 mt-4">
        <div className="flex justify-between">
          <span className="text-xl font-semibold">Recent News</span>
          <span
            onClick={() => {
              setState(true);
            }}
            className="text-xl font-semibold cursor-pointer"
          >
            View all
          </span>
        </div>
        <div className="py-8 text-start">
          <table className="w-full text-start">
            <thead className="">
              <tr className="uppercase">
                <th className="text-start px-3">Title</th>
                <th className="text-start">Image</th>
                <th className="text-start">Category</th>
                <th className="text-start">Description</th>
                <th className="text-start">Date</th>
                <th className="text-start">Status</th>
                <th className="text-start">View</th>
              </tr>
            </thead>

            <tbody className="p-[100px]">
              {view_news.map((n, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-6 px-3">
                    <span>{n.title.slice(0, 20)}</span>
                  </td>
                  <td className="py-6">
                    <img
                      className="w-[50px] h-[50px] object-cover object-top"
                      src={n.image.url}
                      alt={n.title.slice(0, 10)}
                    />
                  </td>
                  <td className="py-6">
                    <span className="capitalize">{n.category}</span>
                  </td>
                  <td className="py-6">
                    <span>{convert(n.description.slice(0, 50))} ...</span>
                  </td>
                  <td className="py-6">
                    <span>{n.date}</span>
                  </td>
                  <td className="py-6">
                    {n.status === "pending" && (
                      <span
                        onClick={() => {
                          updateStatus("active", n._id);
                        }}
                        className={`bg-blue-500 px-[10px] py-[8px] text-white cursor-pointer rounded-2xl`}
                      >
                        {n.status}
                      </span>
                    )}
                    {n.status === "active" && (
                      <span
                        onClick={() => {
                          updateStatus("deactive", n._id);
                        }}
                        className={`bg-green-500 px-[10px] py-[8px] text-white cursor-pointer rounded-2xl`}
                      >
                        {n.status}
                      </span>
                    )}
                    {n.status === "deactive" && (
                      <span
                        onClick={() => {
                          updateStatus("active", n._id);
                        }}
                        className={`bg-red-500 px-[10px] py-[8px] text-white cursor-pointer rounded-2xl`}
                      >
                        {n.status}
                      </span>
                    )}
                  </td>
                  <td className="py-6">
                    <Link
                      to={`/dashboard/news/news-single/${n._id}`}
                      className="bg-green-500 float-left text-white p-1.5 rounded-md hover:bg-green-600"
                    >
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
