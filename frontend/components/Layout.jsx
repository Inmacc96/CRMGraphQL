import Head from "next/head";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM - Customer Management</title>
      </Head>

      <div className="bg-gray-200 min-h-screen sm:flex">
        <Sidebar />

        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
