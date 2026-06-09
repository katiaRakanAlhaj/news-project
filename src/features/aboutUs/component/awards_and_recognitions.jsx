import AboutUsTitle from "../../../ui/aboutUsTitle";
const AwardsandRecognitions = ({ aboutusData }) => {
  return (
    <div className="w-full h-auto pt-[3rem] bg-[#FFFFFF]">
      <AboutUsTitle title={aboutusData?.data?.awards_and_recognitions_title} />
      <div className="container4 mx-auto mt-[2rem]">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[1.5rem]">
          {aboutusData?.data?.awards_and_recognitions.map((awardsItem) => (
            <div className="w-full h-[7rem] rounded-md border border-[#BBD0E4] space-y-2 flex flex-col justify-center items-center">
              <img className="w-[2rem] h-[2rem]" src={awardsItem.icon} />
              <p className="text-[#5F5E5E] text-sm">{awardsItem?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AwardsandRecognitions;
