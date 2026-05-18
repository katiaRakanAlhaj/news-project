import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import NavbarMobile from "./Navbar/NavbarMobile";
import Footer from "./footer";

function Wrapper() {
  return (
    <div className="size-full relative">
      {/* <ScrollToTop /> */}
       <div className="hidden lg:flex">
        <Navbar />
      </div>
      <div className="lg:hidden md:block">
        <NavbarMobile/> 
      </div>
      <Outlet />
      <Footer/>
    </div>
  );
}
export default Wrapper;
