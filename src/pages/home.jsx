// Home.jsx
import { useState, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import ModelFourHero from "../features/home/heroWedget/component/modelFourHero";
import ModelOneHero from "../features/home/heroWedget/component/modelOneHero";
import ModelThreeHero from "../features/home/heroWedget/component/modelThreeHero";
import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
import { useFetchHomePage } from "../features/home/heroWedget/hook/useFetchHomePage";
import { fetchHomePage } from "../features/home/heroWedget/api/fetchHomePage";
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
import { useFetchContact } from "../features/contact/hook/useFetchContact";
import {
  useFetchCategories,
  useFetchCategoryById,
  usefetchDifferentNews,
  usefetchMostViewedNews,
} from "../features/News/hook/useFetchNews";
import { useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";

const heroComponents = {
  1: ModelOneHero,
  2: ModelTwoHero,
  3: ModelThreeHero,
  4: ModelFourHero,
};

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

const mediaComponents = {
  5: MediaModelOne,
  6: MediaModelTwo,
};

const Home = () => {
  const { id } = useParams();
  const {
    data: contactData,
    isLoading: contactDataLoading,
    error: contactDataError,
  } = useFetchContact();

  // Get all sections
  const { data: homePageData, isLoading, error } = useFetchHomePage();
  const {
    data: diffrentNewsData,
    isLoading: diffrentNewsDataLoading,
    error: diffrentNewsDataError,
  } = usefetchDifferentNews();
  const {
    data: mostViewdNewsData,
    isLoading: mostViewdNewsDataLoading,
    error: mostViewdNewsDataError,
  } = usefetchMostViewedNews();
  // State to track pages per section
  const [sectionPages, setSectionPages] = useState({});
  // Store paginated data for each section
  const [paginatedData, setPaginatedData] = useState({});
  // Track loading state per section
  const [loadingSections, setLoadingSections] = useState({});

  const handlePageChange = (sectionId, newPage) => {
    setLoadingSections((prev) => ({ ...prev, [sectionId]: true }));
    setSectionPages((prev) => ({ ...prev, [sectionId]: newPage }));
  };

  // Prepare queries for paginated sections (include media sections)
  const sectionsNeedingPagination =
    homePageData?.data?.filter(
      (item) =>
        item.home_model_id >= 7 ||
        item.home_model_id === 5 ||
        item.home_model_id === 6,
    ) || [];

  // Create a map of section ID to its query
  const sectionQueryMap = sectionsNeedingPagination
    .filter(
      (section) => sectionPages[section.id] && sectionPages[section.id] !== 1,
    )
    .map((section) => ({
      sectionId: section.id,
      page: sectionPages[section.id],
      queryKey: ["home-page", section.id, sectionPages[section.id]],
      queryFn: () => fetchHomePage(section.id, sectionPages[section.id]),
    }));

  // Execute all pagination queries in parallel
  const paginationResults = useQueries({
    queries: sectionQueryMap.map((q) => ({
      queryKey: q.queryKey,
      queryFn: q.queryFn,
      placeholderData: (previousData) => previousData,
    })),
  });

  // Store paginated data when results come in and clear loading state
  useEffect(() => {
    sectionQueryMap.forEach((query, index) => {
      const result = paginationResults[index];

      if (result?.data?.data && !result.isLoading) {
        const foundSection = result.data.data.find(
          (item) => item.id === query.sectionId,
        );
        if (foundSection) {
          setPaginatedData((prev) => ({
            ...prev,
            [query.sectionId]: {
              data: foundSection,
              page: query.page,
            },
          }));
          setLoadingSections((prev) => ({ ...prev, [query.sectionId]: false }));
        }
      }

      if (result?.isError) {
        setLoadingSections((prev) => ({ ...prev, [query.sectionId]: false }));
      }
    });
  }, [paginationResults, sectionQueryMap]);

  // Helper functions
  const getItemsArray = (items) => {
    if (Array.isArray(items)) return items;
    if (items?.data && Array.isArray(items.data)) return items.data;
    return [];
  };

  const getPaginationInfo = (items) => ({
    currentPage: items?.current_page || 1,
    lastPage: items?.last_page || 1,
  });

  // Get section data (either from initial load or paginated)
  const getSectionData = (section) => {
    const currentPage = sectionPages[section.id];

    if (!currentPage || currentPage === 1) {
      return section;
    }

    const paginated = paginatedData[section.id];
    if (paginated && paginated.page === currentPage) {
      return paginated.data;
    }

    return section;
  };

  // Check if a section is currently loading
  const isSectionLoading = (sectionId) => {
    const currentPage = sectionPages[sectionId];
    if (!currentPage || currentPage === 1) return false;
    return loadingSections[sectionId] === true;
  };

  if (isLoading) {
    return (
      <div className="lg:mt-0 mt-[6rem] flex justify-center items-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:mt-0 mt-[6rem] flex justify-center items-center min-h-screen">
        <div className="text-center text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  const heroSections =
    homePageData?.data?.filter(
      (item) => item.home_model_id >= 1 && item.home_model_id <= 4,
    ) || [];
  const mediaSections =
    homePageData?.data?.filter(
      (item) => item.home_model_id === 5 || item.home_model_id === 6,
    ) || [];

  return (
    <HelmetProvider>
      <MetaHelmet title={"Home"} description={"Home"} />
      <div className="lg:mt-0 mt-[6rem]">
        {/* Hero Sections */}
        {heroSections.map((section) => {
          const HeroComponent = heroComponents[section.home_model_id];
          return HeroComponent ? (
            <HeroComponent key={`hero-${section.id}`} data={section} />
          ) : null;
        })}

        {/* Media Sections */}
        {mediaSections.map((section) => {
          const MediaComponent = mediaComponents[section.home_model_id];
          if (!MediaComponent) return null;

          const currentPage = sectionPages[section.id] || 1;
          const pagination = getPaginationInfo(section.items);
          const isLoading = isSectionLoading(section.id);
          const sectionData = getSectionData(section);

          return (
            <MediaComponent
              key={`media-${section.id}`}
              data={{ ...sectionData, items: getItemsArray(sectionData.items) }}
              sectionId={section.id}
              currentPage={currentPage}
              totalPages={pagination.lastPage}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          );
        })}

        {/* News Sections */}
        {sectionsNeedingPagination
          .filter((section) => section.home_model_id >= 7)
          .map((section) => {
            const NewsComponent = newsComponents[section.home_model_id];
            if (!NewsComponent) return null;

            const sectionData = getSectionData(section);
            const currentPage = sectionPages[section.id] || 1;
            const pagination = getPaginationInfo(sectionData.items);
            const isLoading = isSectionLoading(section.id);

            return (
              <NewsComponent
                key={`news-${section.id}`}
                data={{
                  ...sectionData,
                  items: getItemsArray(sectionData.items),
                }}
                sectionId={section.id}
                homePageId={section.id} // Pass the section id as homePageId
                currentPage={currentPage}
                totalPages={pagination.lastPage}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                contactData={contactData}
                diffrentNewsData={diffrentNewsData}
                mostViewdNewsData={mostViewdNewsData}
              />
            );
          })}
      </div>
    </HelmetProvider>
  );
};

export default Home;
