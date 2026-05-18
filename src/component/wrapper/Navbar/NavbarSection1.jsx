import i18next from "i18next";
import facebook from "../../../assets/images/facebook.svg";
import linkedIn from "../../../assets/images/linkedIn.svg";
import instgram from "../../../assets/images/instgram.svg";
import twitter from "../../../assets/images/twitter.svg";
import sun from "../../../assets/images/sun.svg";
const NavbarSection1 = () => {
  const socilaIcons = [
    { icon: twitter },
    { icon: linkedIn },
    { icon: instgram },
    { icon: facebook },
    { icon: sun },
  ];
  return (
    <div className="w-full h-[2.5rem] bg-[#C4C4C4]">
      <div className="container1 mx-auto h-full">
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex gap-x-6 items-center">
            <p className="text-[#222222] text-sm">
              {i18next.t("menu.about_us")}
            </p>
            <p className="text-[#222222] text-sm">
              {i18next.t("menu.contact_us")}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-[#222222] text-sm">الخميس، 18 مايو 2024</p>
          </div>
          <div className="flex items-center gap-x-4">
            {socilaIcons?.map((socilaIcons) => (
              <img className="cursor-pointer" src={socilaIcons.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection1;
