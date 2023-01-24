import Layout from "../components/Layout";
import Link from "next/link";

const Orders = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

      <Link
        href="/newOrder"
        className="bg-blue-800 py-2 px-5 my-3 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"
      >
        New Order
      </Link>
    </Layout>
  );
};

export default Orders;
