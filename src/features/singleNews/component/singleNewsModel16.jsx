import united1 from "../../../assets/images/united1.png";
import united2 from "../../../assets/images/united2.png";
import united3 from "../../../assets/images/united3.png";
import united4 from "../../../assets/images/united4.png";
import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel16 = () => {
  const items = [
    {
      title: "ECOSOC",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير ",
      image: united1,
    },
    {
      title: "G77",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير ",
      image: united2,
    },
    {
      title: "UNFCCC",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير ",
      image: united3,
    },
    {
      title: "LDCs",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير",
      image: united4,
    },
  ];
  return (
    <div className="mt-[2rem]">
      <ModelTitle title={"اختصارات خاصة بالأمم المتحدة"} />
      <div className="grid md:grid-cols-2 gap-[2rem] mt-[1rem]">
        {items?.map((item) => (
          <div className="flex gap-x-[1rem]">
            <div className="h-[26.5rem] w-[0.15rem] bg-[#005BBF]"></div>
            <div className="flex flex-col space-y-2 mt-[1rem]">
              <h1 className="text-secondary font-bold text-lg">
                {item?.title}
              </h1>
              <p className="text-[#666666] text-md leading-relaxed line-clamp-5">
                {item.description}
              </p>
              <img
                src={item.image}
                className="w-full h-[19rem] rounded-md object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SingleNewsModel16;
