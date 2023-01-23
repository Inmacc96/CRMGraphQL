import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      stock
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      stock
      price
    }
  }
`;

const EditProduct = () => {
  // Obtener el id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Obtener el producto a editar
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  // Guardar el producto editado en la bd
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  // Schema de validacion
  const SchemaValidation = Yup.object({
    name: Yup.string().required("Product name is required"),
    stock: Yup.number()
      .required("Add an available quantity")
      .positive("A negative amount is not accepted")
      .integer("Stock must be a integer"),
    price: Yup.number()
      .required("Product price is required")
      .positive("Negative numbers are not accepted"),
  });

  if (loading) return <p>Loading...</p>;

  if (!data) return <p>Action not allowed</p>;

  const { getProduct } = data;

  const updateProductDB = async (values) => {
    const { name, stock, price } = values;
    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            stock,
            price,
          },
        },
      });

      //Mostrar una alerta
      Swal.fire("Updated!", "The product was successfully updated", "success");

      // Redirigir a productos
      router.push("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> Edit Product</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            enableReinitialize
            initialValues={getProduct}
            validationSchema={SchemaValidation}
            onSubmit={(values) => {
              updateProductDB(values);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Product Name"
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

                  {props.touched.name && props.errors.name && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.name}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="stock"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Stock
                    </label>
                    <input
                      id="stock"
                      type="number"
                      placeholder="Quantity available"
                      value={props.values.stock}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

                  {props.touched.stock && props.errors.stock && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.stock}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      type="number"
                      placeholder="Product Price"
                      value={props.values.price}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
                    />
                  </div>

                  {props.touched.price && props.errors.price && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.price}</p>
                    </div>
                  )}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:cursor-pointer"
                    value="Edit product"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
