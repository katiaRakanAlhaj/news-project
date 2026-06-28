const SingleNewsModelFour = ({ data }) => {
  return (
    <div
      style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
      className="w-full h-auto p-[1.5rem] rounded-lg flex flex-col space-y-2"
    >
      <img className = "w-[2.5rem]" src={data?.logo} />{" "}
      <h1 className = "text-lg text-secondary font-bold">{data?.title}</h1>
      <p className = "text-[#333333] text-md">{data?.description}</p>
    </div>
  );
};
export default SingleNewsModelFour;
