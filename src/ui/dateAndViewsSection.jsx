import i18next from "i18next";
import date from "../assets/images/date.svg";
import views from "../assets/images/views.svg";

const NewsMetaInfo = ({ dateText, viewsText, textColor }) => {
  return (
    <div className="flex items-center gap-x-[1rem] mt-2">
      <div className="flex items-center">
        <img className="w-[0.8rem] h-[0.8rem]" src={date} alt="date" />
        <p className={`${textColor} text-xs ${i18next.language == "ar"?'mr-1':'ml-1'} mt-1`}>{dateText}</p>
      </div>
      <div className="flex items-center">
        <img className="w-[0.9rem] h-[0.9rem]" src={views} alt="views" />
        <p className={`${textColor} text-xs ${i18next.language == "ar"?'mr-1':'ml-1'} mt-1`}>{viewsText}</p>
      </div>
    </div>
  );
};

export default NewsMetaInfo;