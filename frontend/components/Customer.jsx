import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
      name
      surname
      company
      email
      phone
    }
  }
`;

const Customer = ({ customer }) => {
  // Mutation pata eliminar cliente
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    update(cache, { data: { deleteCustomer } }) {
      const identify = cache.identify(deleteCustomer);

      cache.evict({ id: identify });
      cache.gc();
    },
  });

  const { id, name, surname, company, email } = customer;

  // Elimina un cliente
  const confirmDeleteCustomer = () => {
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
          await deleteCustomer({
            variables: {
              id,
            },
          });

          // Mostrar una alerta
          Swal.fire("Deleted!", "Deleted Customer", "success");
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const editCustomer = () => {
    Router.push({
      pathname: "/editCustomer/[id]",
      query: { id },
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
          onClick={confirmDeleteCustomer}
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
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={editCustomer}
        >
          Edit
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Customer;
