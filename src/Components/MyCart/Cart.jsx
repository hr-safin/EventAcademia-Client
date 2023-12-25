import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../AuthContext/AuthContext";
import AllCart from "./AllCart";
import HashLoader from "react-spinners/HashLoader";
import UseAxiosSecure from "../Hook/UseAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const [isLoading, setLoading] = useState("loading");
  window.scrollTo(0, 0);

  const { user } = useContext(AuthProvider);
  const [shoppingCart, setCart] = useState([]);
  const axiosSecure = UseAxiosSecure()

  useEffect(() => {
    axiosSecure
      .get(`/cart/${user?.email}`)
      .then(res => {
        console.log(res.data);
        setCart(res.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axiosSecure.delete(`/cart/${id}`)
      .then(res => {
        console.log(res.data)
        const deleted = shoppingCart.filter((item) => item._id !== id);
        setCart(deleted);
        if(res.data.deletedCount > 0){
            toast.success("Remove From The Cart", {
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
      });
  };
  return isLoading ? (
    <div className=" bg-white  dark:bg-slate-900 h-screen items-center flex justify-center">
      <HashLoader color="#1E88E5" />
    </div>
  ) : (
    <div className=" dark:bg-slate-900 bg-white">
      <h2 className=" text-3xl pt-36 text-center dark:text-gray-400 text-gray-800">
        My Shopping Cart
      </h2>
      {shoppingCart.length > 0 ? (
        <div className=" grid-cols-1 grid gap-8 place-items-center px-6  pb-28 pt-12">
          {shoppingCart.map((data) => (
            <AllCart handleDelete={handleDelete} data={data} key={data._id} />
          ))}
        </div>
      ) : (
        <div className=" h-[70vh] flex items-center justify-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7236766-5875081.png?f=webp"
            alt=""
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
