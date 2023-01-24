import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Select from "react-select";

const options = [
  { id: "chocolate", name: "Chocolate" },
  { id: "strawberry", name: "Strawberry" },
  { id: "vanilla", name: "Vanilla" },
];

const NewOrder = () => {
  const [flavours, setFlavours] = useState([]);

  useEffect(() => {
    console.log(flavours);
  }, [flavours]);

  const selectFlavour = (values) => {
    setFlavours(values);
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <Select
        id="long-value-select"
        instanceId="long-value-select"
        options={options}
        isMulti={true}
        onChange={selectFlavour}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        placeholder="Select the flavour"
      />
    </Layout>
  );
};

export default NewOrder;
