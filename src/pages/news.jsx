import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
import LastNews from "../features/News/component/LastNews";
import NewsGrid from "../features/News/component/NewsGrid";

const News = () => {
  return (
    <div>
      <ModelTwoHero />
      <div className="container1 mx-auto">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[4rem] mt-[2rem] lg:gap-y-0 gap-y-[2rem]">
          {/* first column */}
          <div className="lg:col-span-9 col-span-1">
            <NewsGrid />
          </div>
          {/* second column */}
          <div className="lg:col-span-3 col-span-1">
            <LastNews />
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
