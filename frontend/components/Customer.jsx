import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id)
  }
`;

const GET_CUSTOMERS_USER = gql`
  query getCustomersSeller {
    getCustomersSeller {
      id
      name
      surname
      company
      email
    }
  }
`;

const Customer = ({ customer }) => {
  // Mutation pata eliminar cliente
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    update(cache) {
      // Obtener el objeto de cache que deseamos actualizar
      const { getCustomersSeller } = cache.readQuery({
        query: GET_CUSTOMERS_USER,
      });

      // Reescribimos la cache
      cache.writeQuery({
        query: GET_CUSTOMERS_USER,
        data: {
          getCustomersSeller: getCustomersSeller.filter(
            (customer) => customer.id !== id
          ),
        },
      });
      cache.evict({ id: cache.identify(customer) });
    },
  });

  const { id, name, surname, company, email } = customer;

  // Elimina un cliente
  const confirmDeleteCustomer = (id) => {
    Swal.fire({
      title: "Do you want to remove this customer?",
      text: "This action cannot be reversed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Eliminar por ID
          const { data } = await deleteCustomer({
            variables: {
              id,
            },
          });

          // Mostrar una alerta
          Swal.fire("Deleted!", data.deleteCustomer, "success");
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {name} {surname}
      </td>
      <td className="border px-4 py-2">{company}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmDeleteCustomer(id)}
        >
          Delete
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Customer;
