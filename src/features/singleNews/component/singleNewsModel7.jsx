import ModelTitle from "../../../ui/modelsTitle";
import date1 from "../../../assets/images/date1.svg";
import date2 from "../../../assets/images/date2.svg";
import date3 from "../../../assets/images/date3.svg";
import date4 from "../../../assets/images/date4.svg";

const SingleNewsModel7 = () => {
  const items = [
    {
      image: date1,
      title: "الانضمام إلى الأمم المتحدة",
      date: "1945",
      desc: "كان العراق أحد الدول الـ 51 المؤسسة للأمم المتحدة.",
    },
    {
      image: date2,
      title: "أدوار رئيسية في اللجان",
      date: "1854",
      desc: "أدوار رئيسية في اللجان",
    },
    {
      image: date3,
      title: "المساهمة في عمليات حفظ السلام",
      date: "1997",
      desc: "ساهم بأفراد في مختلف بعثات الأمم المتحدة لحفظ السلام على مستوى العالم.",
    },
    {
      image: date4,
      title: "الخروج من الفصل السابع",
      date: "1997",
      desc: "إنجاز دبلوماسي مهم أعاد المكانة القانونية الدولية للعراق.",
    },
    {
      image: date1,
      title: "الانضمام إلى الأمم المتحدة",
      date: "1945",
      desc: "كان العراق أحد الدول الـ 51 المؤسسة للأمم المتحدة.",
    },
  ];

  return (
    <div className="mt-[2rem]">
      <ModelTitle title={"تاريخ العضوية في الأمم المتحدة"} />
      <div className="mt-[2rem] px-[1.5rem]">
        {items?.map((item, index) => (
          <div key={index} className="flex gap-x-2 mt-[1.5rem]">
            <div className="flex flex-col items-center">
              <img className="w-[1rem]" src={item.image} />
              {index !== items.length - 1 && (
                <div className="w-[0.01rem] h-[3rem] mt-1 bg-[#005BBF]"></div>
              )}
            </div>
            <div className="w-full">
              <h1 className="text-secondary text-[0.9rem]">{item.title}</h1>
              <p className="text-[#666666] text-sm">{item.date}</p>
              <p className="text-sm text-[#666666]">{item.desc}</p>
              {index !== items.length - 1 && (
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
