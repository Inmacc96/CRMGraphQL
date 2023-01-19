import { useRouter } from "next/router";

const EditCustomer = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  console.log(id);

  return <div>EditCustomer</div>;
};

export default EditCustomer;
