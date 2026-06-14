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
import { useParams } from "react-router-dom";
import { useFetchNewsById } from "../features/News/hook/useFetchNews";

const SingleNews = () => {
  const {id} = useParams();
  const {data:singleNewsData , isLoading:singleNewsDataLoading , error:singleNewsDataError} = useFetchNewsById(id);
  
  const lastNewsItem = [
    {
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore2,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore3,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore2,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore2,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore3,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore1,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
    {
      image: seeMore2,
      title: "الاستدامة في التصميم الداخلي",
      description: "سجلت دول مجلس التعاون الخليجي أداء متقدما في مؤشر الحرية الاقتصادية لعام 2026..",
      time: "منذ ٤ ساعات",
    },
  ];

  const renderModel = (item) => {
    console.log("Rendering model with id:", item.model_id); // Debug log
    
    switch(item.model_id) {
      case 5:
        return <SingleNewsModel5 data={item} />;
      case 7:
        return <SingleNewsModel7 data={item} />;
      case 8:
        return <SingleNewsModel8 data={item} />;
      case 10:
        return <SingleNewsModel10 data={item} />;
      case 12:
        return <SingleNewsModel12 data={item} />;
      case 13:
        return <SingleNewsModel13 data={item} />;
      case 14:
        return <SingleNewsModel14 data={item} />;
      case 15:
        return <SingleNewsModel15 data={item} />;
      case 16:
        return <SingleNewsModel16 data={item} />;
      default:
        console.log("No match for model_id:", item.model_id);
        return null;
    }
  };

  // Show loading state
  if (singleNewsDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container1 mx-auto lg:mt-0 mt-[5rem]">
      <SinlgeNewsBanner singleNewsData={singleNewsData}/>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[1.5rem]">
        <div className="lg:col-span-8 col-span-1 mt-[2rem]">
          {singleNewsData?.news_contents?.map((item, index) => {
            console.log("Mapping item:", item); // Debug log
            if (item.model_id === 5 || item.model_id === 15 || item.model_id === 16) {
              return <div key={index}>{renderModel(item)}</div>;
            }
            return null;
          })}
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
      
      {singleNewsData?.news_contents?.map((item, index) => {
        if (item.model_id !== 5 && item.model_id !== 15 && item.model_id !== 16) {
          return <div key={index}>{renderModel(item)}</div>;
        }
        return null;
      })}
    </div>
  );
};

export default SingleNews;