// import React, { useContext, useEffect, useState } from "react";
// import profile from "../../assets/images/profile.jpg";
// import { data, Link, Links } from "react-router";
// import { IoMdEye } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";
// import axios from "axios";
// import { base_url } from "../../config/config";
// import { storeContext } from "../../context/storeContext";
// import { convert } from "html-to-text";
// import toast from "react-hot-toast";
// import NewsContent from "../components/NewsContent";

// const WriterIndex = () => {
//   const { store } = useContext(storeContext);

//   const [total_news, setTotal_news] = useState([]);
//   const [view_news, setView_news] = useState([]);
//   const [state, setState] = useState(false);
//   const [pending_news, setPending_news] = useState(null);
//   const [active_news, setActive_news] = useState(null);
//   const [deactive_news, setDeactive_news] = useState(null);
//   const [writers, setWriters] = useState(null);

//   const getNews = async () => {
//     try {
//       const { data } = await axios.get(`${base_url}/api/v1/get-all-news`, {
//         headers: { Authorization: `Bearer ${store.token}` },
//       });
//       console.log(data.data);

//       const pending_news = data.data.filter((n, i) => n.status === "pending");
//       if (pending_news < 0) {
//         setPending_news(0);
//       } else {
//         setPending_news(pending_news.length);
//       }

//       const active_news = data.data.filter((n, i) => n.status === "active");
//       if (active_news < 0) {
//         setActive_news(0);
//       } else {
//         setActive_news(active_news.length);
//       }

//       const deactive_news = data.data.filter((n, i) => n.status === "deactive");
//       if (deactive_news < 0) {
//         setDeactive_news(0);
//       } else {
//         setDeactive_news(active_news.length);
//       }

//       if (data.data.length < 0) {
//         console.log("data not found", data.data);
//       } else {
//         setTotal_news(data.data);
//         if (state === true) {
//           setView_news(data.data.slice(0));
//         } else {
//           setView_news(data.data.slice(0, 1));
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getNews();
//   }, [state]);

//   // get writers start here
//   const getWriters = async () => {
//     try {
//       const { data } = await axios.get(`${base_url}/api/v1/writer`, {
//         headers: {
//           Authorization: `Bearer ${store.token}`,
//         },
//       });

//       console.log(" witersdata.length: ", data.writers.length);

//       if (data.writers.length < 0) {
//         console.log("Writers not found", data);
//       } else {
//         setWriters(data.writers.length);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getWriters();
//   }, []);

//   const updateStatus = async (status, newsId) => {
//     try {
//       const { data } = await axios.put(
//         `${base_url}/api/v1/update-status/${newsId}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${store.token}` },
//         }
//       );
//       if (!data) {
//         toast.error("status not updated");
//       } else {
//         toast.success(`status updated sccessfully`);
//         console.log("status updated sccessfully", data);
//       }

//       getNews();
//     } catch (error) {
//       toast.error("server error");
//     }
//   };

//   return (
//     <div className="">
//       <div className="grid grid-cols-4 gap-4">
//         <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
//           <span className="text-2xl font-bold">{total_news.length}</span>
//           <span className="text-xl text-gray-500 capitalize">Total News</span>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
//           <span className="text-2xl font-bold">{pending_news}</span>
//           <span className="text-xl text-gray-500 capitalize">Pending News</span>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
//           <span className="text-2xl font-bold">{active_news}</span>
//           <span className="text-xl text-gray-500 capitalize">Active News</span>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
//           <span className="text-2xl font-bold">{deactive_news}</span>
//           <span className="text-xl text-gray-500 capitalize">
//             Deactive News
//           </span>
//         </div>
//         {/* <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
//           <span className="text-2xl font-bold">{writers}</span>
//           <span className="text-xl text-gray-500 capitalize">Writers</span>
//         </div> */}
//       </div>

//       <div className="bg-white p-4 mt-4">
//         <div className="flex justify-between">
//           <span className="text-xl font-semibold">Recent News</span>
//           <span
//             onClick={() => {
//               setState(true);
//               console.log("clicked");
//             }}
//             className="text-xl font-semibold cursor-pointer"
//           >
//             View all
//           </span>
//         </div>
//         <div className="py-8 text-start">
//           <table className="w-full text-start">
//             <thead className="">
//               <tr className="uppercase">
//                 <th className="text-start px-3">Title</th>
//                 <th className="text-start">Image</th>
//                 <th className="text-start">Category</th>
//                 <th className="text-start">Description</th>
//                 <th className="text-start">Date</th>
//                 <th className="text-start">Status</th>
//                 <th className="text-start">View</th>
//               </tr>
//             </thead>

//             <tbody className="p-[100px]">
//               {view_news.map((n, i) => (
//                 <tr key={i} className="border-b border-gray-100">
//                   <td className="py-6 px-3">
//                     <span>{n.title.slice(0, 20)}</span>
//                   </td>
//                   <td className="py-6">
//                     <img
//                       className="w-[50px] h-[50px] object-cover object-top"
//                       src={n.image.url}
//                       alt={n.title.slice(0, 10)}
//                     />
//                   </td>
//                   <td className="py-6">
//                     <span className="capitalize">{n.category}</span>
//                   </td>
//                   <td className="py-6">
//                     <span>{convert(n.description.slice(0, 50))} ...</span>
//                   </td>
//                   <td className="py-6">
//                     <span>{n.date}</span>
//                   </td>
//                   <td className="py-6">
//                     {n.status === "pending" && (
//                       <span
//                         onClick={() => {
//                           updateStatus("active", n._id);
//                         }}
//                         className={`bg-blue-500 px-[10px] py-[8px] text-white cursor-pointer rounded-2xl`}
//                       >
//                         {n.status}
//                       </span>
//                     )}
//                     {n.status === "active" && (
//                       <span
//                         onClick={() => {
//                           updateStatus("deactive", n._id);
//                         }}
//                         className={`bg-green-500 px-[10px] py-[8px] text-white cursor-pointer rounded-2xl`}
//                       >
//                         {n.status}
//                       </span>
//                     )}
//                     {n.status === "deactive" && (
//                       <span
//                         onClick={() => {
//                           updateStatus("active", n._id);
//                         }}
//                         className={`bg-red-500 px-[10px] py-[8px] text-white cursor-pointer rounded-2xl`}
//                       >
//                         {n.status}
//                       </span>
//                     )}
//                   </td>
//                   <td className="py-6">
//                     <Link
//                       to={`/dashboard/news/news-single/${n._id}`}
//                       className="bg-green-500 float-left text-white p-1.5 rounded-md hover:bg-green-600"
//                     >
//                       <IoMdEye />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

import profile from "../../assets/images/profile.jpg";
import { Link, Links, useLocation, useParams } from "react-router";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import { base_url } from "../../config/config";
import { useState } from "react";
import { convert } from "html-to-text";
import toast from "react-hot-toast";

const WriterIndex = () => {
  // const [total_news, setTotal_news] = useState([]);
  const [news, setAllNews] = useState([]);
  const [allNews_data, setAllNews_data] = useState([]);
  const [parPage, setParPage] = useState(5);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pending_news, setPending_news] = useState([]);
  const [active_news, setActive_news] = useState([]);
  const [deactive_news, setDeactive_news] = useState([]);

  const { pathname } = useLocation();
  const { news_id } = useParams();

  const { store } = useContext(storeContext);

  const getNews = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/get-all-news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });

      const pendingNews = data.data.filter((n, i) => n.status === "pending");
      if (pendingNews.length > 0) {
        setPending_news(pendingNews);
      }

      const activeNews = data.data.filter((n, i) => n.status === "active");
      if (activeNews.length > 0) {
        setActive_news(activeNews);
      }

      const deactiveNews = data.data.filter((n, i) => n.status === "deactive");
      if (deactiveNews.length > 0) {
        setDeactive_news(deactiveNews);
      }

      setAllNews(data.data);
      setAllNews_data(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      const culculatedPages = Math.ceil(news.length / parPage);
      setPages(culculatedPages);
    }
  }, [news, parPage]);

  const serch_news = (e) => {
    const tempNews = allNews_data.filter(
      (n) => n.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );
    setAllNews(tempNews);
    setPage(1);
    setParPage(5);
  };

  const type_filter = (e) => {
    const tempNews = allNews_data.filter((n) => n.status === e.target.value);

    if (e.target.value === "") {
      setAllNews(allNews_data);
      setPage(1);
      setParPage(5);
    } else {
      setAllNews(tempNews);
      setPage(1);
      setParPage(5);
    }
  };

  const updateStatus = async (status, newsId) => {
    try {
      const { data } = await axios.put(
        `${base_url}/api/v1/update-status/${newsId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );

      getNews();

      toast.success("status successfully changed");
    } catch (error) {
      toast.error("api error");
    }
  };

  const deleteNews = async () => {
    try {
      const { data } = await axios.delete(
        `${base_url}/api/v1/delete-news/${news_id}`,
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );
      toast.success("news deleted successfully");

      // console.log("news deleted succefully: ", data);
    } catch (error) {
      console.log("server error: ", error);
    }
  };
  const path = `/dashboard/news/delete/${news_id}`;

  useEffect(() => {
    if (pathname === path) {
      deleteNews();
    }
  }, [pathname, path]);

  return (
    <div className=" p-4">
      <div className="grid grid-cols-4 gap-4 my-4">
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{news.length}</span>
          <span className="text-xl text-gray-500 capitalize">Total News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{pending_news.length}</span>
          <span className="text-xl text-gray-500 capitalize">Pending News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{active_news.length}</span>
          <span className="text-xl text-gray-500 capitalize">Active News</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{deactive_news.length}</span>
          <span className="text-xl text-gray-500 capitalize">
            Deactive News
          </span>
        </div>
        {/* <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-md h-[150px]">
          <span className="text-2xl font-bold">{writers}</span>
          <span className="text-xl text-gray-500 capitalize">Writers</span>
        </div> */}
      </div>

      <div className="flex gap-x-3">
        <select
          onChange={type_filter}
          className="outline-none border px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
          name=""
          id=""
        >
          <option value="">---Select type---</option>
          <option value="pending">Pending</option>
          <option value="active">Published</option>
          <option value="deactive">Deactive</option>
        </select>
        <input
          onChange={serch_news}
          className="outline-none border px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
          type="text"
          name=""
          id=""
          placeholder="Search news"
        />
      </div>

      <div className="py-8 text-start">
        <table className="w-full text-start">
          <thead className="">
            <tr className="uppercase">
              <th className="text-start px-3">No</th>
              <th className="text-start px-3">Title</th>
              <th className="text-start">Image</th>
              <th className="text-start">category</th>
              <th className="text-start">description</th>
              <th className="text-start">date</th>
              <th className="text-start">status</th>
              <th className="text-start">
                {store?.userInfo?.role === "admin" ? "view" : "aciton"}
              </th>
            </tr>
          </thead>

          <tbody className="p-[100px]">
            {news.length > 0 &&
              news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-6 px-3">
                    <span>{i + 1}</span>
                  </td>
                  <td className="py-6 px-3">
                    <span>{n.title.slice(0, 15)}...</span>
                  </td>
                  <td className="py-6">
                    <img
                      className="w-[50px] h-[50px] object-cover object-top"
                      src={n.image?.url || profile}
                      alt=""
                    />
                  </td>
                  <td className="py-6">
                    <span className="capitalize">{n.category}</span>
                  </td>
                  <td className="py-6">
                    <span>{convert(n.description).slice(0, 25)}...</span>
                  </td>
                  <td className="py-6">
                    <span>{n.date}</span>
                  </td>
                  {store?.userInfo?.role === "admin" ? (
                    <td className="py-6">
                      {n.status === "pending" && (
                        <span
                          onClick={() => {
                            updateStatus("active", n._id);
                          }}
                          className="bg-blue-500 px-[10px] py-[8px] text-white rounded-2xl"
                        >
                          {n.status}
                        </span>
                      )}

                      {n.status === "active" && (
                        <span
                          onClick={() => {
                            updateStatus("deactive", n._id);
                          }}
                          className="bg-green-500 px-[10px] py-[8px] rounded-2xl"
                        >
                          {n.status}
                        </span>
                      )}

                      {n.status === "deactive" && (
                        <span
                          onClick={() => {
                            updateStatus("active", n._id);
                          }}
                          className="bg-red-500 text-white px-[10px] py-[8px] rounded-2xl"
                        >
                          {n.status}
                        </span>
                      )}
                    </td>
                  ) : (
                    <td className="py-6">
                      {n.status === "pending" && (
                        <span className="bg-blue-500 px-[10px] py-[8px] rounded-2xl text-white">
                          {n.status}
                        </span>
                      )}

                      {n.status === "active" && (
                        <span className="bg-green-500 px-[10px] py-[8px] rounded-2xl">
                          {n.status}
                        </span>
                      )}

                      {n.status === "deactive" && (
                        <span className="bg-red-500 px-[10px] py-[8px] rounded-2xl">
                          {n.status}
                        </span>
                      )}
                    </td>
                  )}
                  <td className="py-6">
                    <Link
                      to={`/dashboard/news/news-single/${n._id}`}
                      className="bg-green-500 float-left text-white p-1.5 rounded-md hover:bg-green-600"
                    >
                      <IoMdEye />
                    </Link>
                    {store?.userInfo?.role === "writer" && (
                      <>
                        <Link
                          to={`/dashboard/news/edit/${n._id}`}
                          className="bg-yellow-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-yellow-600"
                        >
                          <FiEdit />
                        </Link>
                        <Link
                          to={`/dashboard/news/delete/${n._id}`}
                          className="bg-red-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-red-600"
                        >
                          <MdDelete />
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-10">
        <div className="flex items-center justify-center gap-3">
          <p className="text-lg">News Per Page</p>
          <select
            onChange={(e) => {
              setParPage(parseInt(e.target.value));
              setPage(1);
            }}
            value={parPage}
            className="outline-none border px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
            name=""
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div className="flex items-center justify-center gap-3 text-lg">
          <p className="text-lg">
            {(page - 1) * parPage + 1}/ {news.length} - of {pages}
          </p>
          <div className="flex justify-center items-center">
            <RiArrowLeftSLine
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
              className="cursor-pointer text-2xl"
            />
            <RiArrowRightSLine
              onClick={() => {
                if (page < pages) setPage(page + 1);
              }}
              className="cursor-pointer text-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterIndex;
