import { useContext } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/router";

import { GET_USER_BY_USERNAME } from "@/graphQL/queries";

import { LoginFormType } from "@/types/userTypes";

import UserContext from "@/contexts/UserContext";

const Login = () => {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
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

  const [getUserByUsername] = useLazyQuery(GET_USER_BY_USERNAME, {
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
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} />
      <input name="password" onChange={handleChange} type="password" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
