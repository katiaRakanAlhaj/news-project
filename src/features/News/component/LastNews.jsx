import seeMore1 from "../../../assets/images/seeMore1.png";
import seeMore2 from "../../../assets/images/seeMore2.png";
import seeMore3 from "../../../assets/images/seeMore3.png";
import MostViewedSection from "../../../ui/MostViewedSection";

const LastNews = () => {
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
    <div>
      <div className="flex gap-x-2 items-center">
        <h1 className="text-negative font-bold text-md text-nowrap">
          اخر الاخبار
        </h1>
        <div className="bg-negative w-full h-[0.01rem]"></div>
      </div>
      <div className="mt-2">
        <MostViewedSection activeTab={null} mostViewedData={lastNewsItem} />
      </div>
    </div>
  );
};

export default LastNews;
