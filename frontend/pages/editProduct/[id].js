import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      name
      stock
      price
    }
  }
`;

const EditProduct = () => {
  // Obtener el id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Obtener el producto a editar
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;

  const { getProduct } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> Edit Product</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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
                placeholder="Product Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Stock
              </label>
              <input
                id="stock"
                type="number"
                placeholder="Quantity available"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="Product Price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:cursor-pointer"
              value="Edit product"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
