import AboutUsTitle from "../../../ui/aboutUsTitle";
import person1 from "../../../assets/images/person1.png";
import person2 from "../../../assets/images/person2.png";
import user from "../../../assets/images/user.svg";

const EditorialTeam = () => {
  const teamItems = [
    { image: person1, name: "أحمد منصور", desc: "رئيس التحرير" },
    { image: person2, name: "ليلى الهاشمي", desc: "مديرة التحرير" },
    { name: "ياسين الفهري", desc: "رئيس قسم التحقيقات" },
    { name: "سارة العامري", desc: "رئيسة قسم الاقتصاد" },
  ];

  return (
    <div className="h-auto w-full bg-white py-[2rem]">
      <div className="container1 mx-auto">
        <div className="flex flex-start">
          <AboutUsTitle title={"هيئة التحرير"} />
        </div>
        <div className="flex gap-x-3 items-center">
          <p className="text-[#5F5E5E] text-md mt-2 text-nowrap">
            نخبة من الصحفيين والمحللين الملتزمين بالمهنية
          </p>
          <div className="w-full h-[0.1rem] bg-[#005BBF] mt-2"></div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[1.5rem] mt-[2rem]">
          {teamItems.map((item, index) => (
            <div key={index}>
              {item.image ? (
                <img
                  className="h-[15rem] rounded-md w-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
              ) : (
                <div className="h-[15rem] rounded-md flex justify-center items-center w-full bg-[#E3E2E2]">
                  <img src={user} className="w-[2rem]" alt="user icon" />
                </div>
              )}
              <h1 className="text-lg font-bold mt-2 text-[#1B1C1C]">
                {item.name}
              </h1>
              <p className="text-sm text-[#005BBF] mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialTeam;
