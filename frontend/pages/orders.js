import Layout from "../components/Layout";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import Order from "../components/Order";

const GET_ORDERS = gql`
  query getOrdersSeller {
    getOrdersSeller {
      id
      order {
        id
        quantity
        name
        price
      }
      total
      customer {
        id
        name
        surname
        email
        phone
      }
      seller
      state
    }
  }
`;

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);

  if (loading) return "Loading...";

  const { getOrdersSeller } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

      <Link
        href="/newOrder"
        className="bg-blue-800 py-2 px-5 my-3 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"
      >
        New Order
      </Link>

      {getOrdersSeller.length === 0 ? (
        <p className="mt-5 text-center text-2xl">No orders yet</p>
      ) : (
        getOrdersSeller.map((order) => <Order key={order.id} order={order} />)
      )}
    </Layout>
  );
};

export default Orders;
