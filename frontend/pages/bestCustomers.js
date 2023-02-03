import { useQuery } from "@apollo/client";
import { BEST_CUSTOMERS } from "../graphql/queries";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import withAuth from "../HOC/withAuth";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

const BestCustomers = () => {
  const { data, loading } = useQuery(BEST_CUSTOMERS);

  if (loading) return <Loading />;

  const { getBestCustomers } = data;

  // Aplanar getBestCustomers
  const customersGraph = [];

  getBestCustomers.forEach((customer, index) => {
    customersGraph[index] = {
      ...customer.customer[0],
      total: customer.total,
    };
  });
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Best Customers</h1>

      <ResponsiveContainer width={"100%"} height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={customersGraph}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default withAuth(BestCustomers);
