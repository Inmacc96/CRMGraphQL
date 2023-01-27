import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const BEST_SELLERS = gql`
  query getBestSellers {
    getBestSellers {
      total
      seller {
        name
        email
      }
    }
  }
`;

const BestSellers = () => {
  const { data, loading } = useQuery(BEST_SELLERS);

  if (loading) return <p>Loading...</p>;

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
    </Layout>
  );
};

export default BestSellers;
