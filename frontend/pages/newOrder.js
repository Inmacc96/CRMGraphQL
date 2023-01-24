import { useContext } from "react";
import Layout from "../components/Layout";
import AssignCustomer from "../components/orders/AssignCustomer";
import AssignProducts from "../components/orders/AssignProducts";
import OrderSummary from "../components/orders/OrderSummary";
import TotalPayable from "../components/orders/TotalPayable";
import OrderContext from "../context/orders/OrderContext";
import { useMutation, gql } from "@apollo/client";

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;

const NewOrder = () => {
  // Context de pedidos
  const { customer, products, total } = useContext(OrderContext);

  // Mutation para crear un nuevo pedido
  const [newOrder] = useMutation(NEW_ORDER);

  const validateOrder = () => {
    return !products.every((product) => product.quantity > 0) ||
      total === 0 ||
      Object.keys(customer).length === 0
      ? " opacity-50  cursor-not-allowed "
      : "";
  };

  const createNewOrder = async () => {
    try {
      const { data } = await newOrder({
        variables: {
          input: {
            customer: customer.id,
            total,
            order: products.map((product) => ({
              id: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AssignCustomer />
          <AssignProducts />
          <OrderSummary />
          <TotalPayable />

          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
            onClick={createNewOrder}
          >
            Register Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewOrder;
