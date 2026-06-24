import AboutUsTitle from "../../../ui/aboutUsTitle";
import user from "../../../assets/images/user.svg";
const EditorialTeam = ({ aboutusData }) => {
  return (
    <div className="h-auto w-full bg-white py-8 md:py-[3rem] px-4 md:px-0">
      <div className="container5 mx-auto">
        {/* Title Container */}
        <div className="flex justify-start">
          <AboutUsTitle title={aboutusData?.data?.editorial_board_title} />
        </div>

        {/* Description & Line Separator Layout */}
        <div className="flex flex-col lg:flex-row lg:gap-x-4 lg:items-center mt-3">
          <p className="text-[#5F5E5E] text-base md:text-lg mb-2 lg:mb-0 lg:whitespace-nowrap">
            {aboutusData?.data?.editorial_board_description}
          </p>
          <div className="w-full h-[0.1rem] bg-[#005BBF]"></div>
        </div>

        {/* Responsive Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-[2rem] mt-8 md:mt-[2rem]">
          {aboutusData?.data?.editorial_board?.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Frame */}
              {item.image ? (
                <img
                  className="h-[18rem] sm:h-[20rem] border border-[#BBCEE4] rounded-lg w-full object-cover shadow-sm"
                  src={item.image}
                  alt={item["0"] || item.name}
                />
              ) : (
                <div className="h-[18rem] sm:h-[20rem] rounded-lg flex justify-center border border-[#BBCEE4] items-center w-full bg-[#E3E2E2] shadow-sm">
                  <img src={user} className="w-[3.5rem]" alt="user icon" />
                </div>
              )}

              {/* Member Details */}
              <h1 className="text-xl sm:text-2xl font-bold mt-3 text-[#1B1C1C] line-clamp-1">
                {item.name}
              </h1>
              <p className="text-base sm:text-lg text-[#005BBF] mt-1 font-medium">
                {item.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialTeam;
