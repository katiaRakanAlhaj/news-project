import React from "react";
import date from "../assets/images/date.svg";
import views from "../assets/images/views.svg";
import NewsMetaInfo from "./dateAndViewsSection";

const NewsCard = ({ image, title, description, date: newsDate, views: newsViews, type }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative">
        <img
          className="w-full h-[10rem] object-cover rounded-t-lg"
          src={image}
          alt={title}
        />
        <div className="w-[4rem] h-[1.6rem] absolute top-[0.7rem] right-[0.7rem] z-10 flex justify-center items-center bg-secondary text-xs rounded-full">
          <p className="text-white font-[400] text-xs mt-1">{type}</p>
        </div>
      </div>
      
      <h1 className="font-bold text-sm text-secondary mt-2 line-clamp-2">
        {title}
      </h1>
      
      {/* Description - Only show if it exists */}
      {description && (
        <p className="text-xs text-secondary mt-2 line-clamp-2">
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