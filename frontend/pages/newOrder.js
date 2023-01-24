import Layout from "../components/Layout";
import AssignCustomer from "../components/orders/AssignCustomer";
import AssignProducts from "../components/orders/AssignProducts";
import OrderSummary from "../components/orders/OrderSummary";
import TotalPayable from "../components/orders/TotalPayable";

const NewOrder = () => {
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
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}
          >
            Register Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewOrder;
