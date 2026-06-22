import { useState } from "react";
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
  usefetchDifferentNews,
  usefetchMostViewedNews,
} from "../features/News/hook/useFetchNews";
import { useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import ScrollToTop from "../component/scrollToTop/scrollToTop";

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
  const { data: contactData } = useFetchContact();
  const { lang } = useParams();
  const currentLang = lang || "ar";
  // Initial layout fetch
  const { data: homePageData, isLoading, error } = useFetchHomePage();
  const { data: diffrentNewsData } = usefetchDifferentNews();
  const { data: mostViewdNewsData } = usefetchMostViewedNews();

  // Track page counts across unique section entities with category support
  const [sectionPages, setSectionPages] = useState({});

  // Track active categories for each section
  const [activeCategories, setActiveCategories] = useState({});

  // Handle page change with category support
  const handlePageChange = (sectionId, newPage, categoryId = null) => {
    // Create a unique key that includes both sectionId and categoryId if present
    const pageKey = categoryId ? `${sectionId}-${categoryId}` : `${sectionId}`;
    setSectionPages((prev) => ({ ...prev, [pageKey]: newPage }));
  };

  // Handle category change tracking
  const handleCategoryChange = (sectionId, categoryId) => {
    setActiveCategories((prev) => ({ ...prev, [sectionId]: categoryId }));
  };

  // Target collection profiles needing lazy dynamic pagination properties
  const sectionsNeedingPagination =
    homePageData?.data?.filter(
      (item) =>
        item.home_model_id >= 7 ||
        item.home_model_id === 5 ||
        item.home_model_id === 6,
    ) || [];

  // Get the current page for a specific section and category
  const getCurrentPage = (sectionId, categoryId = null) => {
    const pageKey = categoryId ? `${sectionId}-${categoryId}` : `${sectionId}`;
    return sectionPages[pageKey] || 1;
  };

  // Compose tracking maps representing ongoing query items
  const activePaginationQueries = sectionsNeedingPagination
    .filter((section) => {
      // Check if we have pages for any category in this section
      const hasPage = Object.keys(sectionPages).some(
        (key) => key === `${section.id}` || key.startsWith(`${section.id}-`),
      );
      return hasPage;
    })
    .map((section) => {
      // Find the page for this section (could be for a specific category)
      let page = 1;
      let categoryId = null;

      // Check if there's a specific category page
      const activeCategoryId = activeCategories[section.id];
      if (activeCategoryId) {
        const categoryKey = `${section.id}-${activeCategoryId}`;
        if (sectionPages[categoryKey]) {
          page = sectionPages[categoryKey];
          categoryId = activeCategoryId;
        }
      }

      // If no category-specific page found, check for section-level page
      if (page === 1 && sectionPages[section.id]) {
        page = sectionPages[section.id];
      }

      return {
        sectionId: section.id,
        page: page,
        categoryId: categoryId,
        queryKey: categoryId
          ? ["home-page", section.id, page, categoryId]
          : ["home-page", section.id, page],
        queryFn: () => fetchHomePage(section.id, page, categoryId),
      };
    });

  // Perform isolated dynamic query hook routines concurrently
  const paginationResults = useQueries({
    queries: activePaginationQueries.map((q) => ({
      queryKey: q.queryKey,
      queryFn: q.queryFn,
      placeholderData: (previousData) => previousData, // Native tool caching prevents flickers
    })),
  });

  // Structural parsing safely handling varying array payload definitions
  const getItemsArray = (items) => {
    if (Array.isArray(items)) return items;
    if (items?.data && Array.isArray(items.data)) return items.data;
    return [];
  };

  const getPaginationInfo = (items) => ({
    currentPage: items?.current_page || 1,
    lastPage: items?.last_page || 1,
  });

  // Resolves the exact dataset status and fetch status per unique section instance
  const getSectionState = (section) => {
    const activeCategoryId = activeCategories[section.id];
    const pageKey = activeCategoryId
      ? `${section.id}-${activeCategoryId}`
      : `${section.id}`;
    const currentPage = sectionPages[pageKey] || 1;

    if (currentPage === 1 && !activeCategoryId) {
      return { data: section, isExecuting: false };
    }

    // Find the query for this section and category
    const queryIndex = activePaginationQueries.findIndex((q) => {
      if (activeCategoryId) {
        return (
          q.sectionId === section.id &&
          q.categoryId === activeCategoryId &&
          q.page === currentPage
        );
      }
      return (
        q.sectionId === section.id && q.page === currentPage && !q.categoryId
      );
    });

    if (queryIndex !== -1) {
      const queryResult = paginationResults[queryIndex];
      const serverPayload = queryResult?.data?.data?.find(
        (item) => item.id === section.id,
      );

      return {
        data: serverPayload || section,
        isExecuting: queryResult?.isFetching || false, // Clean fallback background indicator
      };
    }

    return { data: section, isExecuting: false };
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessageNetwork />;
  }

  const heroSections =
    homePageData?.data?.filter(
      (i) => i.home_model_id >= 1 && i.home_model_id <= 4,
    ) || [];
  const mediaSections =
    homePageData?.data?.filter(
      (i) => i.home_model_id === 5 || i.home_model_id === 6,
    ) || [];

  return (
    <HelmetProvider>
      <ScrollToTop />
      <MetaHelmet title={"Home"} description={"Home"} />
      <div className="lg:mt-0 mt-[6rem]">
        {/* Hero Sections */}
        {heroSections.map((section) => {
          const HeroComponent = heroComponents[section.home_model_id];
          return HeroComponent ? (
            <HeroComponent
              currentLang={currentLang}
              key={`hero-${section.id}`}
              data={section}
            />
          ) : null;
        })}

        {/* Media Sections */}
        {mediaSections.map((section) => {
          const MediaComponent = mediaComponents[section.home_model_id];
          if (!MediaComponent) return null;

          const currentPage = getCurrentPage(section.id);
          const { data: sectionData, isExecuting } = getSectionState(section);
          const pagination = getPaginationInfo(sectionData.items);

          return (
            <MediaComponent
              key={`media-${section.id}`}
              data={{ ...sectionData, items: getItemsArray(sectionData.items) }}
              sectionId={section.id}
              currentPage={currentPage}
              totalPages={pagination.lastPage}
              onPageChange={handlePageChange}
              isLoading={isExecuting}
            />
          );
        })}

        {/* News Sections */}
        {sectionsNeedingPagination
          .filter((section) => section.home_model_id >= 7)
          .map((section) => {
            const NewsComponent = newsComponents[section.home_model_id];
            if (!NewsComponent) return null;

            const { data: sectionData, isExecuting } = getSectionState(section);
            const activeCategoryId = activeCategories[section.id];
            const currentPage = getCurrentPage(section.id, activeCategoryId);
            const pagination = getPaginationInfo(sectionData.items);

            return (
              <NewsComponent
                key={`news-${section.id}`}
                data={{
                  ...sectionData,
                  items: getItemsArray(sectionData.items),
                }}
                sectionId={section.id}
                homePageId={section.id}
                currentPage={currentPage}
                totalPages={pagination.lastPage}
                onPageChange={handlePageChange}
                onCategoryChange={handleCategoryChange}
                isLoading={isExecuting}
                categoryPages={sectionPages}
                contactData={contactData}
                diffrentNewsData={diffrentNewsData}
                mostViewdNewsData={mostViewdNewsData}
                currentLang = {currentLang}
              />
            );
          })}
      </div>
    </HelmetProvider>
  );
};
export default Home;
