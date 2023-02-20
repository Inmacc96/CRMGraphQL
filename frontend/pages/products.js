import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Product from "../components/Product";
import withAuth from "../HOC/withAuth";

const Products = () => {
  // Obtener los productos
  const { data, loading } = useQuery(GET_PRODUCTS);

  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Products</h1>

      <Link
        href="/newProduct"
        className="w-full lg:w-auto text-center bg-blue-800 px-5 py-2 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm"
      >
        New Product
      </Link>

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Stock</th>
              <th className="w-1/5 py-2">Price</th>
              <th className="w-1/5 py-2">Delete</th>
              <th className="w-1/5 py-2">Edit</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.getProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default withAuth(Products);
