import { useEffect } from "react";
import Layout from "../components/Layout";
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
import { gql, useQuery } from "@apollo/client";

const BEST_CUSTOMERS = gql`
  query getBestCustomers {
    getBestCustomers {
      total
      customer {
        id
        name
        company
      }
    }
  }
`;

const BestCustomers = () => {
  const { data, loading, startPolling, stopPolling } = useQuery(BEST_CUSTOMERS);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return <p>Loading...</p>;

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

export default BestCustomers;
