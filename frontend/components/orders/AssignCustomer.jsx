import { useState, useEffect } from "react";
import Select from "react-select";

const customers = [
  { id: 1, name: "Inma" },
  { id: 2, name: "Pepe" },
  { id: 3, name: "Maria" },
];

const AssignCustomer = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    console.log(customer);
  }, [customer]);

  const selectCustomer = (values) => {
    setCustomer(values);
  };

  return (
    <Select
      id="long-value-select"
      instanceId="long-value-select"
      options={customers}
      isMulti={true}
      onChange={selectCustomer}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.name}
      placeholder="Select the customer"
    />
  );
};

export default AssignCustomer;
