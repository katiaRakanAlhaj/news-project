import i18next from "i18next";
import newsImage1 from "../../../../assets/images/newsImage1.png";
import newsImage2 from "../../../../assets/images/newsImage2.png";
import newsImage3 from "../../../../assets/images/newsImage3.png";
import newsImage4 from "../../../../assets/images/newsImage4.png";
import NewsCard from "../../../../ui/newsCard";
import TitleSection from "../../../../ui/titleSection";
import { useState } from "react";
import AdvertisementSpace from "../../../../assets/images/AdvertisementSpace.png";
const NewsModelFive = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const news = [
    {
      image: newsImage1,
      title: "إنهاء الأعمال العدائية ضد إيران.. رسالة ترمب تفجر جدلا بواشنطن",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "سياسة",
    },
    {
      image: newsImage2,
      title: "شهيدان في غزة وتحذيرات من انهيار القطاع الصحي",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "سياسة",
    },
    {
      image: newsImage3,
      title:
        "أكبر شركة شحن بالعالم تطلق خطا ملاحيا بين أوروبا والشرق الأوسط عبر السعودية",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "اقتصاد",
    },
    {
      image: newsImage4,
      title: "دول الخليج تتجاوز المتوسط العالمي في مؤشر الحرية الاقتصادية 2026",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
      type: "اقتصاد",
    },
  ];

  const surveyOptions = [
    { id: 1, label: "يسير في الطريق الصحيح" },
    { id: 2, label: "يحتاج للمزيد من الوقت" },
    { id: 3, label: "لا يزال في بداياته" },
  ];

  const handleChoiceChange = (value) => {
    setSelectedChoice(value);
  };

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <div className="grid grid-cols-12 gap-x-[2rem]">
        {/* first column */}
        <div className="col-span-9">
          <TitleSection title={"أحدث الأخبار"} />
          <div className="grid grid-cols-2 gap-y-[2rem] gap-x-[0.5rem] mt-[1rem]">
            {news.map((item, index) => (
              <NewsCard
                key={index}
                image={item.image}
                title={item.title}
                date={item.date}
                views={item.views}
                type={item.type}
              />
            ))}
          </div>
        </div>

        {/* second column - Survey */}
        <div className="col-span-3">
          {/* استبيان  */}
          <div
            style={{ boxShadow: "0px 1px 2px 0px #0000000D" }}
            className="w-full h-auto px-[1.5rem] py-[1rem] rounded-lg bg-white border border-[#C1C6D6]"
          >
            <h1 className="text-secondary text-sm mt-1">استبيان</h1>
            <p className="text-secondary text-sm mt-4 font-bold">
              ما هو رأيك في التحول الرقمي الحالي في المنطقة؟
            </p>

            <div className="mt-4 space-y-3">
              {surveyOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="survey" // Add same name to make them mutually exclusive
                    value={option.value}
                    checked={selectedChoice === option.value}
                    onChange={() => handleChoiceChange(option.value)}
                    className="w-3 h-3 border border-[#C1C6D6] text-secondary focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-secondary text-xs">{option.label}</span>
                </label>
              ))}
            </div>
            <button className="w-full h-[2.5rem] mt-4 rounded-lg bg-secondary text-sm font-bold text-white">
              {i18next.t("news_wedget.vote_now")}
            </button>
          </div>
          {/* AdvertisementSpace */}
          <div className="w-full h-[14rem] relative bg-[#E5E7EB] border border-dashed border-gray-300 mt-[1.5rem] rounded-lg">
            <img
              src={AdvertisementSpace}
              className="h-[10rem] w-full object-cover mt-[2rem]"
            />
            <p className="text-nowrap absolute left-1/4 ml-[3rem] text-[#9CA3AF] text-xs top-1/2">
              مساحة إعلانية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModelFive;
