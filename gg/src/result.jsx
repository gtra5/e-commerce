import Header from "./component/Header.jsx";
import { ArrowUpFromDot } from 'lucide-react';
import Footer from "./component/Footer.jsx";

const Layout = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  return (
    <div className="w-full flex flex-col justify-center  ">
      <Header />
      <section className="w-full h-fit  bg-gray-200 lg:p-9 xl:p-20 ">{children}</section>
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center border border-1 border-white bg-blue-500 hover:bg-blue-600 rounded-full font-normal text-xl shadow-lg text-white transition-colors duration-200 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUpFromDot />
      </button>
      <Footer />
    </div>
  );
};
export default Layout;
