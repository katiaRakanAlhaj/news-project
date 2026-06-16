import footerbg from "../../assets/images/footerbg.png";
import linkedIn from "../../assets/images/linkedInFooter.svg";
import facebookFooter from "../../assets/images/facebookFooter.svg";
import twitterFooter from "../../assets/images/twitterFooter.svg";
import instgramFooter from "../../assets/images/instgramFooter.svg";
import i18next from "i18next";
import { Link } from "react-router-dom";

const Footer = ({ categoryData, footerData }) => {
  const icons = [
    { icon: twitterFooter },
    { icon: linkedIn },
    { icon: instgramFooter },

    { icon: facebookFooter },
  ];

  const categories = categoryData?.data || [];

  // Split categories into two halves for column 3 and column 4
  const middleIndex = Math.ceil(categories.length / 2);
  const firstHalfCategories = categories.slice(0, middleIndex);
  const secondHalfCategories = categories.slice(middleIndex);

  return (
    <footer className="relative w-full mt-10 overflow-hidden lg:h-[21rem]">
      {/* Background */}
      <img
        src={footerbg}
        alt="footer background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#020817]/85"></div>

      {/* Content */}
      <div className="relative z-10 container5 mx-auto py-14 text-white">
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-10 ${i18next.language == "ar" ? "text-right" : "text-left"}`}
        >
          {/* Column 1: Logo and description */}
          <div className="md:col-span-1 flex flex-col">
            <img
              src={footerData?.data?.logo}
              alt="logo"
              className="w-[6rem] mb-4 brightness-0 invert"
            />
            <p className="text-md leading-7 text-gray-300 max-w-[260px]">
              {footerData?.data?.description}
            </p>

            <div className="flex lg:items-center gap-4 mt-6">
              {icons.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:opacity-80 transition"
                >
                  <img src={item.icon} alt="social" className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Contact & About Us */}
          <div className="flex flex-col mr-[1rem]">
            <ul className="space-y-3 text-gray-300 text-md">
              <li className="hover:text-white cursor-pointer transition">
                <Link to="/About_Us">{i18next.t("menu.about_us")}</Link>
              </li>

              <li className="hover:text-white cursor-pointer transition">
                <Link to="/contact">
                  {i18next.t("menu.contact_us") || "اتصل بنا"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories - First Half */}
          <div className="flex flex-col">
            <ul className="space-y-3 text-gray-300 text-md">
              {firstHalfCategories.map((category) => (
                <li
                  key={category.id}
                  className="hover:text-white cursor-pointer transition"
                >
                  <Link to={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Categories - Second Half */}
          <div className="flex flex-col">
            <ul className="space-y-3 text-gray-300 text-md">
              {secondHalfCategories.map((category) => (
                <li
                  key={category.id}
                  className="hover:text-white cursor-pointer transition"
                >
                  <Link to={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 text-center text-md text-white">
          {footerData?.data?.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
