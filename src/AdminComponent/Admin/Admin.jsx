import React, { useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Orders from "../Orders/Orders";
import Menu from "../Menu/Menu";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import RestaurantDetails from "./RestaurantDetails";
import "./Admin.css"; // Import the CSS file for Admin component
import CreateMenuForm from "../Menu/CreateMenuForm";
import { getRestaurantById, getRestaurantCategory } from "../../component/State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../../component/State/Menu/Action";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../component/State/Order/Action";
import { fetchRestaurantsOrder } from "../../component/State/RestaurantOrder/Action";

const Admin = () => {
  const handleClose = () => {};
  const jwt=localStorage.getItem('jwt');
  const dispatch=useDispatch();
  const {restaurant} = useSelector(store=>store);
  useEffect(()=>{
    // dispatch(getRestaurantById());
    // dispatch(getMenuItemsByRestaurantId());
    dispatch(getRestaurantCategory({jwt:jwt,restaurantId:restaurant.usersRestaurant?.id}));
    dispatch(fetchRestaurantsOrder({
      restaurantId:restaurant.usersRestaurant?.id,
      jwt:jwt,
      
    }));

  },[]);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <AdminSideBar handleClose={handleClose} />
      </div>

      {/* Content Area */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/category" element={<FoodCategory />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/details" element={<RestaurantDetails />} />
          <Route path="/add-menu" element={<CreateMenuForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
