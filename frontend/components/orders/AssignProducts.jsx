import { useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import OrderContext from "../../context/orders/OrderContext";

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

const AssignProducts = () => {
  // Context de pedidos
  const { addProducts } = useContext(OrderContext);

  // Obtener los productos de la base de datos
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
  });

  const selectProducts = (values) => {
    addProducts(values);
  };

  if (loading) return null;

  const { getProducts } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-3 text-sm font-bold">
        2.- Select or search the products
      </p>
      <Select
        className="mt-3"
        id="products-select"
        instanceId="products-select"
        isMulti={true}
        options={getProducts}
        onChange={selectProducts}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) =>
          `${option.name} - ${option.stock} available`
        }
        placeholder="Search or select the product"
      />
    </>
  );
};

export default AssignProducts;
