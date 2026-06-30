import { useState } from "react";
import ModelTitle from "../../../ui/modelsTitle";
import download from "../../../assets/images/download.svg";
import i18next from "i18next";

const SingleNewsModel18 = ({ data }) => {
  // Keeps track of which items and languages are currently downloading
  const [loadingStates, setLoadingStates] = useState({});

  const handleDownload = async (url, index, lang, fileName) => {
    if (!url) return;

    const key = `${index}-${lang}`;

    // 1. Set loading state to true ("جاري التحميل...")
    setLoadingStates((prev) => ({ ...prev, [key]: true }));

    try {
      // Fetch the file as a blob to force download in the same window
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;

      // Set the file name (you can customize this)
      link.setAttribute("download", fileName || `book_${lang}`);

      // Append to body, click it to trigger download in same window, then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL object
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed, falling back to direct link", error);
      // Fallback: If fetch fails due to CORS, trigger a direct download link alternative
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "");
      link.click();
    } finally {
      // 2. Reset loading state back to normal
      setLoadingStates((prev) => ({ ...prev, [key]: false }));
    }
  };

  const DownloadButton = ({ text, url, index, lang, title }) => {
    const isLoading = loadingStates[`${index}-${lang}`];
    const fileName = `${title || "book"}_${lang}`;

    return (
      <div
        onClick={() => !isLoading && handleDownload(url, index, lang, fileName)}
        className={`w-full md:h-[3.5rem] h-[3rem] bg-secondary flex items-center justify-center gap-x-2 ${
          isLoading ? "cursor-not-allowed opacity-80" : "cursor-pointer"
        }`}
      >
        <p className="font-bold text-white md:text-md text-sm">
          {isLoading ? i18next.t("buttons.upload") : text}
        </p>
        {!isLoading && (
          <img className="w-[1.5rem]" src={download} alt="download" />
        )}
      </div>
    );
  };

  return (
    <div>
      <ModelTitle title={data?.title} />
      <div className="grid lg:grid-cols-2 gap-x-[2rem] mt-[1rem]">
        {data?.content?.map((item, index) => (
          <div
            key={index}
            className="w-full border border-gray-200 h-[12rem] py-[2rem] relative flex gap-x-[1rem] px-[2rem] overflow-hidden rounded-xl"
          >
            <img
              src={item.icon}
              className="w-[5rem] h-[5rem] object-contain"
              alt="icon"
            />
            <div className="flex flex-col gap-y-2">
              <h1 className="text-primary font-bold md:text-xl text-md">
                {item.title}
              </h1>
              <p className="text-md text-[#666666] line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <div className="grid grid-cols-2 gap-x-[1rem] w-full">
                <DownloadButton
                  text={i18next.t("buttons.download_arabic")}
                  url={item.book_ar}
                  index={index}
                  lang="ar"
                  title={item.title}
                />
                <DownloadButton
                  text={i18next.t("buttons.download_english")}
                  url={item.book_en}
                  index={index}
                  lang="en"
                  title={item.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleNewsModel18;
