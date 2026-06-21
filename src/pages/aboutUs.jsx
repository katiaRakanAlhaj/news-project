import { HelmetProvider } from "react-helmet-async";
import AwardsandRecognitions from "../features/aboutUs/component/awards_and_recognitions";
import EditorialTeam from "../features/aboutUs/component/editorial_team";
import OurCoreValues from "../features/aboutUs/component/our_core_values";
import OurEditorialMission from "../features/aboutUs/component/our_editorial_mission";
import OurGlobalPresence from "../features/aboutUs/component/our_global_presence";
import OurHistory from "../features/aboutUs/component/our_history";
import { useFetchAboutUsPage } from "../features/aboutUs/hook/useFetchAboutUs";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import ScrollToTop from "../component/scrollToTop/scrollToTop";

const AboutUs = () => {
  const {
    data: aboutusData,
    isLoading: aboutusDataLoading,
    error: aboutusDataError,
  } = useFetchAboutUsPage();
  if (aboutusDataLoading) {
    return <Loader />;
  }
  if (aboutusDataError) {
    return <ErrorMessageNetwork />;
  }
  return (
    <HelmetProvider>
      <ScrollToTop/>
      <MetaHelmet
        title={aboutusData?.data?.meta_title}
        description={aboutusData?.data?.meta_description}
      />
      <div className="lg:mt-0 mt-[4rem]">
        <OurEditorialMission aboutusData={aboutusData} />
        <OurCoreValues aboutusData={aboutusData} />
        <EditorialTeam aboutusData={aboutusData} />
        <OurHistory aboutusData={aboutusData} />
        <OurGlobalPresence aboutusData={aboutusData} />
        <AwardsandRecognitions aboutusData={aboutusData} />
      </div>
    </HelmetProvider>
  );
};
export default AboutUs;
