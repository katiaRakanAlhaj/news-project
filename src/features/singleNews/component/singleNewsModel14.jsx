import ModelTitle from "../../../ui/modelsTitle";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const SingleNewsModel14 = ({data}) => {
  const [openIndex, setOpenIndex] = useState(null);

  // Use data from response or fallback to empty array
  const accordionItems = data?.content || [];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-[2rem]">
      <ModelTitle title={data?.title || "البيانات والتدخلات"} />

      <div className="mt-4 space-y-3">
        {accordionItems.map((item, index) => (
          <div key={index} className="border border-gray-200 shadow-md">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-4 px-4 text-right bg-white hover:bg-gray-50 transition-colors"
            >
              <span
                className={`text-lg ${
                  openIndex === index
                    ? "font-bold text-[#005BBF]"
                    : "font-normal text-[#333333]"
                }`}
              >
                {item.title}
              </span>
              <IoMdArrowDropdown
                className={`text-2xl text-[#333333] transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <div className="pb-4 px-4 text-[#333333] text-md leading-relaxed">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleNewsModel14;