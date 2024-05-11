import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../component/State/RestaurantOrder/Action";


const orderStatus=[
  {label:"Pending",value:"PENDING"},
  {label:"Completed",value:"COMPLETED"},
  {label:"All",value:"ALL"}
]
const Orders = () => {
  const [filterValue,setFilterValue]=useState("ALL");
  const handleFilter=(e,value)=>{
    setFilterValue(value);
  }
  
  return (
    <div>
      <Card>
        <Typography>Order Status</Typography>
        <FormControl>
          <RadioGroup row onChange={handleFilter}
          name='category' value={filterValue}>
{
  orderStatus.map(item=><FormControlLabel
  key={item.label}
  value={item.value}
  control={<Radio/>}
  label={item.label}
  />)
}


          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable />
    </div>
  );
};

export default Orders;
