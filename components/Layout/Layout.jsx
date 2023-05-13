import Head from "next/head";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = ({ children, props }) => {
  return (
    <>
      <Head>
        <title>NASA APIS Website</title>
        <meta property="og:title" content="NASA APIS Website" key="title" />
      </Head>
      <Header currentPage={props} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
