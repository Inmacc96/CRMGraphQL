import { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";
import ProductSummary from "./ProductSummary";

const OrderSummary = () => {
  // Context de pedidos
  const { products } = useContext(OrderContext);

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-3 text-sm font-bold">
        3.- Set the quantities of products
      </p>

      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <ProductSummary key={product.id} product={product} />
          ))}
        </>
      ) : (
        <p className="mt-5 text-sm"> There are no products yet</p>
      )}
    </>
  );
};

export default OrderSummary;
