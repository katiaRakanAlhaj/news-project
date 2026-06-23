import AboutUsTitle from "../../../ui/aboutUsTitle";
const OurCoreValues = ({aboutusData}) => {
  return (
    <div className="h-auto w-full bg-[#EDEEEF] py-[4rem]">
      <div className="container5 mx-auto">
        <AboutUsTitle title={aboutusData?.data?.our_values_title} />
        <div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[2rem] mt-[2rem]">
            {aboutusData?.data?.our_values?.map((aboutusData) => (
              <div className="w-full h-[14rem] bg-white rounded-md border border-[#BBD3E4] flex flex-col justify-center items-center space-y-2">
                <img className="w-[2rem]" src={aboutusData?.icon} />
                <h1 className="text-[#005BBF] font-bold lg:text-2xl md:text-xl text-lg mt-3">
                  {aboutusData?.title}
                </h1>
                <p className="text-[#5F5E5E] text-lg mt-1 text-center w-[70%] line-clamp-3">
                  {aboutusData?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurCoreValues;
