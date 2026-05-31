import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
import LastNews from "../features/News/component/LastNews";
import NewsGrid from "../features/News/component/NewsGrid";

const News = () => {
  return (
    <div>
      <ModelTwoHero />
      <div className="container1 mx-auto">
        <div className="grid grid-cols-12 gap-x-[4rem] mt-[2rem]">
          {/* first column */}
          <div className="col-span-9">
            <NewsGrid/>
          </div>
          {/* second column */}
          <div className="col-span-3">
            <LastNews/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
