import { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { AUTH_USER } from "../graphql/mutations";

const Login = () => {
  // State para el mensaje
  const [msg, setMsg] = useState(null);

  // Mutation para autenticar el usuario
  const [authUser] = useMutation(AUTH_USER);

  // Router
  const router = useRouter();

  // Validación del formulario
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await authUser({
          variables: {
            input: values,
          },
        });
        setMsg("Authenticating...");

        // Guardar el token en el LS
        const { token } = data.authUser;
        localStorage.setItem("token", token);

        // Setear msg y redireccionar hacia cliente
        setTimeout(() => {
          setMsg(null);
          router.push("/");
        }, 2000);
      } catch (err) {
        console.log(err.message);
        setMsg(err.message.replace("GraphQL error: ", ""));

        setTimeout(() => {
          setMsg(null);
        }, 3000);
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">Login</h1>

      {msg && (
        <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
          <p>{msg}</p>
        </div>
      )}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="User Email"
                autoComplete="false"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            {formik.touched.email && formik.errors.email && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="User Password"
                autoComplete="false"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            {formik.touched.password && formik.errors.password && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            )}

            <input
              type="submit"
              value="Log in"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 hover:cursor-pointer"
            />
          </form>

          <Link
            className="block text-center my-6  uppercase text-sm text-white hover:text-gray-300"
            href="/signup"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
