import { useState } from "react";
import auto from "../../../../assets/images/auto.svg";
import TitleSection from "../../../../ui/titleSection";
import { IoIosArrowBack } from "react-icons/io";
import i18next from "i18next";

const MediaModelOne = ({ data }) => {
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

  // Don't render if no data
  if (!data || !mediaItems.length) {
    return null;
  }

  // Take first item for main display
  const mainItem = mediaItems[0];
  // Take remaining items for thumbnails
  const thumbnailItems = mediaItems.slice(1);

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <div className="flex flex-wrap gap-x-2 items-center">
        <h1 className="text-primary font-bold text-md text-nowrap">
          {data.title || "معرض الفيديو"}
        </h1>
        <div className="h-[0.15rem] md:w-[85%] w-[32%] relative bg-[#D9E3F6]">
          <div className="absolute h-full w-[10%] bg-negative"></div>
        </div>
        <div className="flex">
          <p className="font-bold text-sm text-[#005BBF]">
            {i18next.t("buttons.see_more")}
          </p>
          <IoIosArrowBack
            className={`text-[#005BBF] ${i18next.language == "ar" ? "" : "rotate-180"}`}
          />
        </div>
      </div>
      
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
              className="w-full lg:h-[33rem] h-[20rem] object-cover rounded-t-xl cursor-pointer"
              src={mainItem.image}
              alt={mainItem.title}
              onClick={() => mainItem.videoUrl && handlePlayVideo(mainItem.id)}
            />
            <div className="absolute bottom-[2rem] right-[2rem] text-white font-bold text-xl z-10">
              {mainItem.title}
            </div>
            <div className="absolute inset-0 bg-[#00000066] rounded-t-xl"></div>
            {/* Centered circle for main image */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[4rem] h-[4rem] rounded-full bg-[#005BBFE5] cursor-pointer flex justify-center items-center"
              onClick={() => mainItem.videoUrl && handlePlayVideo(mainItem.id)}
            >
              <img className="w-[1rem]" src={auto} alt="play" />
            </div>
          </>
        )}
      </div>
      
      {/* Second Row - Thumbnails */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[0.5rem] mt-[0.5rem]">
        {thumbnailItems.map((item) => (
          <div key={item.id} className="flex flex-col space-y-2">
            <div className="relative">
              {playingVideoId === item.id && item.videoUrl ? (
                // Show Video
                <div className="relative w-full h-[10rem] rounded-xl overflow-hidden">
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
                    className="w-full h-[10rem] object-cover rounded-xl cursor-pointer"
                    alt={item.title}
                    onClick={() => item.videoUrl && handlePlayVideo(item.id)}
                  />
                  <div className="absolute inset-0 bg-[#00000066] rounded-xl"></div>
                  {/* Centered circle for thumbnail */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2rem] h-[2rem] rounded-full border border-white cursor-pointer flex justify-center items-center"
                    onClick={() => item.videoUrl && handlePlayVideo(item.id)}
                  >
                    <img className="w-[0.6rem]" src={auto} alt="play" />
                  </div>
                </>
              )}
            </div>
            <p className="text-secondary font-bold text-sm line-clamp-2">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaModelOne;