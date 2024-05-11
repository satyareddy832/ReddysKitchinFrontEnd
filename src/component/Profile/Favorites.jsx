import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
  // Define styles as an object
  const styles = {
    container: {
      padding: "20px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "white",
      marginBottom: "20px",
      textAlign: "center",
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    cardItem: {
      width: "30%", // Adjust card width to fit three cards per row
      margin: "10px",
    },
  };

  const {auth}=useSelector(state=>state)
  

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Favorites</h1>
      <div style={styles.cardContainer}>
        {auth.favorites.map((item, index) => (
          <div key={index} style={styles.cardItem}>
            <RestaurantCard item={item}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
