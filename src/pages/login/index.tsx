import { useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { GET_USER_BY_USERNAME } from "@/graphQL/queries";

import { LoginFormType } from "@/types/userTypes";
import { GetUserByUsernameSchema } from "@/graphQL/schemaType";

import UserContext from "@/contexts/UserContext";

const Login = () => {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);

  const { values, errors, handleChange, handleSubmit, isValid } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnMount: true,
    validate: (values) => {
      const errors: FormikErrors<LoginFormType> = {};

      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: () => {
      getUserByUsername();
    },
  });

  const [getUserByUsername, { loading }] =
    useLazyQuery<GetUserByUsernameSchema>(GET_USER_BY_USERNAME, {
      variables: {
        username: values.username,
      },
      onCompleted: (res) => {
        const username = res.user_aggregate.nodes?.[0]?.username;
        const userID = res.user_aggregate.nodes?.[0]?.user_ID;

        if (username && username === values.password) {
          // TODO: tell user login is successful
          router.push("/");
          sessionStorage.setItem("userID", userID);
        } else {
          // TODO: tell user / password combination is wrong
          console.error("login failed");
        }
      },
      onError: () => {
        // TODO: username is not found, login failed
      },
    });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid
        style={{
          display: "flex",
          gap: "8px",
          flexDirection: "column",
          border: "1px solid grey",
          borderRadius: "4px",
          padding: "20px",
          width: "350px",
        }}
      >
        <Typography>Login</Typography>
        <TextField
          id="input-username"
          label="Username"
          name="username"
          onChange={handleChange}
        />
        <TextField
          id="input-password"
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!isValid || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} color="warning" /> : "Login"}
        </Button>
      </Grid>
    </Box>
  );
};

export default Login;
