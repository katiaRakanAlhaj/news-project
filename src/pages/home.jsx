// Home.jsx
import ModelFourHero from "../features/home/heroWedget/component/modelFourHero";
import ModelOneHero from "../features/home/heroWedget/component/modelOneHero";
import ModelThreeHero from "../features/home/heroWedget/component/modelThreeHero";
import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
import { useFetchHomePage } from "../features/home/heroWedget/hook/useFetchHomePage";
import MediaModelOne from "../features/home/mediaWedget/component/mediaModelOne";
import MediaModelTwo from "../features/home/mediaWedget/component/mediaModelTwo";
import NewsModelEight from "../features/home/newsWedget.jsx/component/newsModelEight";
import NewsModelFive from "../features/home/newsWedget.jsx/component/newsModelFive";
import NewsModelFour from "../features/home/newsWedget.jsx/component/newsModelFour";
import NewsModelNine from "../features/home/newsWedget.jsx/component/newsModelNine";
import NewsModelOne from "../features/home/newsWedget.jsx/component/newsModelOne";
import NewsModelSeven from "../features/home/newsWedget.jsx/component/newsModelSeven";
import NewsModelSix from "../features/home/newsWedget.jsx/component/newsModelSix";
import NewsModelThree from "../features/home/newsWedget.jsx/component/newsModelThree";
import NewsModelTwo from "../features/home/newsWedget.jsx/component/newsModelTwo";

// Hero component mapper (models 1-4)
const heroComponents = {
  1: ModelOneHero,
  2: ModelTwoHero,
  3: ModelThreeHero,
  4: ModelFourHero,
};

// News component mapper (models 7-15)
// 7->NewsModelOne, 8->NewsModelTwo, 9->NewsModelThree, 10->NewsModelFour, 
// 11->NewsModelFive, 12->NewsModelSix, 13->NewsModelSeven, 14->NewsModelEight, 15->NewsModelNine
const newsComponents = {
  7: NewsModelOne,
  8: NewsModelTwo,
  9: NewsModelThree,
  10: NewsModelFour,
  11: NewsModelFive,
  12: NewsModelSix,
  13: NewsModelSeven,
  14: NewsModelEight,
  15: NewsModelNine,
};

const Home = () => {
  const { data: homePageData, isLoading: homePageDataLoading, error: homePageDataError } = useFetchHomePage();

  if (homePageDataLoading) {
    return (
      <div className="lg:mt-0 mt-[6rem] flex justify-center items-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (homePageDataError) {
    return (
      <div className="lg:mt-0 mt-[6rem] flex justify-center items-center min-h-screen">
        <div className="text-center text-red-500">Error: {homePageDataError.message}</div>
      </div>
    );
  }

  // Filter sections by type
  const heroSections = homePageData?.data?.filter(item => item.home_model_id >= 1 && item.home_model_id <= 4) || [];
  const newsSections = homePageData?.data?.filter(item => item.home_model_id >= 7 && item.home_model_id <= 15) || [];

  // Helper function to extract items (handles both array and pagination object)
  const getItemsArray = (items) => {
    if (Array.isArray(items)) {
      return items;
    }
    if (items && items.data && Array.isArray(items.data)) {
      return items.data;
    }
    return [];
  };

  return (
    <div className="lg:mt-0 mt-[6rem]">
      {/* Dynamic Hero Sections based on API */}
      {heroSections.map((section) => {
        const HeroComponent = heroComponents[section.home_model_id];
        return HeroComponent ? (
          <HeroComponent key={`hero-${section.id}`} data={section} />
        ) : null;
      })}
      
      {/* Dynamic News Sections based on API */}
      {newsSections.map((section) => {
        const NewsComponent = newsComponents[section.home_model_id];
        // Prepare data with items array (handle pagination for model 7)
        const sectionData = {
          ...section,
          items: getItemsArray(section.items)
        };
        return NewsComponent ? (
          <NewsComponent key={`news-${section.id}`} data={sectionData} />
        ) : null;
      })}
      
      {/* Static Media Sections */}
      <MediaModelOne />
      <MediaModelTwo />
    </div>
  );
};

export default Home;