import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Router from "next/router";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { user, loading, error } = useAuth();

    useEffect(() => {
      if (!user && !loading && !error) {
        Router.push("/login");
      }
    }, [user, loading, error]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
