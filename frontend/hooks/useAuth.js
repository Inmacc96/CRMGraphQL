import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

export const useAuth = () => {
  const { data, loading, error } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  return { user: data?.getUser, loading, error };
};
