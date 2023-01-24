import Layout from "../components/Layout";
import AssignCustomer from "../components/orders/AssignCustomer";

const NewOrder = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <AssignCustomer />
    </Layout>
  );
};

export default NewOrder;
