import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <section className="w-full    lg:p-10 ">{children}</section>
      <Footer />
    </>
  );
};
export default Layout;
