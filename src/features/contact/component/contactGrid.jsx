import twitterContact from "../../../assets/images/twitterContact.svg";
import youtubeContact from "../../../assets/images/youtubeContact.svg";
import linkedinContact from "../../../assets/images/linkedinContact.svg";
import instgramContact from "../../../assets/images/instgramContact.svg";
import facebookContact from "../../../assets/images/facebookContact.svg";
import logoContact from "../../../assets/images/logoContact.svg";
import i18next from "i18next";

const inputClassName =
  "w-full h-[3rem] px-2 text-md border border-[#474747] placeholder-[#474747]";

const ContactGrid = ({ contactData }) => {
  const icons = [
    { icon: linkedinContact, name: "linkedin", url: contactData?.data?.linkedin },
    { icon: instgramContact, name: "instagram", url: contactData?.data?.instagram },
    { icon: twitterContact, name: "twitter", url: contactData?.data?.x },
    { icon: facebookContact, name: "facebook", url: contactData?.data?.facebook },
    { icon: youtubeContact, name: "youtube", url: contactData?.data?.youtube },
  ];

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[3rem] lg:gap-y-0 gap-y-[2rem] lg:px-0 px-[2rem]">
      {/* first column */}
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-[#000000] text-2xl">
          {i18next.t("contact.contact_us")}
        </h1>
        <p className="text-md text-[#002F3C] mt-2 leading-relaxed">
          {contactData?.data?.description}
        </p>
        <div className="lg:flex gap-x-[3rem] lg:space-y-0 space-y-[2rem] mt-[2rem]">
          <div className="flex flex-col space-y-1">
            <h1 className="text-lg font-bold text-[#000000]">
              {i18next.t("contact.email")}
            </h1>
            <p className="text-[#002F3C] text-md">{contactData?.data?.email}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-lg font-bold text-[#000000]">
              {i18next.t("contact.social_media")}
            </h1>
            <div className="flex gap-x-6 items-center">
              {icons?.map((icon, index) => (
                <a
                  key={index}
                  href={icon?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={icon.icon}
                    className={
                      icon.name === "facebook" ? "w-[0.6rem]" : "w-[1.5rem]"
                    }
                    alt={icon.name}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* second column */}
      <div
        style={{ boxShadow: "0px 0px 22px 0px #00000040" }}
        className="w-full h-auto py-[3rem] px-[3rem] rounded-lg"
      >
        <img className="w-[11rem]" src={logoContact} alt="logo" />
        <form className="flex flex-col space-y-2 mt-[1.5rem] w-full">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-[1rem] w-full">
            <input
              className={inputClassName}
              type="text"
              placeholder={i18next.t("contact.first_name")}
            />
            <input
              className={inputClassName}
              type="text"
              placeholder={i18next.t("contact.surname")}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-[1rem] w-full">
            <input
              className={inputClassName}
              type="text"
              placeholder={i18next.t("contact.email")}
            />
            <input
              className={inputClassName}
              type="text"
              placeholder={i18next.t("contact.subject")}
            />
          </div>
          <textarea
            placeholder={i18next.t("contact.text")}
            className="w-full h-[13rem] p-2 mt-[0.5rem] text-lg border border-[#474747] placeholder-[#474747]"
          />
          <button className="w-full h-[4.5rem] bg-[#005BBF] text-white font-bold text-xl mt-[1.8rem] cursor-pointer">
            {i18next.t("contact.send")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactGrid;