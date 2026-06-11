import { useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";

const NavbarSection2 = () => {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact"; // Adjust the path as needed

  return (
    <div className={`h-[6.4rem] w-full ${isContactPage ? "h-[10rem]" : ""}`}>
      <div className="container1 mx-auto h-full flex gap-x-[5rem]">
        <div className="flex justify-center items-center h-full">
          <img className="w-[13.5rem]" src={logo} alt="logo" />
        </div>
        <div className="flex w-full justify-center items-center h-full">
          <div className="w-full h-[5rem] flex items-center justify-center px-4 bg-[#D41515]">
            <p className="text-md text-white font-bold leading-relaxed">
              اندلاع حريق كبير في منطقة صناعية يثير حالة من الطوارئ، وفرق
              الإطفاء تحاول السيطرة على النيران. مصادر أولية تشير إلى وقوع
              إصابات بين العمال،
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection2;
