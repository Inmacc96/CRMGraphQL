import { useQuery } from "@apollo/client";
import { BEST_SELLERS } from "../graphql/queries";
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
import Loading from "../components/Loading";
import Layout from "../components/Layout";

const BestSellers = () => {
  const { data, loading } = useQuery(BEST_SELLERS);

  if (loading) return <Loading />;

  const { getBestSellers } = data;

  // Aplanar getBestSellers
  const sellerGraph = [];

  getBestSellers.forEach((seller, index) => {
    sellerGraph[index] = {
      ...seller.seller[0],
      total: seller.total,
    };
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Best Sellers</h1>

      <ResponsiveContainer width={"99%"} height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={sellerGraph}
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

export default BestSellers;
