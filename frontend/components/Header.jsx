import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  // client Apollo
  const client = useApolloClient();

  // router
  const router = useRouter();

  const { user, loading } = useAuth();

  // Proteger que no accedamos a data antes de tener resultados
  if (loading) return "Loading...";

  const { name, surname } = user;

  // Cerrar sesion
  const logOut = () => {
    localStorage.removeItem("token");
    client.clearStore();
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
