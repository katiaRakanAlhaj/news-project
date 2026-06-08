import { useState, useEffect } from "react";
import youtube from "../../../../assets/images/youtube.svg";
import mainVideo from "../../../../assets/images/mainVideo.png";
import TitleSection from "../../../../ui/titleSection";
import i18next from "i18next";

const MediaModelTwo = ({ data }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

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
  const secondColumnItems = mediaItemsData.map((item) => ({
    id: item.id,
    image: item.image,
    title: item.title || "فيديو",
    videoUrl: item.video_link || "",
  }));

  // Get YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
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

  // Don't render if no data
  if (!data || !secondColumnItems.length) {
    return null;
  }

  // Get first item as default main display
  const defaultMainItem = secondColumnItems[0];

  // If no video is playing, show the first item by default
  const activeItem = isPlaying 
    ? { videoUrl: currentVideo, title: currentTitle }
    : { videoUrl: defaultMainItem.videoUrl, title: defaultMainItem.title, image: defaultMainItem.image };

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <TitleSection title={data.title || "ميديا"} />

      <div className="w-full mt-[1rem]">
        <div className="flex flex-col lg:flex-row">
          {/* Main Video */}
          <div className="relative w-full lg:w-[82%] h-[18rem] sm:h-[24rem] lg:h-[28rem] overflow-hidden">
            {isPlaying ? (
              <>
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    currentVideo,
                  )}?autoplay=1`}
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
                    background:
                      "linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                  }}
                />

                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center"
                  onClick={() => handlePlayVideo(defaultMainItem)}
                >
                  <img
                    className="w-[3rem] sm:w-[4rem] lg:w-[5rem] transition-transform hover:scale-110"
                    src={youtube}
                    alt="play"
                  />
                </div>
              </>
            )}

            <h1
              className={`absolute ${i18next.language == "ar" ? "right-4 lg:right-[2rem]" : "left-4 lg:left-[2rem]"} top-4 lg:top-[2rem] font-bold text-white text-sm sm:text-lg lg:text-xl max-w-[90%] drop-shadow-lg`}
            >
              {isPlaying ? currentTitle : defaultMainItem.title}
            </h1>
          </div>

          {/* Sidebar */}
          <div className="relative w-full lg:w-[18%] h-auto lg:h-[28rem] flex flex-col overflow-hidden mt-4 lg:mt-0">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(360deg, rgba(0, 0, 0, 0.7) 0%, #000000 150%)",
              }}
            />

            <div className="h-[1rem] w-full bg-secondary" />

            <div className="flex lg:flex-col gap-3 p-2 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden scrollbar-custom">
              {secondColumnItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-x-2 items-center cursor-pointer transition-all duration-300 flex-shrink-0 lg:flex-shrink min-w-[240px] lg:min-w-0 ${
                    selectedItemId === item.id ? "bg-[#66CCFF33] p-1 rounded" : ""
                  }`}
                  onClick={() => handlePlayVideo(item)}
                >
                  <div className="w-[6rem] h-[5rem] flex-shrink-0">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover rounded"
                      alt={item.title}
                    />
                  </div>

                  <p className="text-white font-[700] text-sm line-clamp-3 flex-1">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 4px;
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