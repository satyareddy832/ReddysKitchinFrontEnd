import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../component/State/Ingredients/Action";

const CreateIngredientForm = () => {
  const {restaurant,ingredients}=useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
      name:formData.name,
      categoryId:formData.ingredientCategoryId,
      restaurantId:restaurant.usersRestaurant?.id
    }
    console.log("data.....", data);
    dispatch(createIngredient({data,jwt}))
  };
  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: "",
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
            id="name"
            name="name"
            label="Ingredient Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          />
          <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Food Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.ingredientCategoryId}
                  label="Category"
                  onChange={handleInputChange}
                  name="ingredientCategoryId"
                >
                  {
                    ingredients.category.map(item=><MenuItem value={item.id}>{item.name}</MenuItem>)
                  }
                  
                </Select>
              </FormControl>
          <Button variant="contained" type="submit">
            Create Ingredient
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
