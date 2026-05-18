import heroImage1 from "../../../../assets/images/heroImage1.png";
import heroImage2 from "../../../../assets/images/heroImage2.png";
import heroImage3 from "../../../../assets/images/heroImage3.png";
import heroImage5 from "../../../../assets/images/heroImage5.png";

const ModelOneHero = () => {
  const images = [
    {
      image: heroImage5,
      name: "سياسة",
      title: "تصاعد التوترات السياسية بعد إعلان الحكومة ....",
      date: "الخميس، 18 مايو 2024",
    },
    {
      image: heroImage1,
      name: "تكنولوجيا",
      title: "مستقبل الذكاء الاصطناعي في المنطقة العربية: فرص وتحديات",
      date: "الخميس، 18 مايو 2024",
    },
    {
      image: heroImage2,
      name: "سياسة",
      title: "تشارلز وترمب بعيون أمريكية وبريطانية",
      date: "الخميس، 18 مايو 2024",
    },
    {
      image: heroImage3,
      name: "رياضة",
      title: "ريال مدريد يحدد موعد احتفال برشلونة بلقب الدوري الإسباني",
      date: "الخميس، 18 مايو 2024",
    },
  ];

  const firstColumnImages = images.slice(0, 2);
  const secondColumnImages = images.slice(2, 4);

  return (
    <div className="container1 mx-auto h-auto">
      <div className="grid grid-cols-12 gap-x-[0.5rem] mt-[1rem]">
        {/* first column */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-x-[0.5rem]">
            {firstColumnImages.map((item, index) => (
              <div
                key={index}
                className="relative w-full h-[33rem] overflow-hidden rounded-xl group"
              >
                <img
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110`}
                  src={item.image}
                  alt={`hero ${index + 1}`}
                />
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(255, 255, 255, 0.002), rgba(255, 255, 255, 0.002)), linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
                  }}
                ></div>
                <div className="absolute right-[2rem] bottom-[2rem] pointer-events-none">
                  <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
                    <p className="text-white font-[400] text-sm mt-1">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-white w-[90%] leading-relaxed mt-4">
                    {item.title}
                  </p>
                  <p className="text-[#FFFFFF] text-sm mt-3 opacity-70">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* second column */}
        <div className="col-span-4 flex flex-col gap-y-[0.5rem]">
          {secondColumnImages.map((item, index) => (
            <div
              style={{ boxShadow: " 0px 20px 25px -5px #0000001A" }}
              key={index}
              className="relative w-full h-[16.25rem] overflow-hidden rounded-xl group"
            >
              <img
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110`}
                src={item.image}
                alt={`hero ${index + 3}`}
              />
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.002), rgba(255, 255, 255, 0.002)), linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)",
                }}
              ></div>
              {/* Add text overlay for second column items if needed */}
              <div className="absolute right-[1rem] bottom-[1rem] left-[1rem] pointer-events-none">
                <div className="w-[6rem] h-[2rem] flex justify-center items-center bg-[#005BBF] rounded-full">
                  <p className="text-white font-[400] text-sm mt-1">
                    {item.name}
                  </p>
                </div>
                <p className="text-md font-bold text-white w-full leading-relaxed mt-4">
                  {item.title}
                </p>
                <p className="text-[#FFFFFF] text-xs mt-2 opacity-70">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelOneHero;
