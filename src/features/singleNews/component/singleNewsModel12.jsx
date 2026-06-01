import { useState } from "react";
import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel12 = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "UNAMI",
      data: {
        title: "المساعدات الإنسانية في العراق",
        description:
          "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا .",
      },
    },
    {
      name: "UNDP",
      data: {
        title: "التنمية المستدامة بدعم من الأمم المتحدة",
        description:
          "نص عن التنمية المستدامة وجهود الأمم المتحدة في دعم العراق لتحقيق أهداف التنمية وتحسين البنية التحتية والخدمات الأساسية.",
      },
    },
    {
      name: "UNESCO",
      data: {
        title: "حقوق الإنسان في العراق",
        description:
          "نص عن حقوق الإنسان ودور الأمم المتحدة في حماية الحقوق الأساسية للمواطنين العراقيين وتعزيز سيادة القانون.",
      },
    },
    {
      name: "WHO",
      data: {
        title: "الحوار الوطني العراقي",
        description:
          "نص عن جهود الأمم المتحدة في تسهيل الحوار الوطني بين الأطراف العراقية المختلفة لتحقيق الاستقرار السياسي.",
      },
    },
  ];

  return (
    <div className="mt-[2rem]">
      <ModelTitle title={"عمل الأمم المتحدة في العراق"} />

      {/* Tabs Header */}
      <div className="mt-[1rem] flex flex-wrap gap-2 border-b border-[#C4C4C4]">
        {tabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-2 px-4 text-sm transition-colors cursor-pointer ${
              activeTab === index
                ? "text-[#005BBF] font-bold border-b-2 border-[#005BBF]"
                : "text-[#959595] font-[400]"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-[1rem]">
        <h2 className="text-[#000000] font-bold text-md mb-2">
          {tabs[activeTab]?.data?.title}
        </h2>
        <p className="text-[#000000] text-sm leading-relaxed">
          {tabs[activeTab]?.data?.description}
        </p>
      </div>
    </div>
  );
};

export default SingleNewsModel12;
