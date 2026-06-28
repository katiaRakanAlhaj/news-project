const SingleNewsModelNine = ({ data }) => {
  return (
    <div className="w-full h-auto relative bg-[#CEECF4] rounded-md p-[1.5rem]">
      <div className="absolute right-0 rounded-tr-md rounded-br-md h-full w-[0.3rem] bg-secondary top-0"></div>
      <h1 className="font-bold text-secondary text-xl">{data?.title}</h1>
      <p className = "text-md text-[#333333] mt-2">{data?.description}</p>
    </div>
  );
};
export default SingleNewsModelNine;
