import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      surname
    }
  }
`;

const Header = () => {
  // router
  const router = useRouter();

  //Query de apollo
  const { data, loading, error } = useQuery(GET_USER);

  // Proteger que no accedamos a data antes de tener resultados
  if (loading) return "Loading...";

  // Si no hay información
  if (!data.getUser || error) {
    router.push("/login");
    return <p>Redirecting...</p>;
  }

  const { name, surname } = data.getUser;

  // Cerrar sesion
  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="sm:flex sm:justify-between mb-6">
      <p className="mt-2 mb-5 lg:mb-0">
        Hola: {name} {surname}
      </p>
      <button
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        onClick={logOut}
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
