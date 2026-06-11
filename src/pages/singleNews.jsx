import SinlgeNewsBanner from "../features/singleNews/component/singleNewsBanner";
import SingleNewsModel10 from "../features/singleNews/component/singleNewsModel10";
import SingleNewsModel12 from "../features/singleNews/component/singleNewsModel12";
import SingleNewsModel13 from "../features/singleNews/component/singleNewsModel13";
import SingleNewsModel14 from "../features/singleNews/component/singleNewsModel14";
import SingleNewsModel15 from "../features/singleNews/component/singleNewsModel15";
import SingleNewsModel16 from "../features/singleNews/component/singleNewsModel16";
import SingleNewsModel5 from "../features/singleNews/component/singleNewsModel5";
import SingleNewsModel7 from "../features/singleNews/component/singleNewsModel7";
import SingleNewsModel8 from "../features/singleNews/component/singleNewsModel8";
import seeMore1 from "../assets/images/seeMore1.png";
import seeMore2 from "../assets/images/seeMore2.png";
import seeMore3 from "../assets/images/seeMore3.png";
import MostViewedSection from "../ui/MostViewedSection";
const SingleNews = () => {
  const lastNewsItem = [
    {
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
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
      title: "الاستدامة في التصميم الداخلي",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
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
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
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
      title: "الاستدامة في التصميم الداخلي",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore2,
      title: "الاستدامة في التصميم الداخلي",
      description:
        "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
  ];
  return (
    <div className="container1 mx-auto lg:mt-0 mt-[5rem]">
      <SinlgeNewsBanner />
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[1.5rem]">
        <div className="lg:col-span-8 col-span-1 mt-[2rem]">
          <SingleNewsModel5 />
          <SingleNewsModel15 />
          <SingleNewsModel16 />
        </div>
        <div className="lg:col-span-4 col-span-1 mt-[2rem]">
          <div className="flex gap-x-2 items-center">
            <h1 className="text-negative font-bold text-md text-nowrap">
              اخر الاخبار
            </h1>
            <div className="bg-negative w-full h-[0.01rem]"></div>
          </div>
          <MostViewedSection activeTab={null} mostViewedData={lastNewsItem} />
        </div>
      </div>
      <SingleNewsModel7 />
      <SingleNewsModel12 />
      <SingleNewsModel13 />
      <SingleNewsModel14 />
      <SingleNewsModel8 />
      <SingleNewsModel10 />
    </div>
  );
};
export default SingleNews;
