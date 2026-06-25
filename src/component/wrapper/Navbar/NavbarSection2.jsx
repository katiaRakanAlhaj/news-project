import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";

const NavbarSection2 = ({ footerData, currentLang }) => {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact"; // Adjust the path as needed

  return (
    <div className={`h-[6.4rem] w-full ${isContactPage ? "h-[10rem]" : ""}`}>
      <div className="container1 mx-auto h-full flex gap-x-[5rem]">
        <div className="flex justify-center items-center h-full">
          <Link to={`/${currentLang}`}>
            <img
              className="w-[13.5rem]"
              src={footerData?.data?.logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex w-full justify-center items-center h-full">
          <div className="w-full h-[5rem] flex items-center justify-center px-4 bg-negative">
            <p className="text-md text-white font-bold leading-relaxed">
              {footerData?.data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection2;
