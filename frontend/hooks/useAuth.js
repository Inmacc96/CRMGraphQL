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
export const useAuth = () => {
  const { data, loading, error } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  return { user: data?.getUser, loading, error };
};
