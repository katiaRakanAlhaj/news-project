import i18next from "i18next";
import { ModelDescription } from "../../../ui/ModelDescription";

const SingleNewsModel9 = ({ data }) => {
  return (
    <div className="w-full h-auto relative bg-[#CEECF4] rounded-md p-[1.5rem]">
      <div
        className={`absolute ${i18next.language == "ar" ? "right-0 rounded-tr-md rounded-br-md" : "left-0 rounded-tl-md rounded-bl-md"} h-full w-[0.3rem] bg-secondary top-0`}
      ></div>
      <h1 className="font-bold text-secondary text-xl">{data?.title}</h1>
      <div className="mt-2">
        <ModelDescription description={data.description} />
      </div>
    </div>
  );
};
export default SingleNewsModel9;
