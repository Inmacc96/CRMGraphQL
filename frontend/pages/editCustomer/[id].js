import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import Layout from "../../components/Layout";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withAuth from "../../HOC/withAuth";
import Loading from "../../components/Loading";
import { GET_CUSTOMER } from "../../graphql/queries";
import { UPDATE_CUSTOMER } from "../../graphql/mutations";

const EditCustomer = () => {
  // Obtener el ID actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar para obtener el cliente
  const { data, loading, error } = useQuery(GET_CUSTOMER, {
    variables: {
      id,
    },
  });

  // Mutation para actualizar los datos del cliente
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  // Schema de validacion
  const schemaValidation = Yup.object({
    name: Yup.string().required("The customer's name is required"),
    surname: Yup.string().required("The customer's surname is required"),
    company: Yup.string().required("The customer's company is required"),
    email: Yup.string()
      .email("Email is invalid")
      .required("The customer's email is required"),
  });

  if (loading) return <Loading />;

  const { getCustomer } = data;

  // Modifica el cliente en la BD
  const updateCustomerDB = async (values) => {
    try {
      const { name, surname, company, email, phone } = values;
      const { data } = await updateCustomer({
        variables: {
          id,
          input: { name, surname, company, email, phone },
        },
      });

      // Mostrar alerta
      Swal.fire("Updated!", "The client was successfully updated", "success");

      // Redireccionar
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> Edit Customer</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={getCustomer}
            onSubmit={(values) => {
              updateCustomerDB(values);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

                  {props.touched.name && props.errors.name && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.name}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.surname}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

                  {props.touched.surname && props.errors.surname && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.surname}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.company}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

                  {props.touched.company && props.errors.company && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.company}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

                  {props.touched.email && props.errors.email && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.email}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.phone}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:cursor-pointer"
                    value="edit customer"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(EditCustomer);
