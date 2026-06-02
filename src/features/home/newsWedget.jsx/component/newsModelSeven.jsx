import newsImage1 from "../../../../assets/images/newsImage1.png";
import newsImage2 from "../../../../assets/images/newsImage2.png";
import newsImage3 from "../../../../assets/images/newsImage3.png";
import newsImage4 from "../../../../assets/images/newsImage4.png";
import newsImage5 from "../../../../assets/images/newsImage5.png";
import LinkedInColor from "../../../../assets/images/linkedInColor.svg";
import instgramColor from "../../../../assets/images/instgramColor.svg";
import facebookColor from "../../../../assets/images/facebookColor.svg";
import twitterColor from "../../../../assets/images/twitterColor.svg";
import youtubeColor from "../../../../assets/images/youtubeColor.svg";
import tiktok from "../../../../assets/images/tiktok.svg";
import TitleSection from "../../../../ui/titleSection";
import NewsMetaInfo from "../../../../ui/dateAndViewsSection";
const NewsModelSeven = () => {
  const social = [
    { image: LinkedInColor, name: "Linkedin", width: "1.3rem" },
    { image: instgramColor, name: "Instagram", width: "1.3rem" },
    { image: facebookColor, name: "Facebook", width: "1.3rem" },
    { image: tiktok, name: "Tik Tok", width: "2.1rem" },
    { image: twitterColor, name: "Twitter", width: "1.2rem" },
    { image: youtubeColor, name: "Youtube", width: "1.5rem" },
  ];
  const newsItem = [
    {
      image: newsImage1,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ",
      date: "الخميس، 18 مايو 2024",
      views: "1,2K",
    },
    {
      image: newsImage2,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ",
      date: "الخميس، 18 مايو 2024",
      views: "1,2K",
    },
    {
      image: newsImage3,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ",
      date: "الخميس، 18 مايو 2024",
      views: "1,2K",
    },
    {
      image: newsImage4,
      title: "تزامنا مع اشتعال جبهة لبنان.. يوم دام في قطاع غزة",
      description:
        "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أكسير انيم أد لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ",
      date: "الخميس، 18 مايو 2024",
      views: "1,2K",
    },
  ];

  // Get first item for the main column
  const mainNews = newsItem[0];
  // Get remaining items for the side column (from index 1 onwards)
  const sideNews = newsItem.slice(1);

  return (
    <div className="container1 mx-auto mt-[2rem]">
      <div className="grid lg:grid-cols-12 gap-x-[5rem] lg:gap-y-0 gap-y-[2rem]">
        {/* first column */}
        <div className="lg:col-span-9 col-span-1">
          <TitleSection title="منوعات وثقافة" showArrows={false} />

          <div className="grid md:grid-cols-2 gap-[1rem] mt-[1rem]">
            {/* first column - Main featured news */}
            <div className="flex flex-col">
              <img
                src={mainNews.image}
                className="w-full h-[12rem] object-cover"
              />
              <h1 className="font-bold text-md text-[#333333] mt-4">
                {mainNews.title}
              </h1>
              <p className="text-sm text-[#666666] mt-2">
                {mainNews.description}
              </p>
              <NewsMetaInfo
                dateText={mainNews.date}
                viewsText={mainNews.views}
                textColor="text-[#363636]"
              />
            </div>

            {/* second column - List of other news items */}
            <div className="flex flex-col space-y-[1rem]">
              {sideNews.map((item, index) => (
                <div key={index} className="md:flex gap-x-[1rem]">
                  <img
                    className="md:w-[9rem] w-full h-[8rem] object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="flex flex-col space-y-2 justify-center">
                    <h1 className="font-bold text-md text-[#333333] md:mt-0 mt-[1rem]">
                      {item.title}
                    </h1>
                    <NewsMetaInfo
                      dateText={item.date}
                      viewsText={item.views}
                      textColor="text-[#363636]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* second column */}
        <div className="lg:col-span-3 col-span-1">
          <TitleSection title={"سوشال ميديا"} showArrows={false} />
          <div
            style={{ boxShadow: "0px 1px 2px 0px #0000000D" }}
            className="w-full h-[13rem] bg-[#F6F6F6] flex justify-center items-center mt-[1rem]"
          >
            <div>
              <div className="grid grid-cols-3 gap-x-[2rem] gap-y-[2rem]">
                {social?.map((social, index) => (
                  <div className="flex flex-col space-y-2 justify-center items-center">
                    <img
                      key={index}
                      src={social.image}
                      style={{
                        width: social.width,
                        marginTop: social.name === "Tik Tok" ? "-0.7rem" : "0",
                      }}
                      alt={social.name}
                    />
                    <p className="text-[#000000] text-sm">{social?.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsModelSeven;
