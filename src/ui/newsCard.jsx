import React from "react";
import date from "../assets/images/date.svg";
import views from "../assets/images/views.svg";
import NewsMetaInfo from "./dateAndViewsSection";
import i18next from "i18next";

const NewsCard = ({
  image,
  title,
  description,
  date: newsDate,
  views: newsViews,
  type,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative">
        <img
          className="w-full h-[15rem] object-cover rounded-t-lg"
          src={image}
          alt={title}
        />
        <div
          className={`w-[5rem] h-[1.8rem] absolute top-[1rem] ${i18next.language == "ar" ? "right-[1rem]" : "left-[1rem]"} z-10 flex justify-center items-center bg-secondary text-xs rounded-full`}
        >
          <p className="text-white font-[400] text-[1rem] mt-1">{type}</p>
        </div>
      </div>

      <h1 className="font-bold md:text-xl text-md text-secondary mt-2 line-clamp-2">
        {title}
      </h1>

      {/* Description - Only show if it exists */}
      {description && (
        <p className="text-md text-secondary mt-2 line-clamp-2">
          {description}
        </p>
      )}

      <NewsMetaInfo
        dateText={newsDate}
        viewsText={newsViews}
        textColor="text-[#6B7280]"
      />
    </div>
  );
};

export default NewsCard;
