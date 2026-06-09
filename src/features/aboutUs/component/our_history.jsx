import AboutUsTitle from "../../../ui/aboutUsTitle";
import OurHistoryComponent from "../../../ui/ourHistoryComponent";

const OurHistory = ({aboutusData}) => {
  const historyItems = [
    {
      title: "التأسيس",
      desc: "إطلاق النسخة الإلكترونية الأولى وتوسيع شبكة المراسلين لتشمل أهم العواصم العالمية.",
      year: "1995",
    },
    {
      title: "التحول الرقمي",
      desc: "إطلاق النسخة الإلكترونية الأولى وتوسيع شبكة المراسلين لتشمل أهم العواصم العالمية.",
      year: "2008",
    },
    {
      title: "الصحافة الاستقصائية",
      desc: "تأسيس وحدة التحقيقات الاستقصائية التي حصدت لاحقاً العديد من الجوائز المرموقة.",
      year: "2016",
    },
    {
      title: "الريادة الحديثة",
      desc: "تطوير منصة تفاعلية ذكية تدمج بين صحافة البيانات والوسائط المتعددة لتجربة مستخدم فريدة.",
      year: "2024",
    },
  ];

  return (
    <div className="h-auto w-full py-[3rem] bg-[#F3F4F5]">
      <div className="container1 mx-auto">
        <AboutUsTitle title={"محطات في تاريخنا"} />
        <div className="lg:block hidden">
          <div className="container4 mx-auto">
            <OurHistoryComponent aboutusData={aboutusData} />
          </div>
        </div>
        <div className="lg:hidden block">
          <OurHistoryComponent aboutusData={aboutusData} />
        </div>
      </div>
    </div>
  );
};

export default OurHistory;
