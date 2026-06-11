import ModelTitle from "../../../ui/modelsTitle";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const SingleNewsModel14 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const accordionItems = [
    {
      id: 1,
      title: "بيان حول إصلاح مجلس الأمن - سبتمبر 2023",
      content:
        "هذا هو محتوى البيانات الإحصائية. يمكنك وضع المعلومات والأرقام والإحصائيات هنا.",
    },
    {
      id: 2,
      title: "كلمة أمام الجمعية العامة بشأن التغير المناخي - يوليو 2023",
      content:
        "هذا هو محتوى التدخلات الميدانية. يمكنك وضع معلومات عن الأنشطة والتدخلات هنا.",
    },
    {
      id: 3,
      title: "كلمة أمام الجمعية العامة بشأن التغير المناخي - يوليو 2023",
      content: "هذا هو محتوى التوصيات. يمكنك وضع الاقتراحات والتوصيات هنا.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-[2rem]">
      <ModelTitle title={"البيانات والتدخلات"} />

      <div className="mt-4 space-y-3">
        {accordionItems.map((item, index) => (
          <div key={item.id} className="border border-gray-200 shadow-md">
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
                openIndex === index ? "max-h-auto" : "max-h-0"
              }`}
            >
              <div className="pb-4 px-4 text-[#333333] text-md">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleNewsModel14;
