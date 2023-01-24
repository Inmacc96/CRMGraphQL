import Layout from "../components/Layout";
import AssignCustomer from "../components/orders/AssignCustomer";
import AssignProducts from "../components/orders/AssignProducts";

const NewOrder = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <AssignCustomer />
      <AssignProducts />
    </Layout>
  );
};

export default NewOrder;
