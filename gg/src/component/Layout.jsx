import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  return (
    <div className="min-h-screen w-full max-h-screen">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}
