import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS_USER } from "../graphql/queries";
import Customer from "../components/Customer";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import withAuth from "../HOC/withAuth";

const Home = () => {
  //Consulta de Apollo
  const { data, loading } = useQuery(GET_CUSTOMERS_USER);

  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Customers</h1>
      <Link
        href="/newCustomer"
        className="w-full lg:w-auto text-center bg-blue-800 py-2 px-5 my-3 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"
      >
        New Customer
      </Link>

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Delete</th>
              <th className="w-1/5 py-2">Edit</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data?.getCustomersSeller.map((customer) => (
              <Customer key={customer.id} customer={customer} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default withAuth(Home);
