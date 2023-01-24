import Select from "react-select";

const AssignProducts = () => {
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-3 text-sm font-bold">
        2.- Select or search the products
      </p>
      <Select
        className="mt-3"
        id="products-select"
        instanceId="products-select"
        /*    options={getCustomersSeller}
        onChange={selectCustomer} */
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
        placeholder="Search or select the products"
      />
    </>
  );
};

export default AssignProducts;
