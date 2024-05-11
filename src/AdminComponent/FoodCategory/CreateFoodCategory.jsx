import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../component/State/Restaurant/Action";

const CreateFoodCategory = () => {
  const { restaurant } = useSelector((store) => store);
  console.log("Restttttt is", restaurant.usersRestaurant);
  const jwt=localStorage.getItem('jwt');
  const dispatch=useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.categoryName,
      restaurantId: {
        id: restaurant.usersRestaurant?.id,
      },
    };
    dispatch(createCategoryAction({reqData:data,jwt:jwt}))
    console.log("data.....", data);
  };
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <div className="p-5">
        <h1 className="text-center">Create Food Category</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Category Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
          />
          <Button variant="contained" type="submit">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategory;
