import { gql, useLazyQuery } from "@apollo/client";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/router";

import { LoginFormType } from "@/types/userTypes";

const GET_USER = gql`
  query getUser($username: String!) {
    user_aggregate(where: { username: { _eq: $username } }) {
      nodes {
        user_ID
        username
      }
    }
  }
`;

const Login = () => {
  const router = useRouter();

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
      getUser();
    },
  });

  const [getUser] = useLazyQuery(GET_USER, {
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
