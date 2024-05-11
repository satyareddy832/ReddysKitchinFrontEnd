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
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategory } from "../../component/State/Ingredients/Action";

const orders = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const style = {
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

const IngredientCategoryTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {restaurant,ingredients}=useSelector(state=>state);
  const dispatch=useDispatch();

  const jwt=localStorage.getItem('jwt');

  useEffect(()=>{
    dispatch(getIngredientCategory({id:restaurant.usersRestaurant?.id,jwt}))
  },[])

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpen}>
              <Create />
            </IconButton>
          }
          title={"Ingredients Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.category.map((ing_cat,index) => (
                <TableRow
                  key={ing_cat.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center"  component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align="center">{ing_cat.name}</TableCell>
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
          <CreateIngredientCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientCategoryTable;
