import AwardsandRecognitions from "../features/aboutUs/component/awards_and_recognitions";
import EditorialTeam from "../features/aboutUs/component/editorial_team";
import OurCoreValues from "../features/aboutUs/component/our_core_values";
import OurEditorialMission from "../features/aboutUs/component/our_editorial_mission";
import OurGlobalPresence from "../features/aboutUs/component/our_global_presence";
import OurHistory from "../features/aboutUs/component/our_history";
import { useFetchAboutUsPage } from "../features/aboutUs/hook/useFetchAboutUs";

const AboutUs = () => {
  const {data:aboutusData , isLoading:aboutusDataLoading , error:aboutusDataError} = useFetchAboutUsPage();
  return (
    <div className = "lg:mt-0 mt-[4rem]">
      <OurEditorialMission aboutusData = {aboutusData} />
      <OurCoreValues aboutusData = {aboutusData}/>
      <EditorialTeam aboutusData = {aboutusData}/>
      <OurHistory aboutusData = {aboutusData}/>
      <OurGlobalPresence aboutusData = {aboutusData}/>
      <AwardsandRecognitions aboutusData = {aboutusData}/>
    </div>
  );
};
export default AboutUs;
