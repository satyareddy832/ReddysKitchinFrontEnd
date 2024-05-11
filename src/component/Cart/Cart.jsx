import React from "react";
import { Divider, Modal, TextField, Grid } from "@mui/material";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";

const items = [1, 1];

const Cart = () => {
  const [open, setOpen] = useState(false);

  const handleOpenAddressModal = () => {
    setOpen(true);
  };

  const { cart ,auth} = useSelector((store) => store);
  const handleClose = () => setOpen(false);

  const dispatch=useDispatch();
  const handleSubmit = (values) => {
    // Implement your form submission logic here
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,

        delivaryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "india",
        },
      },
    };
    dispatch(createOrder(data))
  };

  console.log("cartItems isssss", cart);

  return (
    <div style={cartContainerStyle}>
      {/* Left Section (CartItems) */}
      <div style={leftSectionStyle}>
        {cart.cartItems.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>

      {/* Right Section (Address Cards and Bill Details) */}
      <div style={rightSectionStyle}>
        <div style={addressContainerStyle}>
          <h2>Choose Delivery Address</h2>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Grid key={item} item xs={6} sm={4} md={3}>
                <AddressCard
                  item={item}
                  showButton={true}
                  handleSelectAddress={() => {
                    // Implement address selection logic here
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Card>
            <div style={addNewAddressStyle}>
              <h2>Add New Address</h2>
              <Button variant="contained" onClick={handleOpenAddressModal}>
                Add
              </Button>
            </div>
          </Card>
        </div>

        <div style={billDetailsContainerStyle}>
          <h2>Bill Details</h2>
          <div style={billDetailsStyle}>
            <div style={billDetailItemStyle}>
              <p>Item Total</p>
              <p>{cart.cart?.total} rs</p>
            </div>
            <div style={billDetailItemStyle}>
              <p>Delivery Fee</p>
              <p>50 rs</p>
            </div>
            <div style={billDetailItemStyle}>
              <p>GST and Restaurant Charges</p>
              <p>50 rs</p>
            </div>
            <Divider />
            <div style={billDetailItemStyle}>
              <p>Total Pay</p>
              <p>{cart.cart?.total + 100} rs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Formik
            initialValues={{
              streetAddress: "",
              state: "",
              pincode: "",
              city: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit">
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

const cartContainerStyle = {
  display: "flex",
  alignItems: "flex-start",
  padding: "20px",
};

const leftSectionStyle = {
  flex: "1",
  marginRight: "20px",
};

const rightSectionStyle = {
  minWidth: "30%", // Set a minimum width for the right section
  marginTop: "20px", // Space between left and right sections
};

const addressContainerStyle = {
  marginBottom: "20px",
};

const billDetailsContainerStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  marginTop: "20px",
};

const billDetailsStyle = {
  width: "100%", // Ensure full width within the bill details container
};

const billDetailItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px",
};

const addNewAddressStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Cart;
