import { Outlet } from "react-router-dom";
import NavbarMobile from "./Navbar/NavbarMobile";
import Footer from "./footer";
import NavbarSection1 from "./Navbar/NavbarSection1";
import NavbarSection2 from "./Navbar/NavbarSection2";
import NavbarSection3 from "./Navbar/NavbarSection3";
import { useFetchCategories } from "../../features/News/hook/useFetchNews";
import { useFetchContact } from "../../features/contact/hook/useFetchContact";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { useFetchFooter } from "./hooks/useFetchFooter";

function WrapperContent() {
  const {data:footerData , isLoading:footerDataLoading , error:footerDataError} = useFetchFooter();
  const { data: categoryData, isLoading: categoryDataLoading, error: categoryDataError } = useFetchCategories();
  const { data: contactData, isLoading: contactDataLoading, error: contactDataError } = useFetchContact();
  const { isDarkMode } = useTheme();

  return (
    <div className={`size-full relative ${isDarkMode ? 'dark' : ''}`}>
      <div className="hidden lg:block">
        <NavbarSection1 contactData={contactData} />
        <NavbarSection2 footerData = {footerData}/>
        <NavbarSection3 categoryData={categoryData} />
      </div>
      <div className="lg:hidden block">
        <NavbarMobile />
      </div>
      <Outlet />
      <Footer footerData = {footerData} categoryData = {categoryData} contactData = {contactData}/>
    </div>
  );
}

function Wrapper() {
  return (
    <ThemeProvider>
      <WrapperContent />
    </ThemeProvider>
  );
}

export default Wrapper;