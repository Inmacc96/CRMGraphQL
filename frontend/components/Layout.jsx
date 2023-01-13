import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM - Customer Management</title>
      </Head>
      <h1>Desde Layout</h1>
      {children}
    </>
  );
};

export default Layout;
