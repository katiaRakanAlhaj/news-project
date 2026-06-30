import { ModelDescription } from "../../../ui/ModelDescription";
import ModelTitle from "../../../ui/modelsTitle";

const SingleNewsModel11 = ({ data }) => {
  return (
    <div className="flex flex-col space-y-[0.5rem]">
      <ModelTitle title={data.title} />
      <ModelDescription description={data.description} />{" "}
      <img className="w-[15rem] h-[15rem] object-contain" src={data.image} />
    </div>
  );
};
export default SingleNewsModel11;
