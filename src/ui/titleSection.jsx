import i18next from "i18next";
import arrow1 from "../assets/images/arrow1.svg";
import arrow2 from "../assets/images/arrow2.svg";

const TitleSection = ({ title, showArrows = true }) => {
  return (
    <div className="flex flex-wrap gap-x-2 items-center">
      <h1 className="text-primary font-bold text-md text-nowrap">
        {title}
      </h1>
      <div className="flex-1 h-[0.15rem] relative bg-[#D9E3F6]">
        <div className="absolute h-full w-[10%] bg-negative"></div>
      </div>

      {showArrows && (
        <div className="flex gap-x-2">
          <div className="w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full bg-[#D9D9D9] cursor-pointer hover:bg-gray-400 transition">
            <img className="w-[0.6rem]" src={arrow1} alt="arrow" />
          </div>
          <div className="w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center bg-[#D9D9D9] cursor-pointer hover:bg-gray-400 transition">
            <img className="w-[0.6rem]" src={arrow2} alt="arrow" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleSection;