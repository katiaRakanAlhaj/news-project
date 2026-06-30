import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import auto from "../../../../assets/images/auto.svg";
import TitleSection from "../../../../ui/titleSection";
import { IoIosArrowBack } from "react-icons/io";
import i18next from "i18next";
import {
  containerVariants,
  CenteredSquareLoader,
} from "../../../../ui/animationNews";

const MediaModelOne = ({
  data,
  sectionId,
  currentPage,
  totalPages,
  onPageChange,
  isLoading: externalIsLoading,
}) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // Get items from API (handle pagination structure)
  const getItemsArray = (items) => {
    if (Array.isArray(items)) {
      return items;
    }
    if (items && items.data && Array.isArray(items.data)) {
      return items.data;
    }
    return [];
  };

  // Extract media items from API data
  const mediaItemsData = getItemsArray(data?.items || []);

  // Map API media items to the format needed for the component
  const mediaItems = mediaItemsData.map((item) => ({
    id: item.id,
    image: item.image,
    title: item.title || "فيديو",
    videoUrl: item.video_link || "",
  }));

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to handle video playback
  const handlePlayVideo = (itemId) => {
    setPlayingVideoId(itemId);
  };

  // Function to close video
  const handleCloseVideo = () => {
    setPlayingVideoId(null);
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1 && !externalIsLoading) {
      onPageChange(sectionId, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !externalIsLoading) {
      onPageChange(sectionId, currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    if (page !== currentPage && !externalIsLoading) {
      onPageChange(sectionId, page);
    }
  };

  // Don't render if no data
  if (!data || (!mediaItems.length && !externalIsLoading)) {
    return null;
  }

  // Take first item for main display
  const mainItem = mediaItems[0];
  // Take remaining items for thumbnails
  const thumbnailItems = mediaItems.slice(1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="container1 mx-auto mt-[2rem]"
    >
      <div className="mb-[1rem]">
        <TitleSection
          title={data.title || "معرض الفيديو"}
          showArrows={true}
          currentPage={currentPage}
          lastPage={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          isLoading={externalIsLoading}
        />
      </div>

      {/* Animated content with centered square loader */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {externalIsLoading ? (
            <CenteredSquareLoader key="loader" />
          ) : (
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Main Row - Large Image/Video */}
              <div className="relative flex justify-center items-center mt-[1rem]">
                {playingVideoId === mainItem.id && mainItem.videoUrl ? (
                  // Show Video
                  <div className="relative w-full h-[33rem] rounded-t-xl overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(mainItem.videoUrl)}?autoplay=1`}
                      title={mainItem.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    {/* Close button */}
                    <button
                      onClick={handleCloseVideo}
                      className="absolute top-4 right-4 bg-black bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-100 z-20"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  // Show Image
                  <>
                    <img
                      style={{ boxShadow: "0px 25px 50px -12px #00000040" }}
                      className="w-full lg:h-[45rem] h-[20rem] object-cover rounded-t-xl cursor-pointer"
                      src={mainItem.image}
                      alt={mainItem.title}
                      onClick={() =>
                        mainItem.videoUrl && handlePlayVideo(mainItem.id)
                      }
                    />
                    <div
                      className={`absolute bottom-[3rem] ${i18next.language == "ar" ? "lg:right-[2rem] right-[1rem]" : "lg:left-[2rem] left-[1rem]"} text-white font-bold lg:text-2xl md:text-xl text-md z-10`}
                    >
                      {mainItem.title}
                    </div>
                    <div className="absolute inset-0 bg-[#00000066] rounded-t-xl"></div>
                    {/* Centered circle for main image */}
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[5rem] h-[5rem] rounded-full bg-secondary cursor-pointer flex justify-center items-center"
                      onClick={() =>
                        mainItem.videoUrl && handlePlayVideo(mainItem.id)
                      }
                    >
                      <img className="w-[1.2rem]" src={auto} alt="play" />
                    </div>
                  </>
                )}
              </div>

              {/* Second Row - Thumbnails */}
              {thumbnailItems.length > 0 && (
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[0.5rem] mt-[0.5rem]">
                  {thumbnailItems.map((item) => (
                    <div key={item.id} className="flex flex-col space-y-2">
                      <div className="relative">
                        {playingVideoId === item.id && item.videoUrl ? (
                          // Show Video
                          <div className="relative w-full h-[12rem] rounded-xl overflow-hidden">
                            <iframe
                              className="w-full h-full"
                              src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.videoUrl)}?autoplay=1`}
                              title={item.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                            {/* Close button */}
                            <button
                              onClick={handleCloseVideo}
                              className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-100 z-20 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          // Show Image
                          <>
                            <img
                              src={item.image}
                              className="w-full lg:h-[12rem] h-[20rem] object-cover rounded-xl cursor-pointer"
                              alt={item.title}
                              onClick={() =>
                                item.videoUrl && handlePlayVideo(item.id)
                              }
                            />
                            <div className="absolute inset-0 bg-[#00000066] rounded-xl"></div>
                            {/* Centered circle for thumbnail */}
                            <div
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2rem] h-[2rem] rounded-full border border-white cursor-pointer flex justify-center items-center"
                              onClick={() =>
                                item.videoUrl && handlePlayVideo(item.id)
                              }
                            >
                              <img
                                className="w-[0.6rem]"
                                src={auto}
                                alt="play"
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <p className="text-primary font-bold lg:mt-0 mt-[0.5rem] text-md line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default MediaModelOne;
