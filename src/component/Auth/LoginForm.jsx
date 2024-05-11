import { Password } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../State/Authentication/Action";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleSubmit = (values) => {
      dispatch(loginUser({userData:values,navigate}))
  };
  
  return (
    <div>
      <Typography>Login</Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field as={TextField} name="email" label="Email" variate="outlined" />

          <Field
            as={TextField}
            name="password"
            label="Password"
            variate="outlined"
          />
          <Button fullWidth type="submit" variant="contained">
            Login
          </Button>
        </Form>
      </Formik>
      <Typography>
        Dont't have an account?
        <Button onClick={() => navigate("/account/register")}>Register</Button>
      </Typography>
    </div>
  );
};

export default LoginForm;
