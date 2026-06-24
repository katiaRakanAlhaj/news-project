const SingleNewsModel5 = ({data}) => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-xl font-bold text-[#333333]">
        {data.title}
      </h1>
      <p className="text-md text-[#333333] leading-relaxed">
       {data.description}
      </p>
      <img className="w-full h-[17rem] rounded-xl object-cover" src={data.image} />
    </div>
  );
};
export default SingleNewsModel5;
