import { useState } from "react";
import media1 from "../../../../assets/images/media1.png";
import media2 from "../../../../assets/images/media2.png";
import media3 from "../../../../assets/images/media3.png";
import media4 from "../../../../assets/images/media4.png";
import auto from "../../../../assets/images/auto.svg";

const MediaModelOne = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const mediaItems = [
    {
      id: 1,
      image: media1,
      title: "تقرير خاص : المدن الذكية في المستقبل",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
    {
      id: 2,
      image: media2,
      title: "ثورة الروبوتات في الصناعة",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
    {
      id: 3,
      image: media3,
      title: "التطور التقني في عام 2024 ",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
    {
      id: 4,
      image: media4,
      title: "الأمن الرقمي والمؤسسات",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
    {
      id: 5,
      image: media1,
      title: "نمط الحياة في العمل الحديث",
      videoUrl: "https://youtu.be/_isFw_iXogI?si=pZjPCg5N2CGKgRK_",
    },
  ];

  // Take first item for main display
  const mainItem = mediaItems[0];
  // Take remaining items for thumbnails
  const thumbnailItems = mediaItems.slice(1);

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
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

  return (
    <div className="container1 mx-auto mt-[2rem]">
      {/* Main Row - Large Image/Video */}
      <div className="relative flex justify-center items-center">
        {playingVideoId === mainItem.id ? (
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
              className="absolute top-4 right-4 bg-opacity-70 text-white rounded-full flex items-center justify-center hover:bg-opacity-100 z-20"
            >
              ✕
            </button>
          </div>
        ) : (
          // Show Image
          <>
            <img
              style={{ boxShadow: "0px 25px 50px -12px #00000040" }}
              className="w-full h-[33rem] object-cover rounded-t-xl cursor-pointer"
              src={mainItem.image}
              alt="media"
              onClick={() => handlePlayVideo(mainItem.id)}
            />
            <div className="absolute bottom-[2rem] right-[2rem] text-white font-bold text-xl z-10">
              {mainItem.title}
            </div>
            <div className="absolute inset-0 bg-[#00000066] rounded-t-xl"></div>
            {/* Centered circle for main image */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[4rem] h-[4rem] rounded-full bg-[#005BBFE5] cursor-pointer flex justify-center items-center"
              onClick={() => handlePlayVideo(mainItem.id)}
            >
              <img className="w-[1rem]" src={auto} alt="play" />
            </div>
          </>
        )}
      </div>

      {/* Second Row - Thumbnails */}
      <div className="grid grid-cols-4 gap-x-[0.5rem] mt-[0.5rem]">
        {thumbnailItems.map((item) => (
          <div key={item.id} className="flex flex-col space-y-2">
            <div className="relative">
              {playingVideoId === item.id ? (
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
                    className="absolute top-2 right-2  text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-100 z-20 text-xs"
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
                    alt="media"
                    onClick={() => handlePlayVideo(item.id)}
                  />
                  <div className="absolute inset-0 bg-[#00000066] rounded-xl"></div>
                  {/* Centered circle for thumbnail */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2rem] h-[2rem] rounded-full border border-white cursor-pointer flex justify-center items-center"
                    onClick={() => handlePlayVideo(item.id)}
                  >
                    <img className="w-[0.6rem]" src={auto} alt="play" />
                  </div>
                </>
              )}
            </div>
            <p className="text-secondary font-bold text-sm">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaModelOne;
