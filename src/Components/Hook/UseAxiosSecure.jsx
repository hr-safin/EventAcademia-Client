import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthProvider } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const UseAxiosSecure = () => {
  return axiosSecure;
};

export default UseAxiosSecure;
