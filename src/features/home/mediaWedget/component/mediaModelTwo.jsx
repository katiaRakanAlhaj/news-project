import { useState } from "react";
import media1 from "../../../../assets/images/media1.png";
import media2 from "../../../../assets/images/media2.png";
import media3 from "../../../../assets/images/media3.png";
import media4 from "../../../../assets/images/media4.png";
import youtube from "../../../../assets/images/youtube.svg";
import mainVideo from "../../../../assets/images/mainVideo.png";
import TitleSection from "../../../../ui/titleSection";

const MediaModelTwo = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item

  // Array of items for the second column
  const secondColumnItems = [
    {
      id: 1,
      image: media2,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
    {
      id: 2,
      image: media3,
      title: "التطور التقني في عام 2024",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
    {
      id: 3,
      image: media4,
      title: "الأمن الرقمي والمؤسسات",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
    {
      id: 4,
      image: media1,
      title: "نمط الحياة في العمل الحديث",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
    {
      id: 5,
      image: media2,
      title: "نمط الحياة في العمل الحديث",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
  ];

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to handle playing video in main image
  const handlePlayVideo = (item) => {
    setCurrentVideo(item.videoUrl);
    setCurrentTitle(item.title);
    setIsPlaying(true);
    setSelectedItemId(item.id); // Set selected item ID
  };

  // Function to close video
  const handleCloseVideo = () => {
    setIsPlaying(false);
    setCurrentVideo(null);
    setCurrentTitle("");
    setSelectedItemId(null); // Clear selected item
  };

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <TitleSection title={"ميديا"}/>
      <div className="w-full mt-[1rem]">
        <div className="flex">
          {/* First image - 82% width (Main display area) */}
          <div className="relative w-[82%] h-[28rem] overflow-hidden">
            {isPlaying ? (
              // Show Video
              <>
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentVideo)}?autoplay=1`}
                  title={currentTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                {/* Close button */}
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 text-white rounded-full w-8 h-8 flex items-center justify-center z-20 text-xl"
                >
                  ✕
                </button>
              </>
            ) : (
              // Show Image
              <>
                <img
                  className="w-full h-full object-cover"
                  src={mainVideo}
                  alt="media"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                  }}
                ></div>
                {/* Centered YouTube button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center">
                  <img className="w-[5rem]" src={youtube} alt="play" />
                </div>
              </>
            )}
            {/* Dynamic title - changes based on selected video */}
            <h1 className="absolute right-[2rem] top-[2rem] font-bold text-white text-xl">
              {isPlaying ? currentTitle : "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة"}
            </h1>
          </div>

          {/* Second column - 18% width with multiple items stacked */}
          <div className="relative w-[18%] h-[28rem] flex flex-col overflow-hidden">
            {/* Single gradient overlay for the whole column */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(360deg, rgba(0, 0, 0, 0.7) 0%, #000000 150%)",
              }}
            ></div>

            {/* Top colored bar */}
            <div className="h-[1rem] w-full bg-secondary"></div>

            {/* Stack all items vertically with smooth scroll */}
            <div className="flex flex-col gap-y-4 p-2 overflow-y-auto scroll">
              {secondColumnItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-x-2 items-center cursor-pointer transition-all duration-300 ${
                    selectedItemId === item.id ? "bg-[#66CCFF33] p-1" : ""
                  }`}
                  onClick={() => handlePlayVideo(item)}
                >
                  {/* Fixed width container for images */}
                  <div className="w-[6rem] h-[5rem] flex-shrink-0">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover rounded"
                      alt="icon"
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
    </div>
  );
};

export default MediaModelTwo;