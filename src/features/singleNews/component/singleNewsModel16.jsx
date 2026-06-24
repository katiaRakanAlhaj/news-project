import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel16 = ({ data }) => {
  return (
    <div className="mt-[2rem]">
      <ModelTitle title={data?.title} />
      <div className="grid md:grid-cols-2 gap-[2rem] mt-[1rem]">
        {data?.content?.map((item) => (
          <div className="flex gap-x-[1rem]">
            <div className="h-[30.5rem] w-[0.15rem] bg-[#005BBF]"></div>
            <div className="flex flex-col space-y-2 mt-[1rem]">
              <h1 className="text-secondary font-bold text-lg">
                {item?.title}
              </h1>
              <p className="text-[#666666] text-md leading-relaxed line-clamp-5">
                {item.description}
              </p>
              <img
                src={item.image}
                className="w-full h-[19rem] rounded-md object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SingleNewsModel16;
