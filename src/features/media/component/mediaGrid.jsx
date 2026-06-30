import { useState, useEffect } from "react";
import mediaImage from "../../../assets/images/media.png";
import auto from "../../../assets/images/auto.svg";
import { useFetchMedia } from "../hook/useFetchMedia";
import i18next from "i18next";
import Loader from "../../../component/loader/loader";
import ErrorMessageNetwork from "../../../component/errorMessage/errorMessage";

const MediaGrid = ({
  mediaData,
  currentPage,
  setCurrentPage,
  mediaDataFetching,
}) => {
  const [allMediaItems, setAllMediaItems] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // Accumulate media items when new data arrives
  useEffect(() => {
    if (mediaData?.data) {
      if (currentPage === 1) {
        // If it's page 1, replace the items
        setAllMediaItems(mediaData.data);
      } else {
        // If it's a subsequent page, append new items
        setAllMediaItems((prev) => [...prev, ...mediaData.data]);
      }
    }
  }, [mediaData, currentPage]);

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
  const handleLoadMore = () => {
    if (currentPage < totalPages && !mediaDataFetching) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get pagination data
  const totalPages = mediaData?.meta?.last_page || 1;
  const currentPageFromApi = mediaData?.meta?.current_page || 1;

  return (
    <div>
      {/* Media Grid */}
      <div className="grid grid-cols-3 gap-[1rem] mt-[2rem]">
        {allMediaItems.map((item) => (
          <div
            key={item.id}
            className="relative w-full h-[24rem] rounded-3xl overflow-hidden"
          >
            {playingVideoId === item.id && item.video_link ? (
              // Show Video
              <div className="relative w-full h-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.video_link)}?autoplay=1`}
                  title={item.title}
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
                  className="w-full h-full object-cover"
                  src={item.image || mediaImage}
                  alt={item.title}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(0deg, #000000 0%, rgba(102, 102, 102, 0) 48.47%)`,
                    mixBlendMode: "multiply",
                  }}
                />
                {/* Center the play button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    className="w-[5rem] h-[5rem] cursor-pointer rounded-full bg-secondary flex justify-center items-center"
                    onClick={() => item.video_link && handlePlayVideo(item.id)}
                  >
                    <img className="w-[1.2rem]" src={auto} alt="Play" />
                  </div>
                </div>
                <div className="absolute bottom-[2rem] w-full">
                  <div className="flex justify-between px-[2rem] text-white">
                    <div className="font-bold text-lg line-clamp-2 max-w-[70%]">
                      {item.title}
                    </div>
                    <div className="text-md whitespace-nowrap">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "long",
                            },
                          )
                        : ""}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {currentPageFromApi < totalPages && (
        <div className="flex justify-center mt-[3rem]">
          <button
            onClick={handleLoadMore}
            disabled={mediaDataFetching}
            className="w-[16rem] h-[3rem] cursor-pointer bg-secondary rounded-md text-white font-bold text-lg"
          >
            <p className="mt-1">{i18next.t("buttons.see_more")}</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaGrid;
