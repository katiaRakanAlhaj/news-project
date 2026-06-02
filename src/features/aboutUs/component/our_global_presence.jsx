import AboutUsTitle from "../../../ui/aboutUsTitle";
import Newspaper from "../../../assets/images/Newspaper.png";
import location from "../../../assets/images/location.svg";

const OurGlobalPresence = () => {
  return (
    <div className="w-full py-[3rem] h-auto bg-[#001926]">
      <div className="container1 mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[4rem] lg:gap-y-0 gap-y-[2rem]">
          {/* first column */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-start">
              <AboutUsTitle title={"حضورنا العالمي"} />
            </div>
            <p className="text-[#FFFFFF] opacity-80 w-[85%] text-md font-[400] mt-3">
              بشبكة واسعة من المكاتب الإقليمية والمراسلين، نضمن لك تغطية شاملة
              من قلب الحدث في أي مكان في العالم.
            </p>
            <div className="mt-[1rem] flex gap-x-2 items-center">
              <img className="w-[1rem]" src={location} />
              <p className="text-sm text-[#F2F0F0] opacity-80 mt-2">
                المكتب الرئيسي:بغداد، العراق
              </p>
            </div>
            <div className="flex gap-x-2 items-center mt-1">
              <img className="w-[1rem]" src={location} />
              <p className="text-sm text-[#F2F0F0] opacity-80 mt-2">
                مكاتب إقليمية: القاهرة، لندن، واشنطن، الرياض
              </p>
            </div>
          </div>
          {/* second column */}
          <div>
            <img
              src={Newspaper}
              className="w-full lg:h-[25rem] h-[20rem] rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurGlobalPresence;
