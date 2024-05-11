import { Box, Card, CardHeader, IconButton, Modal } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Create } from "@mui/icons-material";
import CreateFoodCategory from "./CreateFoodCategory";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantCategory } from "../../component/State/Restaurant/Action";


const orders = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const FoodCategoryTable = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch=useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const jwt=localStorage.getItem('jwt');
  const handleClose = () => setOpen(false);
  useEffect(()=>{
    // dispatch(getRestaurantById());
    // dispatch(getMenuItemsByRestaurantId());
    dispatch(getRestaurantCategory({jwt:jwt,restaurantId:restaurant.usersRestaurant?.id}));
  }
  ,[]);
  

  console.log(restaurant.categories);

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpen}>
              <Create />
            </IconButton>
          }
          title={"Food Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((cat,index) => (
                <TableRow
                  key={cat.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align="center" >{cat.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategory/>
        </Box>
      </Modal>
    </Box>
  );
};

export default FoodCategoryTable;
