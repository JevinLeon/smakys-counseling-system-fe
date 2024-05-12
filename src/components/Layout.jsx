import Navbar from "./Navbar";
import { Toaster } from "./ui/sonner";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className=" my-3 flex-1 space-y-4 px-8 md:px-16 pt-6 pb-8">
        {children}
      </div>
      <Toaster />
    </>
  );
};

export default Layout;
