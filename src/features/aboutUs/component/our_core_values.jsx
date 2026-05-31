import AboutUsTitle from "../../../ui/aboutUsTitle";
import message1 from "../../../assets/images/message1.svg";
import message2 from "../../../assets/images/message2.svg";
import message3 from "../../../assets/images/message3.svg";
const OurCoreValues = () => {
  const valuesItems = [
    {
      image: message1,
      title: "النزاهة",
      desc: "نلتزم بأعلى معايير الأخلاق المهنية والشفافية في كل ما ننشره.",
    },
    {
      image: message2,
      title: "السرعة",
      desc: "نسابق الزمن لنقل الحدث فور وقوعه دون المساس بدقة المعلومات.",
    },
    {
      image: message3,
      title: "العمق التحليلي",
      desc: "لا نكتفي بسرد الأخبار، بل نحلل أبعادها وتأثيراتها المستقبلية.",
    },
  ];
  return (
    <div className="h-auto w-full bg-[#EDEEEF] py-[3rem]">
      <div className="container1 mx-auto">
        <AboutUsTitle title={"قيمنا الجوهرية"} />
        <div className="container4 mx-auto">
          <div className="grid grid-cols-3 gap-x-[1.5rem] mt-[2rem]">
            {valuesItems?.map((valuesItems) => (
              <div className="w-full h-[10rem] bg-white rounded-md border border-[#BBD3E4] flex flex-col justify-center items-center space-y-2">
                <img className="w-[1.5rem]" src={valuesItems?.image} />
                <h1 className="text-[#005BBF] font-bold text-lg">
                  {valuesItems?.title}
                </h1>
                <p className="text-[#5F5E5E] text-sm text-center w-[70%] line-clamp-3">
                  {valuesItems?.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurCoreValues;
