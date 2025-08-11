import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../config/config";
import { storeContext } from "../../context/storeContext";

const AddWriter = () => {
  const [loader, setLoader] = useState(false);
  const { store } = useContext(storeContext);
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    category: "",
    password: "",
  });

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const data = await axios.post(`${base_url}/api/v1/addwriter`, state, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setLoader(false);
      console.log("data:", data);
      toast.success("addwriter successfully");
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
        <form onSubmit={Submit} className="flex flex-col gap-4" action="">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-1">
              <label className="text-xl" htmlFor="name">
                Name
              </label>
              <input
                onChange={inputHandler}
                value={state.name}
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
                onChange={inputHandler}
                value={state.category}
                required
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                name="category"
                id="category"
              >
                <option className="capitalize" value="">
                  ---Select category---
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
                onChange={inputHandler}
                value={state.email}
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
                onChange={inputHandler}
                value={state.password}
                required
                className="outline-none border w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </div>
          </div>
          <div>
            <button className="text-xl font-semibold py-1.5 bg-indigo-500 hover:bg-indigo-600 px-2 rounded-md text-white">
              {loader === true ? "Loading..." : "Add writer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWriter;
