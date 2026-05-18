import { Link } from "react-router-dom";

const NavbarSection3 = () => {
  const menuItems = ["سياسية", "رياضة", "اقتصادية"];
  return (
    <div className="w-full h-[4rem] bg-[#121C2A]">
      <div className="container1 mx-auto h-full">
        <div className="flex w-full gap-x-[2rem] h-full items-center ">
          <Link to="/">
            <p className="text-white text-[0.9rem]">الرئيسية</p>
          </Link>
          <div className="flex gap-x-[2rem]">
            {menuItems?.map((menuItems) => (
              <p className="text-white text-[0.9rem]">{menuItems}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavbarSection3;
