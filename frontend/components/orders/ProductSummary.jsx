const ProductSummary = ({ product }) => {
  const { name, price } = product;
  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p>$ {price}</p>
      </div>
      <input
        type="number"
        placeholder="Quantity"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800 md:ml-4"
      />
    </div>
  );
};

export default ProductSummary;
