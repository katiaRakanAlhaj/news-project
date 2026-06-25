import { useColors } from "../../../context/colorContext";

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
            <div className="w-[1.5rem] h-[0.3rem] bg-secondary rounded-full"></div>
            <h1 className="text-secondary font-bold lg:text-4xl md:text-2xl text-xl mt-1">
              {aboutusData?.data?.title}
            </h1>
          </div>
          <p className="md:text-xl text-lg text-secondary mt-[2rem] leading-relaxed">
            {aboutusData?.data?.description || ""}
          </p>
        </div>

        {/* second column - only render if we have data */}
        {firstItem && (
          <div className="flex flex-col gap-y-[1rem]">
            {/* First item - special design */}
            <div className="w-full h-[8rem] rounded-xl bg-[#F3F4F5] border border-[#BBCEE4] flex flex-col justify-center items-center">
              <h1 className="font-bold text-secondary text-4xl">
                {firstItem.number}
              </h1>
              <p className="text-[#5F5E5E] text-lg">{firstItem.title}</p>
            </div>

            {/* Remaining items - grid 2 columns */}
            <div className="grid md:grid-cols-2 gap-[1rem]">
              {restItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full h-[8rem] rounded-md bg-[#F3F4F5] border border-[#BBCEE4] flex flex-col justify-center items-center"
                >
                  <h1 className="font-bold text-secondary text-4xl">
                    {item.number}
                  </h1>
                  <p className="text-[#5F5E5E] text-lg">{item.title}</p>
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