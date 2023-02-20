import { useEffect, useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import Router from "next/router";
import Loading from "../components/Loading";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { user, isLoadingUser, errorUser } = useContext(AuthContext);

    useEffect(() => {
      if (!user && !isLoadingUser && errorUser) {
        Router.push("/login");
      }
    }, [user, isLoadingUser, errorUser]);

    if (isLoadingUser) {
      return (
        <main className="bg-gray-800 h-screen flex justify-center">
          <Loading />;
        </main>
      );
    }

    return user ? <WrappedComponent {...props} /> : <main className="bg-gray-800 h-screen"></main>;
  };

  return Wrapper;
};

export default withAuth;
