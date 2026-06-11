import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel10 = () => {
  const items = [
    {
      id: 1,
      title: "مقترح",
      desc: "تقوم دولة عضو أو مجموعة من الدول بصياغة قرار واقتراحه.",
    },
    {
      id: 2,
      title: "المفاوضات",
      desc: "يتشاور مقدمو القرار مع الوفود الأخرى لكسب التأييد وإجراء التنقيحات.",
    },
    {
      id: 3,
      title: "التصويت",
      desc: "يُطرح القرار للتصويت. وفي مجلس الأمن، يمكن أن يؤدي حق النقض (الفيتو) من أي عضو دائم إلى عرقلته.",
    },
  ];
  return (
    <div className="mt-[2rem]">
      <ModelTitle title={"كيفية اعتماد قرار"} />
      <p className="text-[#333333] text-md mt-2">
        تتضمن عملية اعتماد القرار عدة مراحل رئيسية، تبدأ من المقترح الأولي
        وصولاً إلى التصويت النهائي. ويضمن ذلك اتخاذ القرارات بتوافق واسع واتفاق
        دولي.
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[4rem] gap-y-[2rem] mt-[2rem]">
        {items?.map((item) => (
          <div key={item.id} className="flex flex-col space-y-2">
            <div className="w-[4rem] h-[4rem] flex justify-center items-center bg-[#005BBF] rounded-full text-xl font-bold text-white">
              <p className="mt-2">{item.id}</p>
            </div>
            <h1 className="font-bold text-lg mt-1 text-[#333333]">
              {item.title}
            </h1>
            <p className="text-[#333333] text-lg">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SingleNewsModel10;
