import AboutUsTitle from "../../../ui/aboutUsTitle";
import award1 from "../../../assets/images/award1.svg";
import award2 from "../../../assets/images/award2.svg";
import award3 from "../../../assets/images/award3.svg";
import award4 from "../../../assets/images/award4.svg";

const AwardsandRecognitions = () => {
  const awardsItem = [
    { image: award1, title: "درع الشفافية الدولية" },
    { image: award2, title: "جائزة التميز الاستقصائي" },
    { image: award3, title: "أفضل منصة إخبارية رقمية" },
    { image: award4, title: "جائزة الصحافة العربية" },
  ];
  return (
    <div className="w-full h-auto pt-[3rem] bg-[#FFFFFF]">
      <AboutUsTitle title={"جوائز وتقديرات"} />
      <div className="container4 mx-auto mt-[2rem]">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[1.5rem]">
          {awardsItem?.map((awardsItem) => (
            <div className="w-full h-[7rem] rounded-md border border-[#BBD0E4] space-y-2 flex flex-col justify-center items-center">
              <img className="w-[2rem] h-[2rem]" src={awardsItem.image} />
              <p className="text-[#5F5E5E] text-sm">{awardsItem?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AwardsandRecognitions;
