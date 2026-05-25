import AwardsandRecognitions from "../features/aboutUs/component/awards_and_recognitions";
import EditorialTeam from "../features/aboutUs/component/editorial_team";
import OurCoreValues from "../features/aboutUs/component/our_core_values";
import OurEditorialMission from "../features/aboutUs/component/our_editorial_mission";
import OurGlobalPresence from "../features/aboutUs/component/our_global_presence";
import OurHistory from "../features/aboutUs/component/our_history";

const AboutUs = () => {
  return (
    <div>
      <OurEditorialMission />
      <OurCoreValues />
      <EditorialTeam />
      <OurHistory />
      <OurGlobalPresence />
      <AwardsandRecognitions />
    </div>
  );
};
export default AboutUs;
