import i18next from "i18next";
import TitleSection from "../../../../ui/titleSection";
import MostViewedSection from "../../../../ui/MostViewedSection";
import newsImage5 from "../../../../assets/images/newsImage5.png";
import seeMore1 from "../../../../assets/images/seeMore1.png";
import seeMore2 from "../../../../assets/images/seeMore2.png";
import seeMore3 from "../../../../assets/images/seeMore3.png";
import arrow2 from "../../../../assets/images/arrow2.svg";
import arrow1 from "../../../../assets/images/arrow1.svg";

const NewsModelThree = () => {
  // Direct array - no tabs needed
  const newsData = [
    {
      image: newsImage5,
      type: "فنون",
      title: "أسرار العمارة العربية في العصر الحديث",
    },
    {
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description:
        "تقنيات الذكاء الاصطناعي تُحدث ثورة في مجال الإعلام والصحافة الرقمية..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore2,
      title: "الاستدامة في التصميم الداخلي",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore3,
      title: "الذكاء الاصطناعي في الصحافة",
      description:
        "تقنيات الذكاء الاصطناعي تُحدث ثورة في مجال الإعلام والصحافة الرقمية..",
      time: "منذ ٦ ساعات",
    },
    {
      image: seeMore3,
      title: "السياحة المستدامة",
      description:
        "وجهات سياحية جديدة تتبنى مفاهيم الاستدامة البيئية في المنطقة..",
      time: "منذ ١٠ ساعات",
    },
  ];

  // Get first item for main column
  const mainNewsItem = newsData[0];

  return (
    <div className="container1 mx-auto mt-[2rem] px-4">
      <TitleSection title={i18next.t("news_wedget.latest_news")} />

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-[1rem] mt-[1rem]">
        {/* First column - Main News col-span-9 */}
        <div className="lg:col-span-9 col-span-1">
          <div className="relative">
            <img
              src={mainNewsItem.image}
              className="w-full h-[22.5rem] rounded-lg object-cover"
              alt="main news"
            />
            <div className={`absolute bottom-[2rem] ${i18next.language == "ar"?'right-[2rem]':'left-[2rem]'}`}>
              <button className="w-[4rem] h-[1.6rem] bg-secondary rounded-full text-white text-xs">
                فنون
              </button>
              <h1 className="font-bold text-white text-md mt-3">
                {mainNewsItem.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Second column - Most Viewed col-span-3 */}
        <div className="lg:col-span-3 col-span-1">
          {/* Passing full array but MostViewedSection will slice from second item */}
          <MostViewedSection mostViewedData={newsData.slice(1)} />
        </div>
      </div>
    </div>
  );
};

export default NewsModelThree;
