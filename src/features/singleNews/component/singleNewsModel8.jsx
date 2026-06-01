import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel8 = () => {
  const items = [
    {
      title: "الجمعية العامة",
      desc: "الجهاز التداولي الرئيسي والمسؤول عن وضع السياسات والتمثيل.",
    },
    { title: "الأمانة العامة", desc: "يضطلع بالعمل اليومي للأمم المتحدة." },
    { title: "مجلس الأمن", desc: "يحافظ على السلم والأمن الدوليين." },
    {
      title: "محكمة العدل الدولية",
      desc: "الجهاز القضائي الرئيسي للأمم المتحدة.",
    },
    {
      title: "المجلس الاقتصادي والاجتماعي",
      desc: "ينسق الأعمال الاقتصادية والاجتماعية.",
    },
    {
      title: "مجلس الوصاية",
      desc: "أُنشئ للإشراف على الأقاليم المشمولة بالوصاية (غير نشط منذ عام 1994).",
    },
  ];
  return (
    <div className="mt-[2rem]">
      <ModelTitle title={"الهيئات الرئيسية"} />
      <p className="text-[#333333] text-sm mt-2">
        تتمحور الأمم المتحدة حول ست هيئات رئيسية، تم إنشاؤها بموجب ميثاق الأمم
        المتحدة. هذه الهيئات مسؤولة عن المهام الرئيسية للمنظمة، بدءاً من صون
        السلم والأمن الدوليين وصولاً إلى تعزيز التقدم الاجتماعي والاقتصادي.
      </p>
      <div className="grid grid-cols-3 px-[1rem] mt-[2rem] gap-[2rem]">
        {items?.map((item) => (
          <div
            style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
            className="w-full h-[6rem] flex flex-col space-y-2 rounded-xl p-[1rem]"
          >
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
export default SingleNewsModel8;
