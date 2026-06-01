import ModelTitle from "../../../ui/modelsTitle";
import Prioritie1 from "../../../assets/images/Prioritie1.svg";
import Priorities2 from "../../../assets/images/Priorities2.svg";
import Priorities3 from "../../../assets/images/Priorities3.svg";
import Priorities4 from "../../../assets/images/Priorities4.svg";
import Priorities5 from "../../../assets/images/Priorities5.svg";
import Priorities6 from "../../../assets/images/Priorities6.svg";
const SingleNewsModel13 = () => {
  const items = [
    {
      image: Prioritie1,
      title: "بناء السلام والاستقرار",
      desc: "تعزيز المؤسسات الوطنية وتشجيع المصالحة لضمان السلام طويل الأمد.",
    },
    {
      image: Priorities2,
      title: "الاستقرار الإقليمي",
      desc: "تعزيز الحلول الدبلوماسية للنزاعات الإقليمية وتشجيع التعاون.",
    },
    {
      image: Priorities3,
      title: "الدبلوماسية المناخية",
      desc: "معالجة ندرة المياه والتصحر، وتعزيز مبادرات الطاقة الخضراء.",
    },
    {
      image: Priorities4,
      title: "حقوق الإنسان",
      desc: "صون حقوق الإنسان، وحماية الفئات الضعيفة، وضمان المساءلة.",
    },
    {
      image: Priorities5,
      title: "التنمية المستدامة",
      desc: "مواءمة الخطط الوطنية مع أهداف التنمية المستدامة (SDGs) لتعزيز النمو الاقتصادي الشامل.",
    },
    {
      image: Priorities6,
      title: "تمويل التنمية",
      desc: "تأمين الدعم والاستثمار الدوليين لإعادة الإعمار بعد النزاع.",
    },
  ];
  return (
    <div className="mt-[2rem]">
      <ModelTitle title={"أولويات العراق في الأمم المتحدة"} />
      <p className="text-[#666666] text-sm mt-2">
        لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
        أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم
        أد مينيم فينايم,كيواس نوستريد أكسير
      </p>
      <div className="grid grid-cols-3 mt-[1rem] gap-[2rem]">
        {items?.map((item) => (
          <div
            style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
            className="w-full h-[8rem] flex flex-col space-y-2 rounded-xl  p-[1rem]"
          >
            <img className="w-[1.2rem]" src={item.image} />
            <h1 className="font-bold mt-1 text-sm text-secondary">
              {item.title}
            </h1>
            <p className="text-[#666666] text-sm line-clamp-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SingleNewsModel13;
