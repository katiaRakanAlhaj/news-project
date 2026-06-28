const SingleNewsModelTwo = ({data}) => {
  return (
    <div className="flex flex-col space-y-2 mt-[2rem]">
      <h1 className="text-xl font-bold text-[#333333]">
        {data.title}
      </h1>
      <p className="text-md text-[#333333] leading-relaxed">
       {data.description}
      </p>
    </div>
  );
};
export default SingleNewsModelTwo;
