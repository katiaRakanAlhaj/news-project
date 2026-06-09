const OurEditorialMission = ({ aboutusData }) => {
  // Safe fallback - if statistics doesn't exist, use empty array
  const statistics = aboutusData?.data?.statistics || [];
  
  // Only try to destructure if we have at least one item
  const [firstItem, ...restItems] = statistics.length > 0 ? statistics : [null];

  return (
    <div className="w-full h-auto py-[2rem] container1 mx-auto">
      <div className="grid md:grid-cols-2 lg:gap-y-0 gap-y-[2rem] gap-x-[2rem]">
        {/* first column */}
        <div className="flex flex-col justify-center">
          <div className="flex gap-x-2 items-center">
            <div className="w-[1.5rem] h-[0.3rem] bg-[#005BBF] rounded-full"></div>
            <h1 className="text-[#005BBF] font-bold md:text-2xl text-lg mt-1">
              {aboutusData?.data?.title || "رسالتنا التحريرية"}
            </h1>
          </div>
          <p className="text-md text-secondary mt-[1rem] leading-relaxed">
            {aboutusData?.data?.description || ""}
          </p>
        </div>

        {/* second column - only render if we have data */}
        {firstItem && (
          <div className="flex flex-col gap-y-[0.5rem]">
            {/* First item - special design */}
            <div className="w-full h-[6rem] rounded-md bg-[#F3F4F5] border border-[#BBCEE4] flex flex-col justify-center items-center">
              <h1 className="font-bold text-[#005BBF] text-2xl">
                {firstItem.number}
              </h1>
              <p className="text-[#5F5E5E] text-sm">{firstItem.title}</p>
            </div>

            {/* Remaining items - grid 2 columns */}
            <div className="grid grid-cols-2 gap-[0.5rem]">
              {restItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full h-[6rem] rounded-md bg-[#F3F4F5] border border-[#BBCEE4] flex flex-col justify-center items-center"
                >
                  <h1 className="font-bold text-[#005BBF] text-2xl">
                    {item.number}
                  </h1>
                  <p className="text-[#5F5E5E] text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurEditorialMission;