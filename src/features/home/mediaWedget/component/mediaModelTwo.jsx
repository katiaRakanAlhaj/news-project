import { useState, useEffect } from "react";
import youtube from "../../../../assets/images/youtube.svg";
import mainVideo from "../../../../assets/images/mainVideo.png";
import TitleSection from "../../../../ui/titleSection";
import i18next from "i18next";

const MediaModelTwo = ({ 
  data, 
  sectionId, 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading 
}) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  // Local state to accumulate items across all loaded pages
  const [accumulatedItems, setAccumulatedItems] = useState([]);

  // Helper parsing routine for handling nested pagination arrays safely
  const getItemsArray = (items) => {
    if (Array.isArray(items)) return items;
    if (items && items.data && Array.isArray(items.data)) return items.data;
    return [];
  };

  // Sync incoming API prop data into our local accumulated state arrays safely
  useEffect(() => {
    if (data?.items) {
      const incomingRaw = getItemsArray(data.items);
      
      setAccumulatedItems((prev) => {
        const existingIds = new Set(prev.map(item => item.id));
        const filteredNew = incomingRaw.filter(item => !existingIds.has(item.id));
        
        if (currentPage === 1) {
          return incomingRaw;
        }
        return [...prev, ...filteredNew];
      });
    }
  }, [data?.items, currentPage]);

  // Map accumulated list rows to targeted client template properties
  const secondColumnItems = accumulatedItems.map((item) => ({
    id: item.id,
    image: item.image,
    title: item.title || "فيديو",
    videoUrl: item.video_link || "",
  }));

  // Extract pure YouTube ID string segments via expressions
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePlayVideo = (item) => {
    if (!item.videoUrl) return;
    setCurrentVideo(item.videoUrl);
    setCurrentTitle(item.title);
    setIsPlaying(true);
    setSelectedItemId(item.id);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    setCurrentVideo(null);
    setCurrentTitle("");
    setSelectedItemId(null);
  };

  // Handler to fetch next pagination block asynchronously
  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(sectionId, currentPage + 1);
    }
  };

  // Handler to collapse back to Page 1 items
  const handleShowLess = () => {
    onPageChange(sectionId, 1);
  };

  // Don't render layout components if raw content dependencies are unavailable
  if (!data || !secondColumnItems.length) {
    return null;
  }

  const defaultMainItem = secondColumnItems[0];

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <TitleSection title={data.title || "ميديا"} />

      <div className="w-full mt-[1rem]">
        <div className="grid grid-cols-12 gap-4">
          {/* Main Video Window - col-span-9 */}
          <div className="relative col-span-12 lg:col-span-9 h-[18rem] sm:h-[24rem] lg:h-[38rem] overflow-hidden rounded-md">
            {isPlaying ? (
              <>
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentVideo)}?autoplay=1`}
                  title={currentTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 bg-black bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center z-20 text-xl hover:bg-opacity-100"
                >
                  ✕
                </button>
              </>
            ) : (
              <>
                <img
                  className="w-full h-full object-cover"
                  src={defaultMainItem.image || mainVideo}
                  alt="media"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center"
                  onClick={() => handlePlayVideo(defaultMainItem)}
                >
                  <img
                    className="w-[3rem] sm:w-[4rem] lg:w-[7rem] transition-transform hover:scale-110"
                    src={youtube}
                    alt="play"
                  />
                </div>
              </>
            )}

            <h1
              className={`absolute ${i18next.language === "ar" ? "right-4 lg:right-[2rem]" : "left-4 lg:left-[2rem]"} top-4 lg:top-[2rem] font-bold text-white text-sm sm:text-lg lg:text-2xl max-w-[90%] drop-shadow-lg`}
            >
              {isPlaying ? currentTitle : defaultMainItem.title}
            </h1>
          </div>

          {/* Sidebar Area Playlist Items Track - col-span-3 */}
          <div className="relative col-span-12 lg:col-span-3 h-auto lg:h-[38rem] flex flex-col overflow-hidden rounded-md">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: "linear-gradient(360deg, rgba(0, 0, 0, 0.7) 0%, #000000 150%)",
              }}
            />

            <div className="h-[1rem] w-full bg-secondary" />

            {/* Scrollable container list elements */}
            <div className="flex lg:flex-col gap-3 p-2 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden scrollbar-custom flex-1">
              <div>
                {secondColumnItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-x-2 items-center cursor-pointer transition-all duration-300 flex-shrink-0 lg:flex-shrink min-w-[240px] lg:min-w-0 ${
                    selectedItemId === item.id ? "bg-[#66CCFF33] p-1 rounded" : ""
                  }`}
                  onClick={() => handlePlayVideo(item)}
                >
                  <div className="w-[7rem] h-[7rem] flex-shrink-0 rounded overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt={item.title}
                    />
                  </div>

                  <p className="text-white font-[700] text-md line-clamp-3 flex-1">
                    {item.title}
                  </p>
                </div>
              ))}
              </div>
              {/* Compact Action Area directly under the news list */}
            <div className="p-3 w-full flex justify-center mt-auto bg-black/20 border-t border-white/5">
              {currentPage < totalPages ? (
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-5 py-1.5 rounded text-xs font-bold bg-negative text-white transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? "جاري التحميل..." : i18next.t("buttons.see_more")}
                </button>
              ) : currentPage > 1 ? (
                <button
                  onClick={handleShowLess}
                  className="px-5 py-1.5 rounded text-xs font-bold bg-negative text-white transition hover:bg-opacity-90 shadow-md"
                >
                  {i18next.t("buttons.see_less")}
                </button>
              ) : null}
            </div>
            </div>

            
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #666;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
      `}</style>
    </div>
  );
};

export default MediaModelTwo;