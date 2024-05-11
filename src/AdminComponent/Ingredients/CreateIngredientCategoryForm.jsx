import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../component/State/Ingredients/Action";

const CreateIngredientCategoryForm = () => {
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {restaurant}=useSelector(store=>store);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data.....", formData);
    const data={name:formData.name,restaurantId:restaurant.usersRestaurant?.id}
    dispatch(createIngredientCategory({data:data,jwt}))
  };
  const [formData, setFormData] = useState({
    name: ""
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
        <h1 className="text-center">Create Ingredient Category</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Category Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          />
          <Button variant="contained" type="submit">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
