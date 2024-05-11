import React from "react";
import { Chip, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem } from "../State/Cart/Action";

const CartItem = ({ item }) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "300px", // Adjust the width as needed
  };

  const imageStyle = {
    width: "80px", // Adjust the image width
    height: "80px", // Adjust the image height
    borderRadius: "8px",
    marginRight: "20px",
  };

  const itemDetailsStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const quantityContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const quantityStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    marginLeft: "10px",
  };

  const priceStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  };

  const chipContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  };

  const { cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id, jwt: jwt }));
  };

  const handleUpdateCart = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
    }
    dispatch(updateCartItem({data:{cartItemId:item.id,quantity:item.quantity+value},jwt:jwt}));

  };

  return (
    <div style={containerStyle}>
      <img src={item.food.images[0]} alt="" style={imageStyle} />
      <div style={itemDetailsStyle}>
        <div style={{ marginBottom: "5px" }}>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
            {item.food.name}
          </p>
          <div style={quantityContainerStyle}>
            <IconButton onClick={()=>handleUpdateCart(-1)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
            <span style={quantityStyle}>{item.quantity}</span>
            <IconButton onClick={()=>handleUpdateCart(1)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        </div>
        <p style={priceStyle}>{item.food.price * item.quantity} rs</p>
        <div style={chipContainerStyle}>
          {item.ingredients.map((item, index) => (
            <Chip key={index} label={item} size="small" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
