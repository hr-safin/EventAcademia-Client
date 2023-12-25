import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthProvider } from "../AuthContext/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import UseAxiosSecure from "../Hook/UseAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const {user} = useContext(AuthProvider)
  const [isLoading, setLoading] = useState("loading")
  const axiosSecure = UseAxiosSecure()
  window.scrollTo(0,0)
const [details, setDetail] = useState([])
  const {id} = useParams()
  console.log(id)
  useEffect(() => {
    axiosSecure.get("/events")
    .then(res => {
      console.log(res.data)
      const matchedData = res.data.find((item) => item._id === id);
      console.log(matchedData)
      setDetail(matchedData)
      setLoading(false)
    })
  }, [])

   const handleAddCart = () => {

    const email = user?.email
    const eventImage = details.event_image
    const eventName = details.event_name
    const eventPrice = details.event_price
    const eventDetails = details.short_description

    const cartInfo = {email, eventImage, eventName, eventPrice, eventDetails}

    axiosSecure.post("/cart", cartInfo)
    .then(res => {
       if(res.data.insertedId){
        toast.success("Added To Cart", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       }
    })
        
   }


  console.log(details)
  
  

  
  return isLoading ? <div className=' bg-white  dark:bg-slate-900 h-screen items-center flex justify-center'><HashLoader color="#1E88E5" /></div> :  (
    <div className=" bg-white dark:bg-slate-900 flex flex-col lg:h-[100vh] lg:px-28 lg:py-0 py-32 px-6 justify-center items-center">
    <div className="card lg:card-side  border dark:border-gray-800 border-gray-300">
  <figure><img className=" lg:h-[300px]" src={details.event_image} alt="Album"/></figure>
  <div className=" md:px-10 md:py-14 py-6 px-6">
    <h2 className="card-title text-2xl lg:text-4xl pb-4 text-gray-800 dark:text-gray-400">{details.event_name}</h2>
    <p className=" lg:w-[350px] text-gray-600 pb-4" >{details.short_description}</p>
    
    <div className="card-actions flex justify-between">
    <h2 className="card-title text-2xl text-indigo-600">Price : {details.event_price}</h2>
      <button onClick={handleAddCart} className=" bg-indigo-700 text-white px-4 py-2 rounded-md">Add To Cart</button>
      <ToastContainer />
    </div>
  </div>
</div>


    </div>
  );
};

export default Details;
