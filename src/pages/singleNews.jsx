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
import MostViewedSection from "../ui/MostViewedSection";
import { useParams } from "react-router-dom";
import {
  useFetchLatestNews,
  useFetchNewsById,
} from "../features/News/hook/useFetchNews";
import { useFetchContact } from "../features/contact/hook/useFetchContact";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import ScrollToTop from "../component/scrollToTop/scrollToTop";

const SingleNews = () => {
  const { id } = useParams();
  const {
    data: singleNewsData,
    isLoading: singleNewsDataLoading,
    error: singleNewsDataError,
  } = useFetchNewsById(id);
  const {
    data: contactData,
    isLoading: contactDataLoading,
    error: contactDataError,
  } = useFetchContact();
  const {
    data: latestNewsData,
    isLoading: latestNewsDataLoading,
    error: latestNewsDataError,
  } = useFetchLatestNews();
  if (singleNewsDataLoading || contactDataLoading || latestNewsDataLoading) {
    return <Loader />;
  }
  if (singleNewsDataError || contactDataError || latestNewsDataError) {
    return <ErrorMessageNetwork />;
  }
  // Format the date for the most viewed section
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get time difference in Arabic
  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "منذ أقل من ساعة";
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعات`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `منذ ${diffInDays} أيام`;
    }
  };

  // Use API data for most viewed section
  const mostViewedData =
    latestNewsData?.data?.map((item) => ({
      image: item.news_image,
      title: item.news_title,
      description: item.news_description,
      time: getTimeAgo(item.date),
      id: item.id,
    })) || [];

  const renderModel = (item) => {
    console.log("Rendering model with id:", item.model_id);

    switch (item.model_id) {
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
  const categoryName = singleNewsData?.category;
  return (
    <HelmetProvider>
      <ScrollToTop/>
      <MetaHelmet title={categoryName} description={categoryName} />
      <div className="container1 mx-auto lg:mt-0 mt-[5rem]">
        <SinlgeNewsBanner
          contactData={contactData}
          singleNewsData={singleNewsData}
        />
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[1.5rem]">
          <div className="lg:col-span-8 col-span-1 mt-[2rem]">
            {singleNewsData?.news_contents?.map((item, index) => {
              console.log("Mapping item:", item);
              if (
                item.model_id === 5 ||
                item.model_id === 15 ||
                item.model_id === 16
              ) {
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
            <MostViewedSection
              activeTab={null}
              mostViewedData={mostViewedData}
            />
          </div>
        </div>

        {singleNewsData?.news_contents?.map((item, index) => {
          if (
            item.model_id !== 5 &&
            item.model_id !== 15 &&
            item.model_id !== 16
          ) {
            return <div key={index}>{renderModel(item)}</div>;
          }
          return null;
        })}
      </div>
    </HelmetProvider>
  );
};

export default SingleNews;
