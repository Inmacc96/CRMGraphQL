import Layout from "../components/Layout";
import Product from "../components/Product";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      stock
    }
  }
`;

const Products = () => {
  // Obtener los productos
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Products</h1>

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
    </Layout>
  );
};

export default Products;
