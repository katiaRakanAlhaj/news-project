import { useParams } from "react-router-dom";
import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
import LastNews from "../features/News/component/LastNews";
import NewsGrid from "../features/News/component/NewsGrid";
import { useFetchCategoryById, useFetchLatestNews } from "../features/News/hook/useFetchNews";

const News = () => {
    const { id } = useParams(); // Get category ID from URL
  const { data:categoryData, isLoading:categoryDataLoading ,error:categoryDataError } = useFetchCategoryById(id);
  const {data:latestNewsData , isLoading:latestNewsDataLoading , error:latestNewsDataError} = useFetchLatestNews();
  return (
    <div className="lg:mt-0 mt-[6rem]">
      <ModelTwoHero />
      <div className="container1 mx-auto">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[4rem] mt-[2rem] lg:gap-y-0 gap-y-[2rem]">
          {/* first column */}
          <div className="lg:col-span-8 col-span-1">
            <NewsGrid categoryData = {categoryData}/>
          </div>
          {/* second column */}
          <div className="lg:col-span-4 col-span-1">
            <LastNews latestNewsData = {latestNewsData}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
