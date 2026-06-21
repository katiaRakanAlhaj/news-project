import AboutUsTitle from "../../../ui/aboutUsTitle";
import person1 from "../../../assets/images/person1.png";
import person2 from "../../../assets/images/person2.png";
import user from "../../../assets/images/user.svg";

const EditorialTeam = ({ aboutusData }) => {
  return (
    <div className="h-auto w-full bg-white py-[3rem]">
      <div className="container5 mx-auto">
        <div className="flex flex-start">
          <AboutUsTitle title={aboutusData?.data?.editorial_board_title} />
        </div>
        <div className="flex gap-x-3 items-center">
          <p className="text-[#5F5E5E] text-lg mt-2 text-nowrap">
            {aboutusData?.data?.editorial_board_description}
          </p>
          <div className="w-full h-[0.1rem] bg-[#005BBF] mt-2"></div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[2rem] mt-[2rem]">
          {aboutusData?.data?.editorial_board?.map((item, index) => (
            <div key={index}>
              {item.image ? (
                <img
                  className="h-[20rem] border border-[#BBCEE4] rounded-md w-full object-cover"
                  src={item.image}
                  alt={item["0"] || item.name}
                />
              ) : (
                <div className="h-[20rem] rounded-md flex justify-center border border-[#BBCEE4] items-center w-full bg-[#E3E2E2]">
                  <img src={user} className="w-[3.5rem]" alt="user icon" />
                </div>
              )}
              <h1 className="text-2xl font-bold mt-2 text-[#1B1C1C]">
                {item.name}
              </h1>
              <p className="text-lg text-[#005BBF] mt-1">{item.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialTeam;
