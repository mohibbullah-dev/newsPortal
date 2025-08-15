import React, { useContext, useState } from "react";
import dash_logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router";
import { base_url } from "../../config/config";
import axios from "axios";
import toas from "react-hot-toast";
import { storeContext } from "../../context/storeContext";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const { dispatch } = useContext(storeContext);
  const navigate = useNavigate();

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(`${base_url}/api/v1/login`, state);
      setLoader(false);
      localStorage.setItem("newsToken", data.token);
      toas.success(data.message);
      dispatch({
        type: "login_succefull",
        payload: {
          token: data.token,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      setLoader(false);
      toas.error(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-200 flex items-center justify-center">
      <div className="w-[400px] h-[350px] bg-white rounded-md p-4 flex flex-col gap-12">
        <div className=" flex items-center justify-center">
          <img className=" w-[250px]" src={dash_logo} alt="" />
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex min-w-full flex-col items-start gap-1">
            <label className="text-lg text-gray-500" htmlFor="email">
              Email
            </label>
            <input
              onChange={inputHandle}
              value={state.email}
              className="outline-none border min-w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
            />
          </div>

          <div className="flex min-w-full flex-col items-start gap-1">
            <label className="text-lg text-gray-500" htmlFor="title">
              Password
            </label>
            <input
              onChange={inputHandle}
              value={state.password}
              className="outline-none border min-w-full px-3 py-2 rounded-sm border-gray-200 focus:border-indigo-200"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
            />
          </div>

          <button className="bg-blue-500 cursor-pointer text-center w-full rounded-sm text-white px-3 py-2 hover:bg-blue-600">
            {loader === true ? "loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
