import Header from "./component/Header.jsx";
import { ArrowUpFromDot } from "lucide-react";
import Footer from "./component/Footer.jsx";

const Layout = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <main className="w-full flex-grow bg-gray-200 p-0 md:p-6 lg:p-9 xl:p-20">
        {children}
      </main>
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600 border border-white rounded-full shadow-lg text-white transition-colors duration-200 z-50"
        aria-label="Scroll to top"
        title="Back to top"
      >
        <ArrowUpFromDot size={24} />
      </button>
      <Footer />
    </div>
  );
};

export default Layout;