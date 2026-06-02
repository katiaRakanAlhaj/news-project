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
  const [selectedItemId, setSelectedItemId] = useState(null);

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

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePlayVideo = (item) => {
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

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <TitleSection title={"ميديا"} />

      <div className="w-full mt-[1rem]">
        <div className="flex flex-col lg:flex-row">
          {/* Main Video */}
          <div className="relative w-full lg:w-[82%] h-[18rem] sm:h-[24rem] lg:h-[28rem] overflow-hidden">
            {isPlaying ? (
              <>
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    currentVideo
                  )}?autoplay=1`}
                  title={currentTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 text-white rounded-full w-8 h-8 flex items-center justify-center z-20 text-xl"
                >
                  ✕
                </button>
              </>
            ) : (
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
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center">
                  <img
                    className="w-[3rem] sm:w-[4rem] lg:w-[5rem]"
                    src={youtube}
                    alt="play"
                  />
                </div>
              </>
            )}

            <h1 className="absolute right-4 lg:right-[2rem] top-4 lg:top-[2rem] font-bold text-white text-sm sm:text-lg lg:text-xl max-w-[90%]">
              {isPlaying
                ? currentTitle
                : "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة"}
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

            <div className="flex lg:flex-col gap-3 p-2 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden scroll">
              {secondColumnItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-x-2 items-center cursor-pointer transition-all duration-300 flex-shrink-0 lg:flex-shrink min-w-[240px] lg:min-w-0 ${
                    selectedItemId === item.id ? "bg-[#66CCFF33] p-1" : ""
                  }`}
                  onClick={() => handlePlayVideo(item)}
                >
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