import Layout from "../components/Layout";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const GET_CUSTOMERS_USER = gql`
  query getCustomersSeller {
    getCustomersSeller {
      id
      name
      surname
      company
      email
    }
  }
`;

export default function Home() {
  //router
  const router = useRouter();

  // Consulta de Apollo
  const { data, loading, error } = useQuery(GET_CUSTOMERS_USER);

  if (loading) return <p>Loading...</p>;

  // Proteger la ruta
  if (!data.getCustomersSeller || error) {
    router.push("/login");
    return <p>Redirecting...</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Customers</h1>

      <table className="table-auto shadow-md mt-10 w-full">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Name</th>
            <th className="w-1/5 py-2">Company</th>
            <th className="w-1/5 py-2">Email</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {data?.getCustomersSeller.map((customer) => (
            <tr key={customer.id}>
              <td className="border px-4 py-2">
                {customer.name} {customer.surname}
              </td>
              <td className="border px-4 py-2">{customer.company}</td>
              <td className="border px-4 py-2">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
