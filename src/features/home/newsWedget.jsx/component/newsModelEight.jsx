import newsImage5 from "../../../../assets/images/newsImage5.png";
import newsImage6 from "../../../../assets/images/newsImage6.png";
import newsImage7 from "../../../../assets/images/newsImage7.png";
import newsImage8 from "../../../../assets/images/newsImage8.png";
import newsImage9 from "../../../../assets/images/newsImage9.png";
import newsImage10 from "../../../../assets/images/newsImage10.png";

import newsImage11 from "../../../../assets/images/newsImage11.png";
import newsImage12 from "../../../../assets/images/newsImage12.png";
import newsImage13 from "../../../../assets/images/newsImage13.png";
import date from "../../../../assets/images/date.svg";
import views from "../../../../assets/images/views.svg";

const NewsModelEight = () => {
  return (
    <div className="container1 mx-auto mt-[2rem]">
      <div className="grid grid-cols-12">
        {/* first column */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-x-[1rem]">
            {/* first column */}
            <div className="flex flex-col">
              <img
                src={newsImage10}
                className="w-full h-[16rem] object-cover"
              />
              <h1 class="font-bold text-md text-[#333333] mt-4">
                تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة
              </h1>
              <p class="text-sm text-[#666666] mt-2">
                لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
                أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
                ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير
                انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
                أليايت,سيت دو أيوسمود تيمبور أكسير انيم أد لوريم ايبسوم دولار
                سيت أميت ,كونسيكتيتور أدايبا يسكينج{" "}
              </p>
              <div className="flex items-center gap-x-[1rem] mt-2">
                <div className="flex items-center">
                  <img className="w-[0.8rem]" src={date} alt="date" />
                  <p className="text-[#6B7280] text-xs mr-1 mt-1">newsDate</p>
                </div>
                <div className="flex items-center">
                  <img className="w-[0.9rem]" src={views} alt="views" />
                  <p className="text-[#6B7280] text-xs mr-1 mt-1">newsViews</p>
                </div>
              </div>
            </div>
            {/* second column */}
            
          </div>
        </div>
        {/* second column */}
        <div className="col-span-4">katia</div>
      </div>
    </div>
  );
};
export default NewsModelEight;
