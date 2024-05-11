import React from "react";
import { Button, Card, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card style={addressCardStyle}>
      <HomeIcon fontSize="large" />
      <div style={addressContentStyle}>
        <Typography variant="h6">Home</Typography>
        <Typography variant="body1">
          Guntur, New Shivam, Gokuldham Market, 522017, Andhra Pradesh
        </Typography>
        {showButton && (
          <Button
            variant="contained"
            onClick={() => handleSelectAddress(item)}
            style={selectButtonStyle}
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

const addressCardStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  marginBottom: "10px",
};

const addressContentStyle = {
  marginLeft: "10px",
};

const selectButtonStyle = {
  marginTop: "10px",
};

export default AddressCard;
