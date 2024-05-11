import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudnary } from "../util/UploadToCloudnary";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../component/State/Restaurant/Action";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "MON-SUN :9:00 AM - 12:00 PM",
  images: [],
};

const CreateRestaurantForm = () => {
  const handleRemoveImage = (index) => {
     const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
    console.log("came here to remove");
  };
  const dispatch=useDispatch();
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
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.postalCode,
          country: values.country,
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };
      console.log("data ------", data);
      dispatch(createRestaurant({token:localStorage.getItem("jwt"),data:data}));
    },
  });
  return (
    <div className="py-10 lg:flex justify-center  min-h-screen">
      <div className="lg:max-4-4xl items-center">
        <h1 className="font-bold text-2xl text-center py-2 ">
          Add New Restaurant
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
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                label="State/Province"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="postalCode"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="mobile"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>
          </Grid>
          <Grid item className="pt-3 justify-center">
            <Button variant="contained" type="submit">
              Create Restaurant
            </Button>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
