import { useTheme } from "../../../context/ThemeContext";
import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel7 = ({data}) => {
  const {isDarkMode} = useTheme();
  
  return (
    <div>
      <ModelTitle title={data?.title} />
      <div className="mt-[2rem] px-[1.5rem]">
        {data?.content.map((item, index) => (
          <div key={index} className="flex gap-x-6 mt-[1.5rem]">
            <div className="flex flex-col items-center">
              <img 
                className="w-[1.5rem]" 
                src={item.icon}
                style={{
                  filter: isDarkMode 
                    ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
                    : "none"
                }}
              />
              {index !== data?.content?.length - 1 && (
                <div className={`w-[0.01rem] h-[3rem] mt-1 bg-secondary`}></div>
              )}
            </div>
            <div className="w-full">
              <h1 className="text-secondary text-md">{item.title}</h1>
              <p className="text-[#666666] text-sm">{item.year}</p>
              <p className="text-md text-[#666666]">{item.description}</p>
              {index !== data?.content?.length - 1 && (
                <div className="mt-[0.8rem] w-full h-[0.01rem] bg-[#C4C4C4]"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleNewsModel7;