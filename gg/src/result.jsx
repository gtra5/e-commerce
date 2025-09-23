import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="w-full flex flex-col justify-center  ">
      <Header />
      <section className="w-full h-fit  bg-gray-200 lg:p-9 xl:p-20 ">{children}</section>
      <button className="w-full bg-gray-400 h-20">Back to the top</button>
      <Footer />
    </div>
  );
};
export default Layout;
