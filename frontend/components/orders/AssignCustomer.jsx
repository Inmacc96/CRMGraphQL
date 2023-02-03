import { useContext } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS_USER } from "../../graphql/queries";
import OrderContext from "../../context/orders/OrderContext";

const AssignCustomer = () => {
  // Context de pedidos
  const { addCustomer } = useContext(OrderContext);

  // Consultar la base de datos para obtener los clientes
  const { data, loading, error } = useQuery(GET_CUSTOMERS_USER);

  const selectCustomer = (values) => {
    addCustomer(values);
  };

  // Resultados de la consulta
  if (loading) return null;

  const { getCustomersSeller } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-3 text-sm font-bold">
        1.- Assigns a customer to the order
      </p>
      <Select
        className="mt-3"
        id="long-value-select"
        instanceId="long-value-select"
        options={getCustomersSeller}
        onChange={selectCustomer}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        placeholder="Search or select the customer"
      />
    </>
  );
};

export default AssignCustomer;
