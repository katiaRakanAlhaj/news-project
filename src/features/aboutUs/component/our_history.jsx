import AboutUsTitle from "../../../ui/aboutUsTitle";

const OurHistory = () => {
  const historyItems = [
    { title: "التأسيس", desc: "إطلاق النسخة الإلكترونية الأولى وتوسيع شبكة المراسلين لتشمل أهم العواصم العالمية.", year: "1995" },
    { title: "التحول الرقمي", desc: "إطلاق النسخة الإلكترونية الأولى وتوسيع شبكة المراسلين لتشمل أهم العواصم العالمية.", year: "2008" },
    { title: "الصحافة الاستقصائية", desc: "تأسيس وحدة التحقيقات الاستقصائية التي حصدت لاحقاً العديد من الجوائز المرموقة.", year: "2016" },
    { title: "الريادة الحديثة", desc: "تطوير منصة تفاعلية ذكية تدمج بين صحافة البيانات والوسائط المتعددة لتجربة مستخدم فريدة.", year: "2024" }
  ];

  return (
    <div className="h-auto w-full py-[3rem] bg-[#F3F4F5]">
      <div className="container1 mx-auto">
        <AboutUsTitle title={"محطات في تاريخنا"} />
        <div className="container4 mx-auto">
          {historyItems.map((item, index) => (
            <div key={index} className="flex gap-x-3 mt-[2rem] items-center">
              <div className="h-[6rem] w-full border rounded-md p-[1.5rem] border-[#BBCEE4] bg-white relative">
                <div className="absolute w-[1rem] h-[1rem] top-[-0.1rem] right-[-0.5rem] rounded-full bg-white flex justify-center items-center">
                  <div className="w-[0.5rem] h-[0.5rem] bg-[#005BBF] rounded-full"></div>
                </div>
                <h1 className="font-bold text-[#1B1C1C] text-md">{item.title}</h1>
                <p className="text-[#5F5E5E] text-sm mt-2">{item.desc}</p>
              </div>
              <p className="text-[#005BBF] font-bold text-md whitespace-nowrap">{item.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurHistory;