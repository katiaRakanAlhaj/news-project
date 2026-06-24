import i18next from "i18next";
import AboutUsTitle from "../../../ui/aboutUsTitle";
import OurHistoryComponent from "../../../ui/ourHistoryComponent";

const OurHistory = ({aboutusData}) => {
  return (
    <div className="h-auto w-full py-[3rem] bg-[#F3F4F5]">
      <div className="container1 mx-auto">
        <AboutUsTitle title={i18next.t("Milestones in Our History")} />
        <div className="lg:block hidden">
          <div className="container6 mx-auto">
            <OurHistoryComponent aboutusData={aboutusData} />
          </div>
        </div>
        <div className="lg:hidden block">
          <OurHistoryComponent aboutusData={aboutusData} />
        </div>
      </div>
    </div>
  );
};

export default OurHistory;
