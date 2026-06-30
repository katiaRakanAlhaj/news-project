import { useState } from "react";
import MediaBanner from "../features/media/component/mediaBanner";
import MediaGrid from "../features/media/component/mediaGrid";
import { useFetchMedia } from "../features/media/hook/useFetchMedia";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import ScrollToTop from "../component/scrollToTop/scrollToTop";
const Media = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: mediaData,
    isLoading: mediaDataLoading,
    error: mediaDataError,
    isFetching: mediaDataFetching,
  } = useFetchMedia(currentPage);
  // Show loading for initial load
  if (mediaDataLoading && currentPage === 1) {
    return <Loader />;
  }

  if (mediaDataError) {
    return <ErrorMessageNetwork />;
  }

  return (
    <HelmetProvider>
      <ScrollToTop />
      <MetaHelmet title={"Media"} description={"Media"} />
      <div className="container1 mx-auto">
        <MediaBanner mediaData={mediaData} />
        <MediaGrid
          mediaDataFetching={mediaDataFetching}
          mediaData={mediaData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </HelmetProvider>
  );
};
export default Media;
