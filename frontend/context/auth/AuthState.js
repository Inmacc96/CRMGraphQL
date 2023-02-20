import { useReducer } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import { GET_USER as GET_USER_QUERY } from "../../graphql/queries";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import { GET_USER } from "../../types";

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { refetch, loading, error } = useQuery(GET_USER_QUERY, {
    onCompleted: (data) => {
      dispatch({ type: GET_USER, payload: data.getUser });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        refetchGetUser: refetch,
        isLoadingUser: loading,
        errorUser: error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
