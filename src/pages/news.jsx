import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
import LastNews from "../features/News/component/LastNews";
import NewsGrid from "../features/News/component/NewsGrid";
import {
  useFetchCategoryById,
  useFetchLatestNews,
} from "../features/News/hook/useFetchNews";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import ScrollToTop from "../component/scrollToTop/scrollToTop";

const News = () => {
  const { id ,lang } = useParams();
  const currentLang = lang || "ar";
  const {
    data: categoryData,
    isLoading: categoryDataLoading,
    error: categoryDataError,
  } = useFetchCategoryById(id, 1); // Fetch first page initially

  const {
    data: latestNewsData,
    isLoading: latestNewsDataLoading,
    error: latestNewsDataError,
  } = useFetchLatestNews();

  // Prepare data for ModelTwoHero - take first 3 items from latest news
  const heroData = categoryData?.news?.slice(0, 3) || [];

  // Get category name for meta title
  const categoryName = categoryData?.name || "News";
  if (categoryDataLoading || latestNewsDataLoading) {
    return <Loader />;
  }
  if (categoryDataError || latestNewsDataError) {
    return <ErrorMessageNetwork />;
  }
  return (
    <>
      <HelmetProvider>
        <ScrollToTop/>
        <MetaHelmet title={categoryName} description={categoryName} />
        <div className="lg:mt-0 mt-[6rem]">
          {/* Hero section with latest news */}
          <ModelTwoHero currentLang = {currentLang} data={heroData} />

          <div className="container1 mx-auto">
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[4rem] mt-[2rem] lg:gap-y-0 gap-y-[2rem]">
              {/* First column - News Grid */}
              <div className="lg:col-span-8 col-span-1">
                <NewsGrid categoryData={categoryData} categoryId={id} />
              </div>

              {/* Second column - Last News */}
              <div className="lg:col-span-4 col-span-1">
                <LastNews currentLang = {currentLang} latestNewsData={latestNewsData} />
              </div>
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
};

export default News;
