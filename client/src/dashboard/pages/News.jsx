import React from "react";
import { Link } from "react-router";
import NewsContent from "../components/NewsContent";

const News = () => {
  const userInfo = {
    role: "admin",
  };
  return (
    <div className="bg-white">
      <div className="bg-white p-4 flex justify-between items-center text-xl rounded-sm">
        <h2 className="text-2xl text-black font-semibold">News</h2>
        {userInfo.role !== "admin" && (
          <Link
            className="bg-blue-500 rounded-sm text-white px-3 py-2 hover:bg-blue-600"
            to="/dashboard/news/create"
          >
            Create
          </Link>
        )}
      </div>
      <NewsContent />
    </div>
  );
};

export default News;
