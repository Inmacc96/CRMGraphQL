import { useState, useEffect } from "react";
import Select from "react-select";
import { useQuery, gql } from "@apollo/client";

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

const AssignCustomer = () => {
  const [customer, setCustomer] = useState({});

  // Consultar la base de datos para obtener los clientes
  const { data, loading, error } = useQuery(GET_CUSTOMERS_USER);

  useEffect(() => {
    console.log(customer);
  }, [customer]);

  const selectCustomer = (values) => {
    setCustomer(values);
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
