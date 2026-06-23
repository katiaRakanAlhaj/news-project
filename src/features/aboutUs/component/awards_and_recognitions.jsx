import AboutUsTitle from "../../../ui/aboutUsTitle";
const AwardsandRecognitions = ({ aboutusData }) => {
  return (
    <div className="w-full h-auto pt-[3rem] bg-[#FFFFFF]">
      <AboutUsTitle title={aboutusData?.data?.awards_and_recognitions_title} />
      <div className="container5 mx-auto mt-[2rem]">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[2rem]">
          {aboutusData?.data?.awards_and_recognitions.map((awardsItem) => (
            <div className="w-full h-[10rem] rounded-md border bg-[#F9FAFB] border-[#BBD0E4] space-y-2 flex flex-col py-[2rem] items-center">
              <img className="w-[3rem] h-[3rem]" src={awardsItem.icon} />
              <p className="text-[#5F5E5E] md:text-lg text-md mt-2">{awardsItem?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AwardsandRecognitions;
