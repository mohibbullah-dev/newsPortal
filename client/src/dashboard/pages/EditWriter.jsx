import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../config/config";
import { storeContext } from "../../context/storeContext";
import { CgProfile } from "react-icons/cg";

const EditWriter = () => {
  const [loader, setLoader] = useState(false);
  const { store } = useContext(storeContext);
  const navigate = useNavigate();

  const { writer_id } = useParams();

  const [oldImage, setOldImage] = useState("");
  const [img, setImg] = useState("");
  const [image, setImage] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  console.log("email: ", email);
  const [category, setCategory] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  const getWriter = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/edit-writer/${writer_id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      console.log("writers", data);
      if (Object.keys(data.writer)) {
        const { name, email, category } = data.writer;
        setName(name);
        setEmail(email);
        setCategory(category);
        setImg(data.writer.image.url);
        setOldImage(data.writer.image.url);
      }
    } catch (error) {
      console.log("server error", error);
    }
  };

  useEffect(() => {
    getWriter();
  }, []);

  const inputHandler = (e) => {
    const { files } = e.target;
    console.log("files", files);

    if (files.length > 0) {
      const file = e?.target?.files[0];

      setImg(URL.createObjectURL(file));
      if (file) {
        setImage(file);
      }
    }
  };

  const Submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avator", image);
      formData.append("oldImage", oldImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("category", category);
      formData.append("resetPassword", resetPassword);

      setLoader(true);
      const data = await axios.post(
        `${base_url}/api/v1/update-Writer/${writer_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      console.log("response", data);
      setLoader(false);
      toast.success("writer updated successfully");
      navigate("/dashboard/writers");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between">
        <span className="text-xl font-semibold">Add writers</span>
        <Link
          to="/dashboard/writers"
          className="text-xl font-semibold bg-fuchsia-700 hover:bg-fuchsia-800 py-1.5 px-2 rounded-md text-white"
        >
          Writers
        </Link>
      </div>

      <div className="mt-6">
        <form onSubmit={Submit} className="flex flex-col gap-4">
          <div className="flex flex-col items-center w-[100px] h-[100px] gap-1">
            <label
              className="text-xl h-full flex flex-col items-center gap-1.5 rounded-md justify-center w-full border border-dashed border-gray-200"
              htmlFor="file"
            >
              {!img ? (
                <>
                  <span>
                    <CgProfile className="text-2xl" />
                  </span>
                  <p className="text-sm">profile</p>
                </>
              ) : (
                <img className="object-cover w-full h-full" src={img} />
              )}
            </label>
            <input
              onChange={inputHandler}
              className="hidden"
              type="file"
              name="file"
              id="file"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="name">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="text"
                name="name"
                id="name"
                placeholder="name"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="category">
                Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                name="category"
                id="category"
              >
                <option className="capitalize" value={category}>
                  {category}
                </option>
                <option className="capitalize" value="education">
                  education
                </option>

                <option className="capitalize" value="traval">
                  traval
                </option>

                <option className="capitalize" value="health">
                  health
                </option>

                <option className="capitalize" value="internation">
                  internation
                </option>

                <option className="capitalize" value="sports">
                  sports
                </option>
                <option className="capitalize" value="technology">
                  technology
                </option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="email"
                name="email"
                id="email"
                placeholder="email"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="password">
                Password
              </label>
              <input
                onChange={(e) => setResetPassword(e.target.value)}
                value={resetPassword}
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="password"
                name="password"
                id="password"
                placeholder="Reset-password"
              />
            </div>
          </div>
          <div>
            <button className="text-xl font-semibold py-1.5 bg-indigo-500 hover:bg-indigo-600 px-2 rounded-md text-white">
              {loader === true ? "Loading..." : "update Writer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWriter;
