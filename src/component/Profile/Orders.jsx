import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersOrders } from "../State/Order/Action";

const Orders = () => {

  const {auth,order}=useSelector(store=>store)
  const jwt=localStorage.getItem("jwt")
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getUsersOrders(auth.jwt || jwt))
  },[auth.jwt])

  console.log(order.orders)



  return (
    <div>
      <div>
        <center><h1>My Orders</h1></center>
        
        <div>
          {
            order.orders.map((order)=>order.items.map(item=><OrderCard item={item} order={order}/>))
          }
        </div>
      </div>
    </div>
  );
};

export default Orders;
