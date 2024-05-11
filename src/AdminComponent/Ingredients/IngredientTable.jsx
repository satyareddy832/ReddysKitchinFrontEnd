import { Box, Button, Card, CardHeader, IconButton, Modal } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Create, Delete } from "@mui/icons-material";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsOfRestaurant, updateStokeOfIngredient } from "../../component/State/Ingredients/Action";

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


const IngredientTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {restaurant,ingredients}=useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  
  useEffect(()=>{
    dispatch(getIngredientsOfRestaurant({id:restaurant.usersRestaurant?.id,jwt:jwt}))
  },[])

  const handleUpdateStoke=(id)=>{
    console.log("id isss",id);
    dispatch(updateStokeOfIngredient({id,jwt}));
  }

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpen}>
              <Create />
            </IconButton>
          }
          title={"Ingredients"}
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.ingredients.map((item,index) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.category.name}</TableCell>
                  <TableCell align="center">
                    <Button onClick={()=>handleUpdateStoke(item.id)}>
                      {item.inStoke?"In Stoke":"Out Of Stoke"}
                    </Button>
                  </TableCell>
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
          <CreateIngredientForm/>
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientTable;
