import React from "react";
import { RxCross2 } from "react-icons/rx";
import { MdCloudUpload } from "react-icons/md";
const Gellary = ({ setShow, images }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-[9999] flex items-center justify-center">
      <div className="w-full h-full relative">
        <div className="w-full h-full absolute opacity-80 bg-gray-400 top-0 left-0 z-[998]">
          {" "}
        </div>
        <div
          className="absolute w-[50%] h-[85vh] z-[999] top-[50%]
         opacity-100 left-[50%] bg-white rounded-md -translate-x-[50%] -translate-y-[50%]"
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl">Gellary</h2>
            <span
              onClick={() => setShow(false)}
              className="text-2xl cursor-pointer"
            >
              <RxCross2 />
            </span>
          </div>

          <div className="flex items-start justify-center flex-col px-4">
            <label
              htmlFor="img"
              className={`border border-gray-200 hover:border-3 rounded-md border-dashed w-full h-[180px] flex flex-col items-center justify-center cursor-pointer gap-3`}
            >
              <span>
                <MdCloudUpload className="text-4xl" />
              </span>
              <span className="text-lg">Select Image</span>
            </label>
            <input className="hidden" type="file" name="img" id="img" />
          </div>

          <div className="grid grid-cols-4 gap-x-2 px-4">
            <div>fsdf</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gellary;
