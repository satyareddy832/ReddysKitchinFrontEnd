import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "../../component/State/RestaurantOrder/Action";

const order = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "ALL" },
];

const OrderTable = () => {
  const handleUpdateItemStatus = ({ status, id }) => {
    console.log("staya ", status, id);
    dispatch(
      updateOrderStatus({
        orderId: id,
        orderStatus: status,
        jwt: localStorage.getItem("jwt"),
      })
    );
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        restaurantId: restaurant.usersRestaurant?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  console.log(restaurantOrder?.orders);
  return (
    <Box>
      <Card>
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">ingredients</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder?.orders.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={item.items[0].food.images[0]}
                    ></img>
                  </TableCell>
                  <TableCell align="center">{item.customer.fullName}</TableCell>
                  <TableCell align="center">{item.totalPrice} rs</TableCell>
                  <TableCell align="center">
                    {item.items[0].food.name}
                  </TableCell>
                  <TableCell align="center">
                    {item.items[0].ingredients?.map((ingredient, index) => (
                      <React.Fragment key={index}>
                        {index % 3 === 0 && index !== 0 && <br />}
                        <Chip label={ingredient} />
                      </React.Fragment>
                    ))}
                  </TableCell>
                  <TableCell align="center">{item.orderStatus}</TableCell>
                  <TableCell align="center">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {order.map((status) => (
                        <MenuItem
                          onClick={() =>
                            handleUpdateItemStatus({
                              status: status.value,
                              id: item.id,
                            })
                          }
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
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

export default OrderTable;
