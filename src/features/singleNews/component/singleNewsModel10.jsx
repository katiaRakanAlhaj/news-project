import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel10 = ({ data }) => {
  return (
    <div className="mt-[2rem]">
      <ModelTitle title={data.title} />
      <p className="text-[#333333] text-md mt-2">{data.description}</p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[4rem] gap-y-[2rem] mt-[2rem]">
        {data?.content?.map((item, index) => (
          <div key={item.id} className="flex flex-col space-y-2">
            <div className="md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] flex justify-center items-center bgsecondary rounded-full text-xl font-bold text-white">
              <p className="mt-2">{index + 1}</p>
            </div>
            <h1 className="font-bold text-lg mt-1 text-[#333333]">
              {item.title}
            </h1>
            <p className="text-[#333333] md:text-lg text-md">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SingleNewsModel10;
