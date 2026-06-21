// TitleSection.jsx
import i18next from "i18next";
import arrow1 from "../assets/images/arrow1.svg";
import arrow2 from "../assets/images/arrow2.svg";
import { useTheme } from "../context/ThemeContext";

const TitleSection = ({ 
  title, 
  showArrows = true,
  currentPage = 1,
  lastPage = 1,
  onPrevPage = null,
  onNextPage = null,
  isLoading = false
}) => {
  const handlePrev = () => {
    if (onPrevPage && currentPage > 1 && !isLoading) {
      onPrevPage();
    }
  };

  const handleNext = () => {
    if (onNextPage && currentPage < lastPage && !isLoading) {
      onNextPage();
    }
  };
const {isDarkMode} = useTheme();
  return (
    <div className="flex flex-wrap gap-x-2 items-center">
      <h1 className={`text-primary font-bold text-lg text-nowrap`}>{title}</h1>
      <div className="flex-1 h-[0.2rem] relative bg-[#D9E3F6]">
        <div className="absolute h-full w-[10%] bg-negative"></div>
      </div>

      {showArrows && onPrevPage && onNextPage && (
        <div className="flex gap-x-2">
          <div 
            className={`w-[2rem] h-[2rem] flex items-center justify-center rounded-full transition ${
              currentPage <= 1 || isLoading
                ? "bg-[#E5E7EB] cursor-not-allowed opacity-50" 
                : "bg-[#D9D9D9] cursor-pointer hover:bg-gray-400"
            }`}
            onClick={handlePrev}
          >
            <img
              className={`w-[0.7rem] ${i18next.language == "ar" ? "" : "rotate-180"}`}
              src={arrow1}
              alt="previous"
            />
          </div>
          <div 
            className={`w-[2rem] h-[2rem] rounded-full flex items-center justify-center transition ${
              currentPage >= lastPage || isLoading
                ? "bg-[#E5E7EB] cursor-not-allowed opacity-50" 
                : "bg-[#D9D9D9] cursor-pointer hover:bg-gray-400"
            }`}
            onClick={handleNext}
          >
            <img
              className={`w-[0.7rem] ${i18next.language == "ar" ? "" : "rotate-180"}`}
              src={arrow2}
              alt="next"
            />
          </div>
        </div>
      )}
      
  
    </div>
  );
};

export default TitleSection;