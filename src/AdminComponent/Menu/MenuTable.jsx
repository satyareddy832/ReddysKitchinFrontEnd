import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Create, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability,
} from "../../component/State/Menu/Action";

const orders = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const MenuTable = () => {
  const navigate = useNavigate();
  const { restaurant, ingredients, menu } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [delstate,SetDelstate]=useState(true);
  const handleDeleteItem=(foodId)=>{
    dispatch(deleteFoodAction({foodId,jwt}));
    SetDelstate(foodId);

  }

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant?.id,
        jwt: jwt,
      })
    );
  }, [delstate]);

  const handleUpdateStoke = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId: foodId, jwt }));
  };
  
  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")}>
              <Create />
            </IconButton>
          }
          title={"Menu Items"}
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Availability</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className="items-center"
                    component="th"
                    scope="row"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={item.images[0]}
                    ></img>
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    {item.ingredients?.map((ingredient, index) => (
                      <React.Fragment key={index}>
                        {index % 3 === 0 && index !== 0 && <br />}
                        <Chip label={ingredient.name} />
                      </React.Fragment>
                    ))}
                  </TableCell>
                  <TableCell align="center">{item.price} rs</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleUpdateStoke(item.id)}>
                      {item.available ? "In Stoke" : "Out Of Stoke"}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={()=>handleDeleteItem(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
