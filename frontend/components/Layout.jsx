import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  // Hook de routing
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM - Customer Management</title>
      </Head>

      {["/login", "/signup"].includes(router.pathname) ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen sm:flex">
          <Sidebar />

          <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
            <Header />

            {children}
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;
