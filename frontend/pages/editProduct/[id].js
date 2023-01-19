import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const EditProduct = () => {
  // Obtener el id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> Edit Product</h1>
    </Layout>
  );
};

export default EditProduct;
