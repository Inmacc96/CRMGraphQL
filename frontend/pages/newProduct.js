import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      stock
      price
    }
  }
`;

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      stock
    }
  }
`;

const NewProduct = () => {
  // Router
  const router = useRouter();

  // Mutation para guardar el nuevo producto en la base de datos
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      // Obtener el objeto de cache
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      // Reescribir la cache
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, newProduct],
        },
      });
    },
  });

  // Formulario para nuevos productos
  const formik = useFormik({
    initialValues: {
      name: "",
      stock: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      stock: Yup.number()
        .required("Add an available quantity")
        .positive("A negative amount is not accepted")
        .integer("Stock must be a integer"),
      price: Yup.number()
        .required("Product price is required")
        .positive("Negative numbers are not accepted"),
    }),
    onSubmit: async (values) => {
      const { name, stock, price } = values;

      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              stock,
              price,
            },
          },
        });

        // Mostrar una alerta
        Swal.fire("Saved!", "The product was successfully saved", "success");

        // Redireccionar hacia los productos
        router.push("/products");
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Product</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
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
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            {formik.touched.name && formik.errors.name && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
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
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            {formik.touched.stock && formik.errors.stock && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.stock}</p>
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
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-800"
              />
            </div>

            {formik.touched.price && formik.errors.price && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.price}</p>
              </div>
            )}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:cursor-pointer"
              value="Add new product"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
