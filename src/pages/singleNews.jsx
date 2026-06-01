import SinlgeNewsBanner from "../features/singleNews/component/singleNewsBanner";
import SingleNewsModel12 from "../features/singleNews/component/singleNewsModel12";
import SingleNewsModel13 from "../features/singleNews/component/singleNewsModel13";
import SingleNewsModel15 from "../features/singleNews/component/singleNewsModel15";
import SingleNewsModel16 from "../features/singleNews/component/singleNewsModel16";
import SingleNewsModel5 from "../features/singleNews/component/singleNewsModel5";
import SingleNewsModel7 from "../features/singleNews/component/singleNewsModel7";
import SingleNewsModel8 from "../features/singleNews/component/singleNewsModel8";
const SingleNews = () => {
  return (
    <div className="container1 mx-auto">
      <SinlgeNewsBanner />
      <div className="grid grid-cols-12 gap-x-[1.5rem]">
        <div className="col-span-9 mt-[2rem]">
          <SingleNewsModel5 />
          <SingleNewsModel15 />
          <SingleNewsModel16 />
        </div>
        <div className="col-span-3">katia</div>
      </div>
      <SingleNewsModel7 />
      <SingleNewsModel12/>
      <SingleNewsModel13/>
      <SingleNewsModel8/>
    </div>
  );
};
export default SingleNews;
