import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";

// const demo = [
//   {
//     category: "Nuts & Seeds",
//     ingredients: ["Cashews"],
//   },
//   {
//     category: "Protein",
//     ingredients: ["Ground Beef", "Bacon strips"],
//   },
// ];

function transformInputToDemoFormat(input) {
  // Create an empty object to store category mapping
  const categoryMap = {};

  // Iterate through each item in the input array
  input.forEach((item) => {
    const { name, category } = item;

    // Check if the category already exists in the map
    if (!categoryMap[category.name]) {
      // If not, initialize a new category entry
      categoryMap[category.name] = {
        category: category.name,
        ingredients: [],
      };
    }

    // Add ingredient to the corresponding category
    categoryMap[category.name].ingredients.push(name);
  });

  // Convert the category map object to an array of category objects
  const result = Object.values(categoryMap);

  return result;
}

const MenuCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const handleCheckBoxChange = (value) => {
    if (selectedIngredients.includes(value)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== value)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, value]);
    }
  };
  const handleAddItemTocart = () => {
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("request Data is ", reqData);
  };

  const demo = transformInputToDemoFormat(item.ingredients);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "20px" }}>
            <img
              src={item.images[0]}
              alt="Burger"
              style={{ width: "100px", height: "100px", borderRadius: "8px" }}
            />
          </div>
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {item.name}
            </h3>
            <p style={{ fontSize: "16px", color: "#555", marginBottom: "5px" }}>
              {item.price} rs
            </p>
            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
              {item.description}
            </p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {demo.map((item, index) => (
              <div key={index} style={{ minWidth: "200px" }}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {item.category}
                </p>
                <FormGroup>
                  {item.ingredients.map((ingredient, idx) => (
                    <FormControlLabel
                      key={ingredient}
                      control={
                        <Checkbox
                          onChange={() => handleCheckBoxChange(ingredient)}
                        />
                      }
                      label={ingredient}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div>
            <Button
              onClick={handleAddItemTocart}
              variant="contained"
              disabled={false}
            >
              {item.available ? "Add To Cart" : "Out Of Stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
