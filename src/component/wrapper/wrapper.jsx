import { Outlet } from "react-router-dom";
import NavbarMobile from "./Navbar/NavbarMobile";
import Footer from "./footer";
import NavbarSection1 from "./Navbar/NavbarSection1";
import NavbarSection2 from "./Navbar/NavbarSection2";
import NavbarSection3 from "./Navbar/NavbarSection3";
import { useFetchCategories } from "../../features/News/hook/useFetchNews";

function Wrapper() {
  const {data:categoryData , isLoading:categoryDataLoading , error:categoryDataError} = useFetchCategories();
  return (
    <div className="size-full relative">
      {/* <ScrollToTop /> */}
       <div className="hidden lg:block">
        <NavbarSection1 />
        <NavbarSection2/>
        <NavbarSection3 categoryData = {categoryData}/>
      </div>
      <div className="lg:hidden block">
        <NavbarMobile/> 
      </div>
      <Outlet />
      <Footer/>
    </div>
  );
}
export default Wrapper;
