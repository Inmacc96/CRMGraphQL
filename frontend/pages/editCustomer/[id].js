import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Layout from "../../components/Layout";
import { Formik } from "formik";

const GET_CUSTOMER = gql`
  query getCustomer($id: ID!) {
    getCustomer(id: $id) {
      name
      surname
      company
      email
      phone
    }
  }
`;

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

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> Edit Customer</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik>
            {(props) => {
              console.log(props);

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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

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

export default EditCustomer;
