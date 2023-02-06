import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import AuthContext from "../context/auth/AuthContext";

const Header = () => {
  // States name y surname
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  // client Apollo
  const client = useApolloClient();

  // router
  const router = useRouter();

  // AuthContext
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
    }
  }, [user]);

  // Cerrar sesion
  const logOut = () => {
    localStorage.removeItem("token");
    client.clearStore();
    router.push("/login");
  };

  return (
    <header className="sm:flex sm:justify-between mb-6">
      <p className="mt-2 mb-5 lg:mb-0">
        Hello: {name} {surname}
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
