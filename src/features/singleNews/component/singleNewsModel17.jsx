import ModelTitle from "../../../ui/modelsTitle";
const SingleNewsModel17 = ({ data }) => {
  return (
    <div>
     <ModelTitle title = {data.title}/>
        <div className="w-full h-[40rem]">
      <img className="w-full h-full bg-cover" src={data.image} />
    </div>
    </div>
  );
};
export default SingleNewsModel17;
