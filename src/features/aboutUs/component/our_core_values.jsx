import AboutUsTitle from "../../../ui/aboutUsTitle";
const OurCoreValues = ({aboutusData}) => {
  return (
    <div className="h-auto w-full bg-[#EDEEEF] py-[3rem]">
      <div className="container1 mx-auto">
        <AboutUsTitle title={aboutusData?.data?.our_values_title} />
        <div className="container4 mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[1.5rem] mt-[2rem]">
            {aboutusData?.data?.our_values?.map((aboutusData) => (
              <div className="w-full h-[10rem] bg-white rounded-md border border-[#BBD3E4] flex flex-col justify-center items-center space-y-2">
                <img className="w-[1.5rem]" src={aboutusData?.image} />
                <h1 className="text-[#005BBF] font-bold text-lg">
                  {aboutusData?.title}
                </h1>
                <p className="text-[#5F5E5E] text-sm text-center w-[70%] line-clamp-3">
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
