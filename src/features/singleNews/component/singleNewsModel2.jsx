import { ModelDescription } from "../../../ui/ModelDescription";

const SingleNewsModel2 = ({ data }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-xl font-bold text-[#333333]">{data.title}</h1>
      <ModelDescription description={data.description} />
    </div>
  );
};
export default SingleNewsModel2;
