import { useState } from "react";
import SinlgeNewsBanner from "../features/singleNews/component/singleNewsBanner";
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
import i18next from "i18next";
import SingleNewsModel1 from "../features/singleNews/component/SingleNewsModel1";
import SingleNewsModel2 from "../features/singleNews/component/SingleNewsModel2";
import SingleNewsModel3 from "../features/singleNews/component/SingleNewsModel3";
import SingleNewsModel4 from "../features/singleNews/component/SingleNewsModel4";
import SingleNewsModel5 from "../features/singleNews/component/SingleNewsModel5";
import SingleNewsModel6 from "../features/singleNews/component/SingleNewsModel6";
import SingleNewsModel7 from "../features/singleNews/component/SingleNewsModel7";
import SingleNewsModel8 from "../features/singleNews/component/SingleNewsModel8";
import SingleNewsModel9 from "../features/singleNews/component/SingleNewsModel9";
import SingleNewsModel10 from "../features/singleNews/component/SingleNewsModel10";
import SingleNewsModel12 from "../features/singleNews/component/SingleNewsModel12";
import SingleNewsModel13 from "../features/singleNews/component/SingleNewsModel13";
import SingleNewsModel14 from "../features/singleNews/component/SingleNewsModel14";
import SingleNewsModel15 from "../features/singleNews/component/SingleNewsModel15";
import SingleNewsModel16 from "../features/singleNews/component/SingleNewsModel16";
import SingleNewsModel17 from "../features/singleNews/component/SingleNewsModel17";
import SingleNewsModel18 from "../features/singleNews/component/SingleNewsModel18";
import SingleNewsModel11 from "../features/singleNews/component/singleNewsModel11";
const SingleNews = () => {
  const { id, lang } = useParams();
  const currentLang = lang || "ar";

  // State to handle sidebar expansion
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Get time difference with internationalization keys
  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return i18next.t("time.less_than_hour");
    } else if (diffInHours < 24) {
      return i18next.t("time.hours_ago", { count: diffInHours });
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return i18next.t("time.days_ago", { count: diffInDays });
    }
  };

  // 1. Transform all news items first
  const allMostViewedData =
    latestNewsData?.data?.map((item) => ({
      image: item.news_image,
      title: item.news_title,
      description: item.news_description,
      time: getTimeAgo(item.date),
      id: item.id,
    })) || [];

  // 2. Slice the items conditionally based on state (Show 4 items initially)
  const visibleSidebarData = isExpanded
    ? allMostViewedData
    : allMostViewedData.slice(0, 4);

  const renderModel = (item) => {
    switch (item.model_id) {
      case 1:
        return <SingleNewsModel1 data={item} />;
      case 2:
        return <SingleNewsModel2 data={item} />;
      case 3:
        return <SingleNewsModel3 data={item} />;
      case 4:
        return <SingleNewsModel4 data={item} />;
      case 5:
        return <SingleNewsModel5 data={item} />;
      case 6:
        return <SingleNewsModel6 data={item} />;
      case 7:
        return <SingleNewsModel7 data={item} />;
      case 8:
        return <SingleNewsModel8 data={item} />;
      case 9:
        return <SingleNewsModel9 data={item} />;

      case 10:
        return <SingleNewsModel10 data={item} />;
         case 11:
        return <SingleNewsModel11 data={item} />;
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
      case 17:
        return <SingleNewsModel17 data={item} />;
      case 18:
        return <SingleNewsModel18 data={item} />;
      // default:
      //   return null;
    }
  };

  const categoryName = singleNewsData?.category;

  // Check if news_contents is empty
  const isContentsEmpty =
    !singleNewsData?.news_contents || singleNewsData.news_contents.length === 0;

  return (
    <HelmetProvider>
      <ScrollToTop />
      <MetaHelmet title={categoryName} description={categoryName} />
      <div className="container1 mx-auto lg:mt-0 mt-[5rem]">
        <SinlgeNewsBanner
          currentLang={currentLang}
          contactData={contactData}
          singleNewsData={singleNewsData}
        />

        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[1.5rem]">
          {/* Main Content Area (Column 8) */}
          <div className="lg:col-span-8 col-span-1 mt-[2rem]">
            {isContentsEmpty ? (
              <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 rounded-xl bg-gray-50/50 text-center px-4">
                <img
                  src="https://www.gstatic.com/images/branding/product/2x/news_96dp.png"
                  alt={i18next.t("single_news.empty_alt")}
                  className="w-20 h-20 opacity-50 mb-4"
                />
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  {i18next.t("single_news.empty_title")}
                </h2>
                <p className="text-gray-400 max-w-sm text-md">
                  {i18next.t("single_news.empty_description")}
                </p>
              </div>
            ) : (
              // ✅ RENDER ALL MODELS HERE - NO FILTERING
              <div className="flex flex-col space-y-[2rem]">
                {singleNewsData?.news_contents?.map((item, index) => (
                  <div key={index}>{renderModel(item)}</div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Area (Column 4) */}
          <div className="lg:col-span-4 col-span-1 mt-[2rem]">
            <div className="flex gap-x-2 items-center">
              <h1 className="text-negative font-bold text-md text-nowrap">
                {i18next.t("single_news.latest_news_title")}
              </h1>
              <div className="bg-negative w-full h-[0.01rem]"></div>
            </div>

            <MostViewedSection
              currentLang={currentLang}
              activeTab={null}
              mostViewedData={visibleSidebarData}
            />

            {/* 3. Conditional See More / See Less Button */}
            {allMostViewedData.length > 4 && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-6 py-2 text-sm font-bold bg-negative text-white rounded shadow hover:bg-opacity-90 transition duration-200"
                >
                  {isExpanded
                    ? i18next.t("buttons.see_less") || "عرض أقل"
                    : i18next.t("buttons.see_more") || "عرض المزيد"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ❌ REMOVED: The separate bottom section that was outside the grid */}
        {/* All news content now renders inside the grid col-span-8 */}
      </div>
    </HelmetProvider>
  );
};

export default SingleNews;
