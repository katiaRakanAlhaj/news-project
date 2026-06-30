import { ModelDescription } from "../../../ui/ModelDescription";

const SingleNewsModel4 = ({ data }) => {
  return (
    <div
      style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
      className="w-full h-auto p-[1.5rem] rounded-lg flex flex-col space-y-2"
    >
      <img className="w-[2.5rem]" src={data?.logo} />{" "}
      <h1 className="text-lg text-secondary font-bold">{data?.title}</h1>
      <ModelDescription description={data.description} />
    </div>
  );
};
export default SingleNewsModel4;
