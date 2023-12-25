import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthProvider } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://server-event-academia.vercel.app",
});

const UseAxiosSecure = () => {
  return axiosSecure;
};

export default UseAxiosSecure;
