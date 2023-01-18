import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewCustomer = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      company: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("The customer's name is required"),
      surname: Yup.string().required("The customer's surname is required"),
      company: Yup.string().required("The customer's company is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("The customer's email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> New Customer</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Customer Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            {formik.touched.name && formik.errors.name && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="surname"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Surname
              </label>
              <input
                id="surname"
                type="text"
                placeholder="Customer Surname"
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            {formik.touched.surname && formik.errors.surname && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.surname}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Company
              </label>
              <input
                id="company"
                type="text"
                placeholder="Customer Company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            {formik.touched.company && formik.errors.company && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.company}</p>
              </div>
            )}

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
                placeholder="Customer Email"
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
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Customer Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:cursor-pointer"
              value="register customer"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewCustomer;
