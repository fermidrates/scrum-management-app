import { useMutation } from "@apollo/client";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/router";

import { INSERT_USER } from "@/graphQL/mutations";

import { RegisterFormType } from "@/types/userTypes";

const Register = () => {
  const router = useRouter();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "",
      squad: "",
    },
    validate: (values) => {
      const errors: FormikErrors<RegisterFormType> = {};

      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (!values.role) {
        errors.role = "Required";
      }

      return errors;
    },
    onSubmit: (formValues: RegisterFormType) => {
      insertUser({
        variables: {
          username: formValues.username,
          role: formValues.role,
          squad: formValues.squad,
        },
      });
    },
  });

  const [insertUser] = useMutation(INSERT_USER, {
    onCompleted: () => {
      // TODO: tell user register process is successful
      router.push("/login");
    },
    onError: () => {
      // TODO: based on error, tell user which part of the form that is not completed
      console.error("register failed");
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} />
      <input name="password" onChange={handleChange} type="password" />
      <select name="role" onChange={handleChange}>
        <option value="backend">Backend Engineer</option>
        <option value="frontend">Frontend Engineer</option>
        <option value="qa">QA Engineer</option>
        <option value="product">Product Manager</option>
      </select>
      <input name="squad" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
