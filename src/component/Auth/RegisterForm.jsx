import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch } from "react-redux";
import { registerUser } from "../State/Authentication/Action";

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
  };


const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleSubmit = (values) => {
      console.log("data came is ",values)
      dispatch(registerUser({userData:values,navigate}))
  };


  return (
    <div>
      <Typography>Register</Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
            variate="outlined"
          />

          <Field as={TextField} name="email" label="Email" variate="outlined" />

          <Field
            as={TextField}
            name="password"
            type="password"
            label="Password"
            variate="outlined"
          />

            <Field fullWidth
                as={Select}
                labelId="role-simple-select-label"
                id="demo-simple-select"
                name="role"
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
            </Field>
         

          <Button fullWidth type="submit" variant="contained">
            Register
          </Button>
        </Form>
      </Formik>
      <Typography>
        Have an account already?
        <Button onClick={() => navigate("/account/login")}>Login</Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
