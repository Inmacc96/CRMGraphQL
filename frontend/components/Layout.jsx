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
        {children}
      </div>
    </>
  );
};

export default Layout;
