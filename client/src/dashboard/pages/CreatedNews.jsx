import React, { useState } from "react";
import { Link } from "react-router";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";
import Gellary from "../components/Gellary";

const CreatedNews = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-white rounded-md p-4">
      <div className="bg-white flex justify-between items-center text-lg rounded-sm pb-4">
        <h2 className="text-2xl text-black font-semibold">Add news</h2>
        <Link
          className="bg-blue-500 rounded-sm text-white px-3 py-2 hover:bg-blue-600"
          to="/dashboard/news"
        >
          News
        </Link>
      </div>

      <div className="">
        <form action="" className="flex flex-col gap-6">
          <div className="flex min-w-full flex-col items-start gap-1">
            <label className="text-xl text-gray-500" htmlFor="title">
              Title
            </label>
            <input
              className="outline-none border min-w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
              type="text"
              name="title"
              id="title"
              placeholder="title"
            />
          </div>

          <div className="flex items-start justify-center flex-col">
            <label
              htmlFor="img"
              className="border border-gray-200 hover:border-3 border-dashed w-full h-[180px] flex flex-col items-center justify-center cursor-pointer gap-3"
            >
              <span>
                <MdCloudUpload className="text-4xl" />
              </span>
              <span className="text-lg">Select Image</span>
            </label>
            <input className="hidden" type="file" name="img" id="img" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-start gap-3">
              <span>Descritpion</span>
              <MdCloudUpload
                onClick={() => setShow(true)}
                className="text-3xl cursor-pointer"
              />
            </div>
            <JoditEditor />
            {show && <Gellary setShow={setShow} images={[]} />}
          </div>

          <div>
            <Link
              className="bg-blue-500 rounded-sm text-white px-3 py-2 hover:bg-blue-600 text-lg"
              to=""
            >
              Add news
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatedNews;
