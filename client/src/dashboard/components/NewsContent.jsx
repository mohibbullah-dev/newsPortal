import profile from "../../assets/images/profile.jpg";
import { Link, Links } from "react-router";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
const NewsContent = () => {
  return (
    <div className=" p-4">
      <div className="flex gap-x-3">
        <select
          className="outline-none border px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
          name=""
          id=""
        >
          <option value="">---Select type---</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>
        <input
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
            <tr className="border-b border-gray-100">
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
                <Link className="bg-yellow-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-yellow-600">
                  <FiEdit />
                </Link>
                <Link className="bg-red-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-red-600">
                  <MdDelete />
                </Link>
              </td>
            </tr>

            <tr className="border-b border-gray-100 ">
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
                  Deactive
                </span>
              </td>

              <td className="py-6">
                <Link className="bg-green-500 float-left text-white p-1.5 rounded-md hover:bg-green-600">
                  <IoMdEye />
                </Link>
                <Link className="bg-yellow-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-yellow-600">
                  <FiEdit />
                </Link>
                <Link className="bg-red-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-red-600">
                  <MdDelete />
                </Link>
              </td>
            </tr>
            <tr className="border-b border-gray-100 ">
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
                  Deactive
                </span>
              </td>

              <td className="py-6">
                <Link className="bg-green-500 float-left text-white p-1.5 rounded-md hover:bg-green-600">
                  <IoMdEye />
                </Link>
                <Link className="bg-yellow-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-yellow-600">
                  <FiEdit />
                </Link>
                <Link className="bg-red-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-red-600">
                  <MdDelete />
                </Link>
              </td>
            </tr>

            <tr className="border-b border-gray-100 ">
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
                  Deactive
                </span>
              </td>

              <td className="py-6">
                <Link className="bg-green-500 float-left text-white p-1.5 rounded-md hover:bg-green-600">
                  <IoMdEye />
                </Link>
                <Link className="bg-yellow-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-yellow-600">
                  <FiEdit />
                </Link>
                <Link className="bg-red-500 ml-3 float-left text-white p-1.5 rounded-md hover:bg-red-600">
                  <MdDelete />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-10">
        <div className="flex items-center justify-center gap-3">
          <p className="text-lg">News Per Page</p>
          <select
            className="outline-none border px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
            name=""
            id=""
          >
            <option value="5">5</option>
            <option value="pending">10</option>
            <option value="active">20</option>
            <option value="deactive">30</option>
          </select>
        </div>

        <div className="flex items-center justify-center gap-3 text-lg">
          <p className="text-lg"> 6/22 - of 5</p>
          <div className="flex justify-center items-center">
            <RiArrowLeftSLine className="cursor-pointer text-2xl" />
            <RiArrowRightSLine className="cursor-pointer text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
