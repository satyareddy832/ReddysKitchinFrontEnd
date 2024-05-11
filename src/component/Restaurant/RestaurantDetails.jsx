import {
  Grid,
  Divider,
  Typography,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantCategory,
} from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian only", value: "vegetarian" },
  { label: "Non-Vegetarian only", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const menu = [1, 1, 1, 1, 1];
const RestaurantDetails = () => {
  const restaurant1 = {
    restaurant: {
      images: ["", "", ""],
      name: "Dummy",
      description: "Dummy Description",
    },
    categories: [],
  };
  const [foodType, setFoodType] = useState("all");
  const [categoryType, setCategoryType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(getRestaurantCategory({ jwt, restaurantId: id }));
  }, []);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        vegetarian: foodType==="vegetarian" ,
        nonveg:foodType==="non_vegetarian" ,
        seasonal: foodType==="seasonal",
        foodCategory: categoryType,
      })
    );
  }, [categoryType,foodType]);

  const { auth, restaurant, menu } = useSelector((state) => state);
  console.log("restauran", restaurant);
  console.log("menu is ", menu);

  let restDisplay;
  if (restaurant.restaurant === null) {
    restDisplay = restaurant1;
  } else {
    restDisplay = restaurant;
  }

  const handleFilter = (e) => {
    setFoodType(e.target.value);
    console.log(e.target.value)
  };
  const handleCategoryType = (e) => {
    setCategoryType(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3>Home/india/{restDisplay.restaurant.name}/3</h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[50vh] object-cover"
                src={restDisplay.restaurant.images[0]}
                alt=""
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restDisplay.restaurant.images[1]}
                alt=""
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restDisplay.restaurant.images[2]}
                alt=""
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">
            {restDisplay.restaurant.name}
          </h1>
          <p className="text-gray-500 flex items-center gap-3">
            <span>{restDisplay.restaurant.description}</span>
          </p>
          <p className="text-gray-500 flex items-center gap-3 mt-1">
            <LocationOnIcon />
            <span>AndhraPradesh,India</span>
          </p>
          <p className="text-gray-500 flex items-center gap-3 mt-1">
            <AccessTimeIcon />
            <span>Mon-Sun 9.00 AM - 9.00 PM(Today) </span>
          </p>
        </div>
      </section>

      <Divider />

      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  name="food_type"
                  onChange={handleFilter}
                  value={foodType}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  name="food_category"
                  onChange={handleCategoryType}
                  value={categoryType}
                >
                  <FormControlLabel
                      key={99900}
                      value={""}
                      control={<Radio />}
                      label={"All"} 
                    />
                  
                  {restaurant.categories.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:w-[80%] lg:-10">
          {menu.menuItems.map((item) => {
            return <MenuCard item={item} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
