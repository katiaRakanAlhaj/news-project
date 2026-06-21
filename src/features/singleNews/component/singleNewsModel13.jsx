import { useTheme } from "../../../context/ThemeContext";
import ModelTitle from "../../../ui/modelsTitle";
const SingleNewsModel13 = ({ data }) => {
    const {isDarkMode} = useTheme();
  
  return (
    <div className="mt-[2rem]">
      <ModelTitle title={data?.title} />
      <p className="text-[#666666] text-md mt-3">{data?.description} </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-[1rem] gap-[2rem]">
        {data?.content?.map((item) => (
          <div
            style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
            className={`w-full h-[10rem] flex flex-col space-y-2 rounded-xl  p-[1rem] ${isDarkMode?'border border-white':''}`}
          >
            <img className="w-[1.5rem]" src={item.icon} />
            <h1 className="font-bold mt-1 text-md text-secondary">
              {item.title}
            </h1>
            <p className="text-[#666666] text-md line-clamp-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SingleNewsModel13;
