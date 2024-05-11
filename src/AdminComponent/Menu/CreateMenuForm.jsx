import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudnary } from "../util/UploadToCloudnary";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantCategory } from "../../component/State/Restaurant/Action";
import { getIngredientsOfRestaurant, updateStokeOfIngredient } from "../../component/State/Ingredients/Action";
import { createMenuItem } from "../../component/State/Menu/Action";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateMenuForm = () => {

  const {restaurant,ingredients}=useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");

  useEffect(()=>{
    dispatch(getRestaurantCategory({jwt:jwt,restaurantId:restaurant.usersRestaurant?.id}));
    dispatch(getIngredientsOfRestaurant({id:restaurant.usersRestaurant?.id,jwt:jwt}))
  }
  ,[]);

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
    console.log("came here to remove");
    console.log(
      "images are in remove-----",
      formik.values.images,
      updatedImages
    );
  };
  const [uploadImage, setUploadImage] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudnary(file);
    await formik.setFieldValue("images", [...formik.values.images, image]);

    setUploadImage(false);
    console.log("uploaded image is ", image);
    console.log("images are -----", formik.values.images);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = restaurant.usersRestaurant?.id;
      console.log("data ------$", values);
      dispatch(createMenuItem({menu:values,jwt:jwt}));
      
    },
  });
  return (
    <div className="py-10 lg:flex justify-center  min-h-screen">
      <div className="lg:max-4-4xl items-center">
        <h1 className="font-bold text-2xl text-center py-2 ">
          Add New Menu Item
        </h1>
        <form onSubmit={formik.handleSubmit} className="px-72">
          <Grid container spacing={2} className="items-center">
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
              />
              <label className="relative" htmlFor="fileInput">
                <span className="px-5 pl-5">
                  <AddPhotoAlternate />
                </span>
                {uploadImage && (
                  <div>
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap">
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative mr-4 mb-4">
                    <img
                      className="w-16 h-16 object-cover relative"
                      src={image}
                      alt={`Image ${index}`}
                    />
                    <IconButton
                      className="absolute top-24 left-12
             transform -translate-x-2 -translate-y-44"
                      onClick={() => handleRemoveImage(index)}
                      color="error"
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Food Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                  name="category"
                >
                  {
                    restaurant.categories.map(item=><MenuItem value={item}>{item.name}</MenuItem>)
                  }
                  
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">
                  Ingredients
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name="ingredients"
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  //   MenuProps={MenuProps}
                >
                  {ingredients.ingredients.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Is Vegetarian
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.vegetarian}
                  label="Vegetarian"
                  onChange={formik.handleChange}
                  name="vegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Is Seasonal
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.seasonal}
                  label="Seasonal"
                  onChange={formik.handleChange}
                  name="seasonal"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item className="pt-3 justify-center">
            <Button variant="contained" type="submit">
              Create Menu Item
            </Button>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
