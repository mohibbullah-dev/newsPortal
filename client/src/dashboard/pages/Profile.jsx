import React from "react";
import { useContext } from "react";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router";
import { storeContext } from "../../context/storeContext";
import { useState } from "react";
import axios from "axios";
import { base_url } from "../../config/config";
import { useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import { FiSave } from "react-icons/fi";
import toast from "react-hot-toast";
toast;

const Profile = () => {
  const { store, dispatch } = useContext(storeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");

  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const Me = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/me/${store.userInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      console.log("result of Me in profile: ", data.data.image.url);
      setName(data.data.name);
      setEmail(data.data.email);
      setCategory(data.data.category);
      setRole(data.data.role);
      setImg(data.data.image.url);
      setOldImage(data.data.image.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Me();
  }, []);

  const imageHandler = (e) => {
    const file = e.target?.files?.[0];

    if (file) {
      setImg(URL.createObjectURL(file));
      setImage(file);
    } else {
      return;
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("oldImage", oldImage);
    formData.append("newImage", image);

    try {
      setLoading(true);
      const { updata } = await axios.put(
        `${base_url}/api/v1/profileUpade/${store.userInfo.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${store.token}` },
        }
      );
      setLoading(false);

      toast.success("profile updated");
    } catch (error) {
      setLoading(false);

      toast.error(error?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex bg-white rounded-md justify-center items-center">
        <form
          onSubmit={updateProfile}
          className="flex bg-white rounded-md justify-center items-center"
          action=""
        >
          <div className="flex gap-3 items-start justify-center p-7 flex-col">
            <label
              htmlFor="img"
              className="border  border-gray-200 border-dashed w-[150px] h-[150px] flex flex-col items-center justify-center cursor-pointer gap-3"
            >
              {img && (
                <>
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={img}
                    alt=""
                  />
                </>
              )}
            </label>
            <input
              className="hidden"
              type="file"
              name="img"
              id="img"
              onChange={imageHandler}
            />
            <div className="flex gap-2 items-center justify-between">
              <button className="flex cursor-pointer items-center text-xl py-1 bg-indigo-500 hover:bg-indigo-600 px-2 rounded-md text-white">
                {loading ? "updaing..." : "updata"}
              </button>

              <p
                // onClick={() => setIsEditing(true)}
                className="bg-indigo-500 px-2 flex items-center gap-2 cursor-pointer text-xl rounded-md hover:bg-indigo-600 text-white py-1.5"
              >
                {/* {isEditing? "update": ""} */}
                {isEditing ? (
                  <FiSave onClick={() => setIsEditing(false)} />
                ) : (
                  <TbEdit onClick={() => setIsEditing(true)} />
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start">
            <div className="group flex items-center justify-between">
              <label htmlFor="name" className="text-xl font-semibold">
                Name:
              </label>
              {isEditing ? (
                <input
                  className="ml-2.5 pl-1.5 border-none border-amber-400 outline-1 outline-blue-500 rounded-sm"
                  type="text"
                  name="name"
                  id="name"
                  // onBlur={() => setIsEditing(false)}
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <span className="text-xl ml-2">{name}</span>
              )}
            </div>

            <div className="group flex items-center justify-between">
              <label htmlFor="email" className="text-xl font-semibold">
                Email:
              </label>
              {isEditing ? (
                <input
                  className="ml-2.5 pl-1.5 border-none border-amber-400 outline-1 outline-blue-500 rounded-sm"
                  type="email"
                  name="email"
                  id="email"
                  // onBlur={() => setIsEditing(false)}
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <span className="text-xl ml-2">{email}</span>
              )}
            </div>

            <p className="text-xl font-semibold">
              Category: <span className="ml-2.5 font-normal">{category}</span>
            </p>
            <p className="text-xl font-semibold">
              Status: <span className="ml-2.5 font-normal">{role}</span>
            </p>
          </div>
        </form>
      </div>

      <div className="flex flex-col bg-white rounded-md justify-center items-center">
        <p className="text-center text-xl pt-4">Change password</p>
        <form className="flex flex-col gap-4 w-full p-5" action="">
          <div className="grid gap-4">
            <div className="flex min-w-full flex-col items-start gap-1">
              <label className="text-xl text-gray-500" htmlFor="oldpassword">
                Old password
              </label>
              <input
                className="outline-none border min-w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="text"
                name="oldpassword"
                id="oldpassword"
                placeholder="Old-password"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl text-gray-500" htmlFor="newpassword">
                New password
              </label>
              <input
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="newpassword"
                name="newpassword"
                id="newpassword"
                placeholder="New-password"
              />
            </div>
          </div>

          <div>
            <Link className="text-xl py-1.5 bg-indigo-500 hover:bg-indigo-600 px-2 rounded-md text-white">
              Change password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
