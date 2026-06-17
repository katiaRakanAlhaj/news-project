import AboutUsTitle from "../../../ui/aboutUsTitle";
import Newspaper from "../../../assets/images/Newspaper.png";
import location from "../../../assets/images/location.svg";

const OurGlobalPresence = ({ aboutusData }) => {
  return (
    <div className="w-full py-[3rem] h-auto bg-[#001926]">
      <div className="container1 mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[4rem] lg:gap-y-0 gap-y-[2rem]">
          {/* first column */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-start">
              <AboutUsTitle title={aboutusData?.data?.section_title} />
            </div>
            <p className="text-[#FFFFFF] opacity-80 w-[85%] text-lg font-[400] mt-3">
              {aboutusData?.data?.section_description}{" "}
            </p>
          </div>
          {/* second column */}
          <div>
            <img
              src={aboutusData?.data?.section_image}
              className="w-full lg:h-[25rem] h-[20rem] rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurGlobalPresence;
