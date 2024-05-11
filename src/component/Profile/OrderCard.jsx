import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = ({item,order}) => {
  return (
    <Card sx={cardStyle}>
      <div style={contentContainer}>
        <img
          src={item.food.images[0]}
          alt="Biryani"
          style={imageStyle}
        />

        <div style={textContainer}>
          <p style={itemName}>{item.food.name}</p>
          <p style={itemPrice}>{item.totalPrice} rs</p>
        </div>

        <div style={buttonContainer}>
          <Button  >
            {order.orderStatus}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Styles
const cardStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  height: "100%",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

const contentContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", // Aligns items to opposite ends
};

const imageStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  marginRight: "16px",
};

const textContainer = {
  flex: 1,
};

const itemName = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "8px",
};

const itemPrice = {
  fontSize: "16px",
  color: "#666",
};

const buttonContainer = {
  marginLeft: "auto", // Pushes the button to the opposite side
};



export default OrderCard;
