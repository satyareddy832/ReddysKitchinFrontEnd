import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Twitter } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../component/State/Restaurant/Action";

const RestaurantDetails = () => {
  const { restaurant } = useSelector((store) => store);
  console.log("Restttttt is", restaurant.usersRestaurant);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({restaurantId:restaurant.usersRestaurant?.id,jwt:jwt}));
  };
  return (
    <div className="lg:px-20 px-5">
      <div className="flex place-items-center">
        <h1 className="pl-64 text-2xl">{restaurant.usersRestaurant?.name}</h1>

        <div className="pl-72">
          <Button
            color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
            variant="contained"
            onClick={handleRestaurantStatus}
          >
            {restaurant.usersRestaurant?.open ? "close" : "open"}
          </Button>
        </div>
      </div>
      <Grid container spacing={2} className="pt-2">
        <Grid item xs={12}>
          <Card>
            <CardHeader title={"Restaurant"} />
            <CardContent>
              <div>
                <div className="flex">
                  <p className="w-48 ">Owner </p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant.owner.fullName}
                  </p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">Restaurant Name </p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">{restaurant.usersRestaurant?.name}</p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">Cusine Type </p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">Opening Hours</p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">Status</p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-500 text-gray-950">
                        Open{" "}
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-500 text-gray-50">
                        Close
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={"Address"} />
            <CardContent>
              <div>
                <div className="flex">
                  <p className="w-48 ">Country </p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.address?.country}
                  </p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">City</p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.address?.city}
                  </p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">Postal Code</p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.address?.postalCode}
                  </p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">Street Address</p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.address?.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={"Contact"} />
            <CardContent>
              <div>
                <div className="flex">
                  <p className="w-48 ">Email </p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.contactInformation.email}
                  </p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">Mobile</p>
                  <p>
                    <span> - </span>
                  </p>
                  <p className="pl-5">
                    {restaurant.usersRestaurant?.contactInformation.mobile}
                  </p>
                </div>
                <div className="flex pt-5">
                  <p className="w-48">Social</p>
                  <div>
                    <span> - </span>
                    <a href="http://localhost:3000/admin/restaurant/details" className="pl-4">
                      <InstagramIcon />
                    </a>
                    <a href="http://localhost:3000/admin/restaurant/details" className="pl-4">
                      <FacebookIcon />
                    </a>
                    <a href="http://localhost:3000/admin/restaurant/details" className="pl-4">
                      <LinkedInIcon />
                    </a>
                    <a href="http://localhost:3000/admin/restaurant/details" className="pl-4">
                      <Twitter />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDetails;
