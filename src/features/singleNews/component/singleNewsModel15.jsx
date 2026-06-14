import ModelTitle from "../../../ui/modelsTitle";
const SingleNewsModel15 = ({data}) => {
  return (
    <div className="mt-[2rem]">
      <ModelTitle title={data.title} />
      <div className="grid md:grid-cols-2 gap-x-[4rem] gap-y-[3rem] mt-[2rem]">
        {data?.content?.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <h1 className="text-[#005BBF] font-bold text-lg">{item?.title}</h1>
            <p className="text-[#666666] text-md leading-relaxed">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SingleNewsModel15;
