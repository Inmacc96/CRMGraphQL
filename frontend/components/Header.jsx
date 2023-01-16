import { useQuery, gql } from "@apollo/client";

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
  //Query de apollo
  const { data, loading, error } = useQuery(GET_USER);

  // Proteger que no accedamos a data antes de tener resultados
  if (loading) return "Loading...";

  const { name, surname } = data.getUser;

  return (
    <header className="flex justify-between mb-6">
      <p>
        Hola: {name} {surname}
      </p>
      <button>Log Out</button>
    </header>
  );
};

export default Header;
