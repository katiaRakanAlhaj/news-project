import { useState, useEffect, useRef } from "react";
import newsImage1 from "../../../../assets/images/newsImage1.png";
import newsImage2 from "../../../../assets/images/newsImage2.png";
import newsImage3 from "../../../../assets/images/newsImage3.png";
import newsImage4 from "../../../../assets/images/newsImage4.png";
import TitleSection from "../../../../ui/titleSection";
import date from "../../../../assets/images/date.svg";
import views from "../../../../assets/images/views.svg";

const NewsModelFour = () => {
  const originalImages = [
    {
      image: newsImage1,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage2,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage3,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage4,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage1,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage2,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage3,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
    {
      image: newsImage4,
      type: "سياسة",
      title: "من حليف إلى معارض.. كارلسون يكشف كواليس خلافه مع ترمب",
      date: "الخميس، 18 مايو 2024",
      views: "1.2k",
    },
  ];

  // Create a massive array for infinite scrolling
  const createInfiniteArray = () => {
    const result = [];
    // Create 50 copies to ensure we never hit the end
    for (let i = 0; i < 50; i++) {
      result.push(...originalImages);
    }
    return result;
  };

  const infiniteImages = createInfiniteArray();
  const startPosition = 20 * originalImages.length; // Start in the middle
  const [position, setPosition] = useState(startPosition);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Handle the infinite loop
  useEffect(() => {
    const resetThreshold = originalImages.length * 30;

    if (position > startPosition + resetThreshold) {
      // Jump back to start position without animation
      setIsTransitioning(false);
      setPosition(startPosition);
      setTimeout(() => setIsTransitioning(true), 50);
    } else if (position < startPosition - resetThreshold) {
      setIsTransitioning(false);
      setPosition(startPosition);
      setTimeout(() => setIsTransitioning(true), 50);
    }
  }, [position, startPosition]);

  const nextSlide = () => {
    setPosition((prev) => prev + 1);
  };

  useEffect(() => {
    const autoPlay = setInterval(nextSlide, 3000);
    return () => clearInterval(autoPlay);
  }, []);

  // Calculate which 8 images to show (6 visible + 1 on each side for smoothness)
  const startIdx = Math.max(0, position - 1);
  const visibleImages = infiniteImages.slice(startIdx, startIdx + 8);

  // Calculate transform with centering
  const getTransform = () => {
    if (containerWidth === 0) return "translateX(0)";
    const gap = 16; // 1rem = 16px
    const slideWidth = (containerWidth - 5 * gap) / 6;
    const offset = (position - startIdx) * (slideWidth + gap);
    const centerOffset = (containerWidth - slideWidth) / 2;
    return `translateX(calc(-${offset}px + ${centerOffset}px))`;
  };

  return (
    <div className="mt-[2rem] relative w-full overflow-hidden">
      <div className="container1 mx-auto">
        <TitleSection title={"سياسة"} />
      </div>
      <div ref={containerRef} className="relative mt-[1rem]">
        <div className="overflow-hidden">
          <div
            className="flex gap-2"
            style={{
              transform: getTransform(),
              transition: isTransitioning ? "transform 1s ease-in-out" : "none",
            }}
          >
            {visibleImages.map((item, idx) => (
              <div
                key={startIdx + idx}
                className="flex-shrink-0"
                style={{ width: `calc((100% - (6 * 1rem)) / 6)` }}
              >
                <div className="relative group cursor-pointer">
                  <img
                    className="w-full h-[24rem] object-cover rounded-lg shadow-lg"
                    src={item.image}
                    alt={`slide-${idx}`}
                  />
                  <div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(360deg, #000000 0%, rgba(102, 102, 102, 0) 57.83%)",
                    }}
                  ></div>

                  {/* Category Badge */}
                  <div className="absolute top-[1rem] right-[1rem] z-10">
                    <div className="px-3 py-1 flex justify-center items-center bg-secondary text-white text-xs rounded-full font-[400]">
                      {item.type}
                    </div>
                  </div>

                  {/* Content Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
                    <h3 className="text-sm font-bold mb-2 line-clamp-2 opacity-85">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-x-[1rem] mt-2">
                      <div className="flex items-center">
                        <img
                          className="w-[0.8rem] h-[0.8rem]"
                          src={date}
                          alt="date"
                        />
                        <p className="text-[#9CA3AF] text-xs mr-1 mt-1">
                          {item.date}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <img
                          className="w-[0.9rem] h-[0.9rem]"
                          src={views}
                          alt="views"
                        />
                        <p className="text-[#9CA3AF] text-xs mr-1 mt-1">
                          {item.views}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {originalImages.slice(0, 6).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsTransitioning(true);
              setPosition(startPosition + idx);
            }}
            className={`rounded-full transition-all duration-300 ${
              position % originalImages.length === idx
                ? "w-2 h-2  bg-negative"
                : "w-2 h-2  bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsModelFour;
