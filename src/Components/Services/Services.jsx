import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import SkeletonService from "./SkeletonService";
import UseAxiosSecure from "../Hook/UseAxiosSecure";
const Services = () => {
//   window.scrollTo(0, 0);
  const [display, setDisplay] = useState([]);
  const [isLoading, setLoading] = useState("loading");
  const axiosSecure = UseAxiosSecure()
  useEffect(() => {
    axiosSecure.get("/events")
    .then(res => {
      console.log(res.data);
      setDisplay(res.data);
      setLoading(false);
    });
  }, []);

  console.log(display);
  return (
    <div className="dark:bg-slate-900 bg-white">
      <div className=" text-center ">
        <h2 className=" text-2xl text-indigo-600 tracking-widest font-bold ">
          Our Service
        </h2>
      </div>

      <div className=" flex justify-end lg:px-28 px-6 pt-16 pb-8">
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className=" bg-indigo-700 text-white  px-4 py-3 rounded-lg cursor-pointer m-1">
            Sort By Price
          </label>
          
        </div>
      </div>
      {isLoading ? (
        <div>
          <SkeletonService />
        </div>
      ) : (
        <div className="lg:px-28 dark:bg-slate-900 px-6 pt-8 pb-16 bg-white place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {display.map((data) => (
            <ServiceCard data={data} key={data.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
