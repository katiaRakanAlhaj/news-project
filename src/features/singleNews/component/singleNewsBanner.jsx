import singleNewsBanner from "../../../assets/images/singleNewsbanner.png";
import twitter from "../../../assets/images/twitter.svg";
import instgramColor from "../../../assets/images/instgramColor.svg";
import facebookBanner from "../../../assets/images/facebookBanner.svg";
import linkedInColor from "../../../assets/images/linkedInColor.svg";
const SinlgeNewsBanner = () => {
  const socialIcon = [
    { icon: twitter, width: "2rem" },
    { icon: instgramColor, width: "1.5rem" },
    { icon: facebookBanner, width: "1.5rem" },
    { icon: linkedInColor, width: "1.5rem" },
  ];
  return (
    <div className="mt-[1rem]">
      <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
        <p className="text-white font-[700] text-md mt-1">سياسة</p>
      </div>
      <h1 className="text-[#373737] lg:text-3xl text-lg font-bold mt-4">
        أكسيوس: اتفاق وشيك بين واشنطن وطهران لإنهاء الحرب
      </h1>
      <p className="text-[#282828] text-md mt-3">الخميس، 18 مايو 2024</p>
      <div className="relative mt-3">
        <img
          style={{ boxShadow: "0px 20px 25px -5px #0000001A" }}
          src={singleNewsBanner}
          className="w-full h-[26rem] object-cover rounded-xl"
          alt="news banner"
        />
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
        <div className="absolute left-0 bottom-0">
          <div className="w-[14rem] h-[2.5rem] rounded-tr-xl bg-white flex justify-center items-center gap-x-[2rem]">
            {socialIcon?.map((socialIcon, index) => {
              return (
                <img
                  className="cursor-pointer"
                  style={{ width: socialIcon?.width }}
                  key={index}
                  src={socialIcon?.icon}
                  alt="social icon"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinlgeNewsBanner;
