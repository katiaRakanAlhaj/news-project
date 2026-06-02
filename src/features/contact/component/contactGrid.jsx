import twitterContact from "../../../assets/images/twitterContact.svg";
import youtubeContact from "../../../assets/images/youtubeContact.svg";
import linkedinContact from "../../../assets/images/linkedinContact.svg";
import instgramContact from "../../../assets/images/instgramContact.svg";
import facebookContact from "../../../assets/images/facebookContact.svg";
import logoContact from "../../../assets/images/logoContact.svg";
const icons = [
  { icon: linkedinContact, name: "linkedin" },
  { icon: instgramContact, name: "instagram" },
  { icon: twitterContact, name: "twitter" },
  { icon: facebookContact, name: "facebook" },
  { icon: youtubeContact, name: "youtube" },
];

const inputClassName =
  "w-full h-[2.5rem] px-2 text-sm border border-[#474747] placeholder-[#474747]";
const ContactGrid = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[3rem] lg:gap-y-0 gap-y-[2rem] lg:px-0 px-[2rem]">
      {/* first column */}
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-[#000000] text-xl">تواصل معنا</h1>
        <p className="text-sm text-[#002F3C] mt-2 leading-relaxed">
          لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
          أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
          انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي
          يت
        </p>
        <div className="lg:flex gap-x-[3rem] lg:space-y-0 space-y-[2rem] mt-[2rem]">
          <div className="flex flex-col space-y-1">
            <h1 className="text-md font-bold text-[#000000]">
              بريد الالكتروني
            </h1>
            <p className="text-[#002F3C] text-sm">Alsahifa@INFO.COM</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-md font-bold text-[#000000]">مواقع التواصل</h1>
            <div className="flex gap-x-4">
              {icons?.map((icon) => (
                <img
                  src={icon.icon}
                  className={
                    icon.name === "facebook" ? "w-[0.5rem]" : "w-[1.2rem]"
                  }
                  alt={icon.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* second column */}
      <div
        style={{ boxShadow: "0px 0px 22px 0px #00000040" }}
        className="w-full h-auto py-[2rem] px-[2rem] rounded-lg"
      >
        <img className="w-[8rem]" src={logoContact} />
        <form className="flex flex-col space-y-2 mt-[1rem] w-full">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-[0.5rem] w-full">
            <input
              className={inputClassName}
              type="text"
              placeholder="الاسم الاول"
            />
            <input
              className={inputClassName}
              type="text"
              placeholder="الاسم الثاني"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-[0.5rem] w-full">
            <input
              className={inputClassName}
              type="text"
              placeholder="الايميل"
            />
            <input
              className={inputClassName}
              type="text"
              placeholder="الموضوع"
            />
          </div>
          <textarea
            placeholder="النص"
            className="w-full h-[10rem] p-2 text-sm border border-[#474747] placeholder-[#474747]"
          />
          <button className="w-full h-[3rem] bg-[#005BBF] text-white font-bold text-md mt-[1.8rem] cursor-pointer">
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
};
export default ContactGrid;
