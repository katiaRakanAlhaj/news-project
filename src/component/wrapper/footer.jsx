import footerbg from "../../assets/images/footerbg.png";
import logoFooter from "../../assets/images/logoFooter.svg";
import linkedIn from "../../assets/images/linkedInFooter.svg";
import facebookFooter from "../../assets/images/facebookFooter.svg";
import twitterFooter from "../../assets/images/twitterFooter.svg";
import instgramFooter from "../../assets/images/instgramFooter.svg";
import i18next from "i18next";

const Footer = () => {
  const icons = [
    { icon: facebookFooter },
    { icon: instgramFooter },
    { icon: linkedIn },
    { icon: twitterFooter },
  ];

  return (
    <footer className="relative w-full mt-10 overflow-hidden lg:h-[20rem]">
      {/* Background */}
      <img
        src={footerbg}
        alt="footer background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#020817]/85"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-14 text-white">
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-10 ${i18next.language == "ar" ? "text-right" : "text-left"}`}
        >
          {/* Right section */}
          <div className="md:col-span-1 flex flex-col">
            <img src={logoFooter} alt="logo" className="w-[4rem] mb-4" />

            <p className="text-sm leading-7 text-gray-300 max-w-[260px]">
              المصدر الرائد للأخبار والتحليلات المعمقة في العالم العربي. نلتزم
              بالمصداقية، الدقة، والموضوعية في كل ما نقدمه.
            </p>

            <div className="flex lg:items-center  gap-4 mt-6">
              {icons.map((item, index) => (
                <img
                  key={index}
                  src={item.icon}
                  alt="social"
                  className="w-4 h-4 cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col lg:items-center">
            <div>
              <h3 className="font-bold text-sm mb-5">قانوني</h3>

              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="hover:text-white cursor-pointer transition">
                  سياسة الخصوصية
                </li>

                <li className="hover:text-white cursor-pointer transition">
                  شروط الخدمة
                </li>
              </ul>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col lg:items-center">
            <h3 className="font-bold text-md mb-5">روابط سريعة</h3>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                عن الموقع
              </li>

              <li className="hover:text-white cursor-pointer transition">
                اتصل بنا
              </li>

              <li className="hover:text-white cursor-pointer transition">
                سياسة
              </li>

              <li className="hover:text-white cursor-pointer transition">
                رياضة
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col lg:items-center">
            <h3 className="font-bold text-lg mb-5 invisible">.</h3>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                اقتصاد
              </li>

              <li className="hover:text-white cursor-pointer transition">
                تقنية
              </li>

              <li className="hover:text-white cursor-pointer transition">
                مقالات
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
          جميع الحقوق محفوظة © 2025 Orinet لتقنية المعلومات
        </div>
      </div>
    </footer>
  );
};

export default Footer;
