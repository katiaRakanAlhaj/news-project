import i18next from "i18next";

const MediaBanner = () => {
  return (
    <div>
      <h1 className="text-primary font-bold text-2xl mt-[2rem]">
        {i18next.t("menu.media")}
      </h1>
      <p className="text-lg text-[#666666] mt-2">
        لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
        أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم
        أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن{" "}
      </p>
    </div>
  );
};
export default MediaBanner;
