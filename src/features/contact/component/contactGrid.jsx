import twitterContact from "../../../assets/images/twitterContact.svg";
import youtubeContact from "../../../assets/images/youtubeContact.svg";
import linkedinContact from "../../../assets/images/linkedinContact.svg";
import instgramContact from "../../../assets/images/instgramContact.svg";
import facebookContact from "../../../assets/images/facebookContact.svg";
import logoContact from "../../../assets/images/logoContact.svg";
import i18next from "i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContactUs } from "../hook/usePostContact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contactSchema, defaultValues } from "./contactShema";

const inputClassName =
  "w-full h-[3rem] px-2 text-md border border-[#474747] placeholder-[#474747]";

const ContactGrid = ({ contactData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultValues,
  });

  // Use the custom hook
  const { mutate, isPending } = useContactUs();

  const icons = [
    {
      icon: linkedinContact,
      name: "linkedin",
      url: contactData?.data?.linkedin,
    },
    {
      icon: instgramContact,
      name: "instagram",
      url: contactData?.data?.instagram,
    },
    { icon: twitterContact, name: "twitter", url: contactData?.data?.x },
    {
      icon: facebookContact,
      name: "facebook",
      url: contactData?.data?.facebook,
    },
    { icon: youtubeContact, name: "youtube", url: contactData?.data?.youtube },
  ];

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    const payload = {
      first_name: data.firstName,
      sur_name: data.surname,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };

    mutate(payload, {
      onSuccess: () => {
        reset();
        toast.success(i18next.t("contact.success_message"), {});
      },
      onError: (error) => {
        toast.error(error?.message || i18next.t("contact.failed_message"));
      },
    });
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 999999 }}
      />

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
              <p className="text-[#002F3C] text-md">
                {contactData?.data?.email}
              </p>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2 mt-[1.5rem] w-full"
          >
            <div className="grid md:grid-cols-2 grid-cols-1 gap-[1rem] w-full">
              <div className="w-full">
                <input
                  className={`${inputClassName} ${errors.firstName ? "border-red-500" : ""}`}
                  type="text"
                  placeholder={i18next.t("contact.first_name")}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <input
                  className={`${inputClassName} ${errors.surname ? "border-red-500" : ""}`}
                  type="text"
                  placeholder={i18next.t("contact.surname")}
                  {...register("surname")}
                />
                {errors.surname && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.surname.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-[1rem] w-full">
              <div className="w-full">
                <input
                  className={`${inputClassName} ${errors.email ? "border-red-500" : ""}`}
                  type="email"
                  placeholder={i18next.t("contact.email")}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <input
                  className={`${inputClassName} ${errors.subject ? "border-red-500" : ""}`}
                  type="text"
                  placeholder={i18next.t("contact.subject")}
                  {...register("subject")}
                />
                {errors.subject && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.subject.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <textarea
                placeholder={i18next.t("contact.text")}
                className={`w-full h-[13rem] p-2 mt-[0.5rem] text-lg border ${errors.message ? "border-red-500" : "border-[#474747]"} placeholder-[#474747]`}
                {...register("message")}
              />
              {errors.message && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.message.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-[4.5rem] bg-[#005BBF] text-white font-bold text-xl mt-[1.8rem] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isPending
                ? i18next.t("contact.sending")
                : i18next.t("contact.send")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactGrid;
