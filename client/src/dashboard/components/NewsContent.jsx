import profile from "../../assets/images/profile.jpg";
import { Link, Links, useLocation, useParams } from "react-router";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdViewSidebar } from "react-icons/md";
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

const NewsContent = () => {
  const [news, setAllNews] = useState([]);
  const [allNews_data, setAllNews_data] = useState([]);
  const [parPage, setParPage] = useState(5);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  const { pathname } = useLocation();
  const { news_id } = useParams();

  const { store } = useContext(storeContext);

  const getNews = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/v1/get-all-news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });

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

      console.log("status upadate: ", data);
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
      console.log("hello");
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

export default NewsContent;
