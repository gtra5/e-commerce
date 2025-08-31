import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <section className="w-full h-full bg-gray-200 lg:p-9 xl:p-20 ">{children}</section>
      <Footer />
    </>
  );
};
export default Layout;
